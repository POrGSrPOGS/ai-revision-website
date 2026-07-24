const relativeMarkScore = (lastMark = 0, newMark, maxMark) => {
  
  if (newMark === 0) {
    return 0
  }

  return ((newMark - lastMark) / maxMark + 1) / 2;
};

module.exports = { relativeMarkScore };
