// Utils for accessing information on questions

const questionsData = require("../data/questionsData.json");
const questionsConfig = require("../config/questionsConfig.json");
const { questionDisplayInfo } = questionsConfig;

const getQuestion = (id) => {
    const question = questionsData.find(q => q.id === id);
    return question;
};

const getDisplayInfo = (question) => {
    const displayInfo = {};
    questionDisplayInfo.forEach(key => {
        displayInfo[key] = question[key];
    });

    return displayInfo
}

module.exports = { getQuestion, getDisplayInfo };