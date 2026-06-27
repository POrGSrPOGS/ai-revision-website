const { Router } = require("express");
const router = Router();

const marking = require("../services/answers/marking.js");
const reader = require("../services/questions/reader.js");
const engine = require("../services/questions/engine.js");
const sessions = require("../services/data/sessions.js");

const questionFormats = ["ShortAnswer", "MultipleChoice", "GapFill"]

const reward = require("../services/ai/reward.js")
const createRatioOptimiser = require("../services/ai/ratioOptimiser.js")

const ratioOptimiser = createRatioOptimiser()

const saveFormatState = (request) => {
  sessions.setValue(request, "formatState", ratioOptimiser.getState())
}

const weightedRoll = (weights) => {

  const roll = Math.random()

  let total = 0

  for (const [key, weight] of Object.entries(weights)) {
    total += weight

    if (total >= roll) {
      return key
    }
  }
}

router.get("/", (request, response) => {
  let filters = request.query;
  const proposal = ratioOptimiser.propose(questionFormats)

  console.log({proposal})

  const questionFormat = weightedRoll(proposal)

  //console.log({questionFormat})

  filters = {
    ...filters,
    "format": questionFormat
  }


  const questions = reader.getQuestions(filters);

  const excluded = [];
  const question = sessions.getNewQuestion(request, questions, excluded);
  //console.log({question})

  const displayInfo = reader.getDisplayInfo(question);

  response.status(200).json({ displayInfo });
});

router.post("/answer", (request, response) => {
  const question = sessions.getValue(request, "currentQuestionId");
  const questionId = question.id
  
  const lastProposal = sessions.getValue(request, "lastProposal")

  const body = request.body;
  const answers = body.answers;

  console.log({ questionId, answers });

  const { mark, keywordsFeedback } = marking.markAnswers(questionId, answers);
  const markPoints = reader.getMarkPoints(questionId);

  const maxMark = question.maxMark;

  const lastMark = sessions.getValue(request, "lastMarks")
  sessions.addMark(request, questionId, mark)

  const score = reward.relativeMarkScore(lastMark, mark, maxMark)

  if (lastProposal) {
    ratioOptimiser.update(lastProposal, score)
  }
  

  response.status(200).json({ mark, markPoints, keywordsFeedback });
});

module.exports = router;
