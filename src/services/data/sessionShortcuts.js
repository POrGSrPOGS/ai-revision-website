const { getValue, setValue } = require("./sessions")

const getCurrentQuestionId = (request) => {
    return getValue(request, "currentQuestionId");
}

const setCurrentQuestionId = (request, newValue) => {
    setValue(request, "currentQuestionId", newValue)
}

const getProposal = (request) => {
    return getValue(request, "lastProposal")
}

const setProposal = (request, newValue) => {
    setValue(request, "lastProposal", newValue)
}

const getFormatState = (request) => {
    return getValue(request, "formatState")
}

const setFormatState = (request, newValue) => {
    setValue(request, "formatState", newValue)
}

const getMarks = (request) => {
    return getValue(request, "marks")
}

const setMarks = (request, newValue) => {
    setValue(request, "marks", newValue)
}



const getNewQuestionId = (request, filters) => { 
  // Select a new question and return and save it
  // exclude the last question

  const questionIds = reader.getQuestionIds(filters);
  const lastQuestionId = getCurrentQuestionId(request)

  const excludedIds = lastQuestionId ? [ lastQuestionId ] : [] // Don't exclude last question's id if it's undefined
  const newQuestionId = engine.getRandomQuestionId(questionIds, excludedIds);

  setCurrentQuestionId(request, newQuestionId)

  return newQuestionId;
};

const getNewProposal = (request) => {

  const formatState = sessions.getValue(request,"formatState")

  const ratioOptimiser = createRatioOptimiser(formatState)
  const proposal = ratioOptimiser.propose(questionFormats)
  setProposal(proposal)

  return proposal
}

const addMark = (request, questionId, mark) => { // Update the user's last mark for the question id
  const lastMarks = getMarks(request) ?? {}

  const updated = {
    ...lastMarks,
    [questionId]: mark
  }

  setMarks(request, updated)
}

module.exports = { }