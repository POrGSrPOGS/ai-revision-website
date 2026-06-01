// Logic for selecting questions based on user data

const questionsReader = require("./questionReader.js");

const getRandomQuestion = (questions) => {
    if (!questions) {
        return null
    }

    const randomQuestion = questions[Math.floor(Math.random() * questions.length)];
    return randomQuestion
}

const selectQuestion = (questions) => {
    return getRandomQuestion(questions)
}

module.exports = { selectQuestion };