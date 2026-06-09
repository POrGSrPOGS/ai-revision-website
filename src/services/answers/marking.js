// Logic for marking user answers

const questionsReader = require("../questions/reader.js");

const normalise = (text) => {
  let normalised = text;

  normalised = normalised.toLowerCase();

  return normalised;
};

const markAnswer = (id, answer) => {
  normalisedAnswer = normalise(answer);

  const question = questionsReader.getQuestion(id);
  if (!question) {
    return null;
  }

  const maxMarks = question.maxMarks;

  const correctAnswers = question.answers;

  let marks = 0;

  for (const correctAnswer of correctAnswers) {
    correctNormalisedAnswer = normalise(correctAnswer);

    if (normalisedAnswer.includes(correctNormalisedAnswer)) {
      marks += 1;

      if (marks === maxMarks) {
        break;
      }
    }
  }

  return marks;
};

module.exports = { markAnswer };
