const { Router } = require("express");
const router = Router();

const marking = require("../services/answers/marking.js");
const reader = require("../services/questions/reader.js");
const sessions = require("../services/data/sessions.js");
const createSessionShortcuts = require("../services/data/sessionShortcuts.js");
const reward = require("../services/ai/reward.js");
const session = require("express-session");

const randomInRange = (min, max) => {
  const range = max - min;
  const randomNumber = Math.random() * range + min;

  return randomNumber;
};

// Return a random key where each key has a different chance (weight) of being rolled
const weightedRoll = (weights) => {
  console.log({ weights });
  let total = 0;

  for (const weight of Object.values(weights)) {
    total += weight;
  }
  const roll = randomInRange(0, total);

  total = 0;
  for (const [key, weight] of Object.entries(weights)) {
    total += weight;

    if (total >= roll) {
      return key;
    }
  }
};

// User requests a question, server returns ONLY the display information needed for the user to answer the question
router.get("/", (request, response) => {
  const sessionShortcuts = createSessionShortcuts(request)
  
  let filters = request.query; // Filters on which types of questions can be chosen

  const proposal = sessionShortcuts.getNewProposal(); // Fetch the proposed optimal ratios of question formats
  console.log({ proposal });

  sessionShortcuts.logProposal("temp", proposal)

  const questionFormat = weightedRoll(proposal); // Perform a weighted roll to pick a random question format based on the weight

   // Add a filter so that question pool only includes selected question format
  filters = {
    ...filters,
    format: questionFormat,
  };

  const questionId = sessionShortcuts.getNewQuestionId(filters);
  console.log({ questionId });

  const question = reader.getQuestion(questionId);
  const displayInfo = reader.getDisplayInfo(question);

  response.status(200).json({ displayInfo }); // Return the information needed to display the question
});







// User requests a mark for their question, server returns the mark they received, the ways the user could have got marks,
// specific feedback for each word in their answer, informing the user if each word was correct and if not, why
// the state for question formats is also returned so the client can display the current thought optimal ratio of question formats
router.post("/answer", (request, response) => {
  const sessionShortcuts = createSessionShortcuts(request)

  const body = request.body;
  const answers = body.answers;

  const questionId = sessionShortcuts.getCurrentQuestionId();
  const question = reader.getQuestion(questionId);
  console.log({ questionId, answers });

  const { mark, keywordsFeedback } = marking.markAnswers(questionId, answers);
  const markPoints = reader.getMarkPoints(questionId);
  const maxMark = question.maxMark;

  // Get the user's score to measure improvement
  const lastMark = sessionShortcuts.getPastMark(questionId)
  const score = reward.relativeMarkScore(lastMark, mark, maxMark);
  console.log({score})

  const formatState = sessionShortcuts.feedbackProposal(questionId, score)

  const recentProposal = sessionShortcuts.getPastProposal("temp") // Get the proposal given when this question was generated
  sessionShortcuts.logAnswer(questionId, recentProposal, mark)

  response
    .status(200)
    .json({ mark, markPoints, keywordsFeedback, formatState });
});

module.exports = router;
