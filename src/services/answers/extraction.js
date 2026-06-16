const fillerWords = require("../../data/fillerWords.json")

const ignoredPunctuation = [
  ".", 
  ",",
]

const isFillerWord = (word) => {
  return fillerWords.includes(word)
}

const normalise = (text) => {
  const escaped = ignoredPunctuation.map(punctuationMark => "\\" + punctuationMark);
  const regex = new RegExp(`[${escaped.join("")}]`, "g");

  return text
    .toLowerCase()
    .replace(regex, "")
    .replace(/\s+/g, " ")
    .trim();
};

module.exports = { isFillerWord, normalise };
