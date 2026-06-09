const { Router } = require("express");
const router = Router();

const marking = require("../services/answers/marking.js");
const reader = require("../services/questions/reader.js");
const engine = require("../services/questions/engine.js");
const sessions = require("../services/data/sessions.js");

router.get("/", (request, response) => {
  const filters = request.query;
  console.log({ filters });

  const questions = reader.getQuestionIds(filters);

  const excluded = [];
  const questionId = sessions.getNewQuestionId(request, questions, excluded);

  const question = reader.getQuestion(questionId);
  const displayInfo = reader.getDisplayInfo(question);

  console.log({ displayInfo });
  response.status(200).json({ displayInfo });
});

router.post("/answer", (request, response) => {
  const questionId = sessions.get(request, "currentQuestionId");
  const body = request.body;
  const answer = body.answer;

  console.log({ questionId, answer });

  const mark = marking.markAnswer(questionId, answer);
  const correctAnswers = reader.getAnswers(questionId);

  response.status(200).json({ mark, correctAnswers });
});

module.exports = router;
