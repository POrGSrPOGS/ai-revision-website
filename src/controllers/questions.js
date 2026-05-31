const questionsData = require("../data/questions.json");
const questionsConfig = require("../config/questions.json");
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

    return displayData
}

const mark = (question) => {

}

module.exports = { getQuestion, getDisplayInfo, mark };
