// Logic for marking user answers

const questionsReader = require("../questions/reader.js");

const normalise = (text) => {
  let normalised = "";

  normalised = text.toLowerCase();

  return normalised;
};

const markAnswer = (id, answer) => {
  normalisedAnswer = normalise(answer);

  const question = questionsReader.getQuestion(id);
  if (!question) {
    return null;
  }

  const maxMark = question.maxMark;

  const correctAnswers = question.answers;

  let mark = 0;

  for (const correctAnswer of correctAnswers) {
    correctNormalisedAnswer = normalise(correctAnswer);

    if (normalisedAnswer.includes(correctNormalisedAnswer)) {
      mark += 1;

      if (mark === maxMark) {
        break;
      }
    }
  }

  return mark;
};

module.exports = { markAnswer };
