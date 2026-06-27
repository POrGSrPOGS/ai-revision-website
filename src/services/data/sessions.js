// Managing session data

const engine = require("../questions/engine.js");

const getValue = (request, key) => {
  if (!request.session) request.session = {};

  return request.session[key];
};

const setValue = (request, key, value) => {
  if (!request.session) request.session = {};

  request.session[key] = value;
};

const getNewQuestion = (request, questions, excluded) => {
  const lastQuestion = getValue(request, "currentQuestionId");
  if (lastQuestion) {
    excluded.push(lastQuestion);
  }

  const newQuestion = engine.getRandomQuestion(questions, excluded);

  setValue(request, "currentQuestionId", newQuestion);

  return newQuestion;
};

const addMark = (request, questionId, mark) => {
  const lastMarks = getValue(request, "lastMarks") ?? {}

  const updated = {
    ...lastMarks,
    [questionId]: mark
  }

  setValue(request, "lastMarks", updated)
}
module.exports = { getValue, setValue, getNewQuestion, addMark };