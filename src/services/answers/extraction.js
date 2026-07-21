const fillerWords = require("../../data/fillerWords.json");

const ignoredPunctuation = [".", ","];

const isFillerWord = (word) => {
  return fillerWords.includes(word);
};

const normalise = (text) => {
  return text
    .toLowerCase()
    .replace(/\p{P}/gu, "")
    .replace(/\s+/g, " ")
    .trim();
};

module.exports = { isFillerWord, normalise };
