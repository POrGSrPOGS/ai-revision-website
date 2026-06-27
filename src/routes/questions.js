const { Router } = require("express");
const router = Router();

const marking = require("../services/answers/marking.js");
const reader = require("../services/questions/reader.js");
const engine = require("../services/questions/engine.js");
const sessions = require("../services/data/sessions.js");

const questionFormats = ["ShortAnswer", "MultipleChoice", "GapFill"]

const reward = require("../services/ai/reward.js")
const createRatioOptimiser = require("../services/ai/ratioOptimiser.js")


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
  const ratioOptimiser = createRatioOptimiser(sessions.getValue(request,"formatState"))
  const proposal = ratioOptimiser.propose(questionFormats)
  sessions.setValue(request, "lastProposal", proposal)

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

  const lastMarks = sessions.getValue(request, "lastMarks")
  console.log(lastMarks)
  const lastMark = lastMarks?.[questionId]
  sessions.addMark(request, questionId, mark)

  const score = reward.relativeMarkScore(lastMark, mark, maxMark)

  if (lastProposal) {
    const ratioOptimiser = createRatioOptimiser(sessions.getValue(request,"formatState"))
    ratioOptimiser.update(lastProposal, score)
    const state = ratioOptimiser.getState()
    console.log({state})
    sessions.setValue(request, "formatState", state)
  }

  response.status(200).json({ mark, markPoints, keywordsFeedback });
});

module.exports = router;
