// Utils for accessing information on questions

const questionsBank = require("../data/questionsBank.json");
const questionsConfig = require("../config/questionsReading.json");
const { questionDisplayInfo } = questionsConfig;

const getQuestion = (id) => {
    const question = questionsBank.find(q => q.id === id);
    return question;
};

const satisfiesFilters = (question, filters) => {
    if (filters.length !== 0){
        for (const attribute of filters){
            actualValue = question[attribute]
            correctValue = filters[attribute]

            if (actualValue !== correctValue){
                return false
            }
        }
    }

    return true
}

const getQuestions = (filters) => {

    if (filters === {}){
        return questionsBank
    }

    const questions = [];

    for (const question of questionsBank){
        if (satisfiesFilters(question, filters)){
            questions.push(question.id)
        }
    }

    return questions
}

const getDisplayInfo = (question) => {
    const displayInfo = {};
    questionDisplayInfo.forEach((attribute) => {
        displayInfo[attribute] = question[attribute];
    });

    return displayInfo
}

module.exports = { getQuestion, getQuestions, getDisplayInfo };