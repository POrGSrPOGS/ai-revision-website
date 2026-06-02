// Utils for accessing information on questions

const questionsBank = require("../data/questionsBank.json");
const questionsConfig = require("../config/questionsReading.json");
const { questionDisplayInfo } = questionsConfig;

const getQuestion = (id) => {
    const question = questionsData.find(q => q.id === id);
    return question;
};

const getQuestions = (filters) => {

    const questions = questionsBank.filter(question => {
        const entries = Object.entries(filters);

        return entries.every(filter => {
            const attribute = filter[0];
            const value = filter[1];

            if (!value) {
                return true;
            }

            return question[key] === value;
        });
    });

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