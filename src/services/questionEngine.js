// Logic for selecting questions based on user data

const questionsReader = require("./questionReader.js");

const getRandomQuestion = (questions, excludedQuestions) => {
    
    if (!questions) {
        return null
    }

    excludedQuestions.forEach(question => {
        
    });

    const randomQuestion = questions[Math.floor(Math.random() * questions.length)];
    return randomQuestion
}

const selectQuestion = (questions) => {
    return getRandomQuestion(questions)
}

module.exports = { selectQuestion };