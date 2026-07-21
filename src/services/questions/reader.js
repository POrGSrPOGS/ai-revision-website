// Utils for accessing information on questions

const questionsBank = require("../../data/questionsBank.json");
const questionsConfig = require("../../config/questionsReading.json");
const { questionDisplayInfo } = questionsConfig;

const getQuestion = (id) => {
  const question = questionsBank.find((q) => q.id === id);
  return question;
};

const getMarkPoints = (id) => {
  const question = getQuestion(id);
  return question?.markPoints;
};

const satisfiesFilters = (question, filters) => {

  if (filters) {
    for (const attribute in filters) {

    
      let actualValue = question[attribute]; // TODO: Create a system so this doesn't need to be hardcoded

      if (attribute === "format"){ 
        actualValue = actualValue.name
      }
      const correctValue = filters[attribute];

      if (actualValue !== correctValue) {
        return false;
      }
    }
  }

  return true;
};

const getQuestionIds = (filters = []) => { // Return a 1d array of question id's that 
    const questions = [];

    for (const question of questionsBank) {
      
      if (satisfiesFilters(question, filters)) {
        questions.push(question.id);
      }
    }

    return questions;
};

const getDisplayInfo = (question) => {
  console.log({question})
  const displayInfo = {};
  questionDisplayInfo.forEach((attribute) => {
    displayInfo[attribute] = question[attribute];
  });

  return displayInfo;
};

module.exports = { getQuestion, getQuestionIds, getDisplayInfo, getMarkPoints };
