// Logic for selecting questions based on user data

const questionsReader = require("./reader.js");

const getRandomQuestion = (questions, excluded) => {
  let included = [];

  if (excluded.length !== 0) {
    included = questions.filter((question) => {
      const id = question.id
      return !excluded.includes(id);
    });

    if (included.length === 0) {
      console.log(
        "No questions available that satisfy filter and excluded questions, allowing excluded",
      );
      included = excluded;
    }
  } else {
    included = questions;
  }

  const questionIdIndex = Math.floor(Math.random() * included.length);

  return included[questionIdIndex];
};

module.exports = { getRandomQuestion };
