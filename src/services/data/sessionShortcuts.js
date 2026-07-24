const { getValue, setValue } = require("./sessions");
const createRatioOptimiser = require("../ai/ratioOptimiser");
const reader = require("../questions/reader");
const engine = require("../questions/engine");

const questionFormats = [
  "ShortAnswer",
  "MultipleChoice",
  "GapFill",
];

const createSessionShortcuts = (request) => {
  const get = (key) => {
    return getValue(request, key);
  };

  const set = (key, value) => {
    setValue(request, key, value);
  };

  const getCurrentQuestionId = () => {
    return get("currentQuestionId");
  };

  const setCurrentQuestionId = (id) => {
    set("currentQuestionId", id);
  };

  const getFormatState = () => {
    return get("formatState");
  };

  const setFormatState = (state) => {
    set("formatState", state);
  };

  const getPastAnswers = () => {
    return get("pastAnswers") ?? {};
  };

  const setPastAnswers = (answers) => {
    set("pastAnswers", answers);
  };

  const getNewQuestionId = (filters) => {
    const questionIds = reader.getQuestionIds(filters);

    const currentId = getCurrentQuestionId();

    const excludedIds = currentId
      ? [currentId]
      : [];

    const newQuestionId = engine.getRandomQuestionId(
      questionIds,
      excludedIds
    );

    if (newQuestionId) {
      setCurrentQuestionId(newQuestionId);
    }

    return newQuestionId;
  };

  const getNewProposal = () => {
    const ratioOptimiser = createRatioOptimiser(
      getFormatState()
    );

    const proposal = ratioOptimiser.propose(
      questionFormats
    );

    set("lastProposal", proposal);

    return proposal;
  };

  const feedbackProposal = (questionId, score) => {
    const lastProposal = getPastProposal(questionId);

    if (!lastProposal) {
      return {};
    }

    const ratioOptimiser = createRatioOptimiser(
      getFormatState()
    );

    ratioOptimiser.update(
      lastProposal,
      score
    );

    const newState = ratioOptimiser.getState();

    setFormatState(newState);

    return newState;
  };

  const logAnswer = (questionId, proposal, mark) => {
    const answers = getPastAnswers();

    answers[questionId] = {
      proposal,
      mark,
    };

    setPastAnswers(answers);
  };

  const getPastProposal = (questionId) => {
    const answers = getPastAnswers();

    return answers[questionId]?.proposal;
  };

  const getPastMark = (questionId) => {
    const answers = getPastAnswers();

    return answers[questionId]?.mark;
  };

  const logProposal = (questionId, proposal) => {
    const mark = getPastMark(questionId);

    logAnswer(
      questionId,
      proposal,
      mark
    );
  };

  const logMark = (questionId, mark) => {
    const proposal = getPastProposal(questionId);

    logAnswer(
      questionId,
      proposal,
      mark
    );
  };

  return {
    getCurrentQuestionId,
    setCurrentQuestionId,
    getFormatState,
    setFormatState,
    getPastAnswers,
    setPastAnswers,
    getNewQuestionId,
    getNewProposal,
    feedbackProposal,
    logAnswer,
    logProposal,
    logMark,
    getPastMark,
    getPastProposal,
  };
};

module.exports = createSessionShortcuts;