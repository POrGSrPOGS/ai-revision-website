const relativeMarkScore = (lastMark = 0, newMark, maxMark) => {
  return ((newMark - lastMark) / maxMark + 1) / 2;
};

module.exports = { relativeMarkScore };
