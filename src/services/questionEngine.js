// Logic for selecting questions based on user data

const questionsReader = require("./questionReader.js");

const getRandomQuestionId = (questions, excluded) => {

    var included = [];

    if (excluded.length !== 0){
        included = questions.filter(id => {
            return !excluded.includes(id);
        });

        if (included.length === 0) {
            console.log("No questions available that satisfy filter and excluded questions, allowing excluded")
            included = excluded;
        }

    } else {
        included = questions
    }

    const questionIdIndex = Math.floor(Math.random() * included.length);
        console.log({questions, excluded, included, questionIdIndex})
    return included[questionIdIndex];
};

module.exports = { getRandomQuestionId };