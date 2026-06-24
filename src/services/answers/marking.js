// Logic for marking user answers

const reader = require("../questions/reader.js");
const extraction = require("./extraction.js");

const formats = {
  ShortAnswer: (word, correctAnswers) => {
    console.log({ word, correctAnswers });
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

const normaliseAnswers = (answers) => {
  const newAnswers = [];
  answers.forEach((answer) => {
    const normalised = extraction.normalise(answer);
    newAnswers.push(normalised);
  });

  return newAnswers;
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

  markPoints.forEach((markPoint, index) => {
    markPoints[index] = normaliseAnswers(markPoint);
  });

  const keywordsFeedback = [];
  let wordAttempts = 0; // How many non filler words the user's message contained

  userAnswers.forEach((userAnswer, answerNumber) => {
    userAnswer = extraction.normalise(userAnswer);
    const words = userAnswer.split(" ");
    console.log(words);

    const usedMarkingPoints = new Set(); // Marking points that have already been given
    let reusedMarkingPoint = false;

    console.log({ userAnswer, markPoints });

    words.forEach((word) => {
      const wordIsCorrect = markPoints.some((markPoint, index) => {
        // True if any markpoint includes the user's keyword

        if (isCorrect(word, markPoint, answerNumber)) {
          if (usedMarkingPoints.has(index)) {
            reusedMarkingPoint = true;
            return false;
          } else {
            usedMarkingPoints.add(index);
            return true;
          }
        } else {
          return false;
        }
      });

      if (!wordIsCorrect) {
        if (reusedMarkingPoint) {
          keywordsFeedback.push({
            word: word,
            feedback: "Ignored",
          });
          return;
        } else if (extraction.isFillerWord(word)) {
          return;
        }
      }

      const feedback = wordIsCorrect ? "Correct" : "Incorrect";

      if (wordIsCorrect) {
        mark += 1;
      }

      if (wordAttempts >= maxMark) {
        mark -= 1;
      }

      keywordsFeedback.push({
        word: word,
        feedback: feedback,
      });

      wordAttempts += 1;
    });
  });

  mark = Math.min(mark, maxMark);
  mark = Math.max(mark, 0);

  return { mark, keywordsFeedback };
};

module.exports = { markAnswers };
