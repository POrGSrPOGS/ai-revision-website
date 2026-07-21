const { getValue, setValue } = require("./sessions");
const createRatioOptimiser = require("../ai/ratioOptimiser");
const reader = require("../questions/reader.js");
const engine = require("../questions/engine.js");

const questionFormats = ["ShortAnswer", "MultipleChoice", "GapFill"];

const getCurrentQuestionId = (request) => {
  return getValue(request, "currentQuestionId");
};

const setCurrentQuestionId = (request, newValue) => {
  setValue(request, "currentQuestionId", newValue);
};

const getProposal = (request) => {
  return getValue(request, "lastProposal");
};

const setProposal = (request, newValue) => {
  setValue(request, "lastProposal", newValue);
};

const getFormatState = (request) => {
  return getValue(request, "formatState");
};

const setFormatState = (request, newValue) => {
  setValue(request, "formatState", newValue);
};

const getMarks = (request) => {
  return getValue(request, "marks");
};

const setMarks = (request, newValue) => {
  setValue(request, "marks", newValue);
};

const getNewQuestionId = (request, filters) => {
  // Select a new question and return and save it
  // exclude the last question
  console.log({ filters });
  const questionIds = reader.getQuestionIds(filters);

  const lastQuestionId = getCurrentQuestionId(request);
  const excludedIds = lastQuestionId ? [lastQuestionId] : []; // Don't exclude last question's id if it's undefined
  const newQuestionId = engine.getRandomQuestionId(questionIds, excludedIds);

  if (newQuestionId) {
    setCurrentQuestionId(request, newQuestionId);
  }

  return newQuestionId;
};

const getNewProposal = (request) => {
  const formatState = getFormatState(request);

  const ratioOptimiser = createRatioOptimiser(formatState);
  const proposal = ratioOptimiser.propose(questionFormats);
  setProposal(request, proposal);

  return proposal;
};

const feedbackProposal = (request, score) => {
  const lastProposal = getProposal(request);
  if (!lastProposal) return {};

  const lastFormatState = getFormatState(request);
  const ratioOptimiser = createRatioOptimiser(lastFormatState);
  ratioOptimiser.update(lastProposal, score);

  const formatState = ratioOptimiser.getState();
  setFormatState(request, formatState);

  return formatState;
};

const addMark = (request, questionId, mark) => {
  // Update the user's last mark for the question id
  const lastMarks = getMarks(request) ?? {};

  const updated = {
    ...lastMarks,
    [questionId]: mark,
  };

  setMarks(request, updated);
};

module.exports = {
  getCurrentQuestionId,
  setCurrentQuestionId,
  getProposal,
  setProposal,
  getFormatState,
  setFormatState,
  getMarks,
  setMarks,
  getNewQuestionId,
  getNewProposal,
  feedbackProposal,
  addMark,
};
