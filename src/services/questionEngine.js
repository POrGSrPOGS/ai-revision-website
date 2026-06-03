// Logic for selecting questions based on user data

const questionsReader = require("./questionReader.js");

const getRandomQuestion = (questions, excluded) => {

    var included;

    if (excluded.length === 0){
        const included = questions.filter(id => {
            return !excluded.includes(id);
        });

        if (included.length === 0) {
            included = excluded;
        }

    } else {
        included = excluded
    }

    const randomIndex = Math.floor(Math.random() * included.length);
    return included[randomIndex];
};

module.exports = { getRandomQuestion };