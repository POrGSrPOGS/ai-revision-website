// Managing session data

const engine = require("../questions/engine.js");

const get = (request, key) => {
  if (!request.session) request.session = {};

  return request.session[key];
};

const set = (request, key, value) => {
  if (!request.session) request.session = {};

  request.session[key] = value;
};

const getNewQuestionId = (request, questions, excluded) => {
  let lastQuestionId = get(request, "currentQuestionId");
  if (lastQuestionId) {
    excluded.push(lastQuestionId);
  }

  const newQuestionId = engine.getRandomQuestionId(questions, excluded);

  set(request, "currentQuestionId", newQuestionId);

  return newQuestionId;
};

module.exports = { get, set, getNewQuestionId };
