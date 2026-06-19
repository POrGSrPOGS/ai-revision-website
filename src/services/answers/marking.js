// Logic for marking user answers

const { format } = require("morgan");
const reader = require("../questions/reader.js");
const extraction = require("./extraction.js");

const normalise = (text) => {
  let normalised = "";

  normalised = text.toLowerCase();

  return normalised;
};

const formats = {
  ShortAnswer: (word, correctAnswers) => {
    return correctAnswers.includes(word);
  },
  MultipleChoice: (word, correctAnswers) => {
    return correctAnswers.includes(word);
  },
  GapFill: (word, correctAnswers, answerNumber) => {
    console.log(answerNumber);
    return correctAnswers[answerNumber] == word;
  },
};

const markAnswers = (id, userAnswers) => {
  const question = reader.getQuestion(id);
  if (!question) {
    return null;
  }
  const maxMark = question.maxMark;
  const markPoints = question.markPoints;

  const formatName = question.format.name;
  const isCorrect = formats[formatName];

  let mark = 0;

  userAnswers.forEach((userAnswer, answerNumber) => {
    const words = userAnswer.split(" ");
    console.log(words);
    let wordAttempts = 0; // How many non filler words the user's message contained
    userAnswer = extraction.normalise(userAnswer);

    markPoints.forEach((markPoint, index) => {
      for (const word of words) {
        if (isCorrect(word, markPoint, answerNumber)) {
          mark += 1;
        } else if (extraction.isFillerWord(word)) {
          continue; // Skip filler words
        }

        if (wordAttempts >= maxMark) {
          mark -= 1;
        }

        wordAttempts += 1;
      }
    });
  });

  mark = Math.min(mark, maxMark);
  mark = Math.max(mark, 0);

  return mark;
};

module.exports = { markAnswers };
