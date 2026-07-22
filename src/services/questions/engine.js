// Logic for selecting questions based on user data

const questionsReader = require("./reader.js");

// Helper function for picking completely randomly from a 1d list
const getRandomItem = (items) => {
  const randomIndex = Math.floor(Math.random() * items.length);

  return items[randomIndex];
};

// Return a random question id from a 1d list of question ids, ignoring excluded question ids
const getRandomQuestionId = (questionIds, excludedIds = []) => {
  console.log({excludedIds})
  let includedIds = [];
  console.log({questionIds})
  // Remove excluded ids from question ids
  includedIds = questionIds.filter((questionId) =>
    !excludedIds.includes(questionId),
  );
  console.log({includedIds})

  if (includedIds.length === 0) {
    console.warn(
      "No included question ids satisfy filter, allowing excluded question ids",
    );
    includedIds = questionIds;
  }

  const randomQuestionId = getRandomItem(includedIds);
  return randomQuestionId;
};

module.exports = { getRandomQuestionId };
