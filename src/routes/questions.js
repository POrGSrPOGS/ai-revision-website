const { Router } = require("express");
const router = Router();

const marking = require("../services/answers/marking.js");
const reader = require("../services/questions/reader.js");
const sessions = require("../services/data/sessions.js");
const sessionShortcuts = require("../services/data/sessionShortcuts.js");
const reward = require("../services/ai/reward.js");
const { format } = require("morgan");
const { captureRejectionSymbol } = require("supertest/lib/test.js");

const randomInRange = (min, max) => {
  const range = max - min;
  const randomNumber = Math.random() * range + min;

  return randomNumber;
};

// Return a random key where each key has a different chance of being rolled
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
  let filters = request.query; // Filters on which types of questions can be chosen
  const proposal = sessionShortcuts.getNewProposal(request);
  console.log({ proposal });
  const questionFormat = weightedRoll(proposal);
  filters = {
    ...filters,
    format: questionFormat,
  };

  const questionId = sessionShortcuts.getNewQuestionId(request, filters);
  console.log({ questionId });
  const question = reader.getQuestion(questionId);
  const displayInfo = reader.getDisplayInfo(question);

  response.status(200).json({ displayInfo });
});

router.post("/answer", (request, response) => {
  const questionId = sessionShortcuts.getCurrentQuestionId(request);
  const question = reader.getQuestion(questionId);

  const body = request.body;
  const answers = body.answers;

  console.log({ questionId, answers });

  const { mark, keywordsFeedback } = marking.markAnswers(questionId, answers);
  const markPoints = reader.getMarkPoints(questionId);
  const maxMark = question.maxMark;
  const lastMarks = sessionShortcuts.getMarks(request);

  const lastMark = lastMarks?.[questionId];
  sessionShortcuts.addMark(request, questionId, mark);

  const score = reward.relativeMarkScore(lastMark, mark, maxMark);
  const formatState = sessionShortcuts.feedbackProposal(request, score);

  response
    .status(200)
    .json({ mark, markPoints, keywordsFeedback, formatState });
});

module.exports = router;
