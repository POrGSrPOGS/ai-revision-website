const relativeMarkScore = (lastMark, newMark, maxMark) => {

    const improvement = newMark - lastMark
    const maxImprovement = maxMark - lastMark

    return Math.max(0, improvement / maxImprovement)
}

module.exports = { relativeMarkScore }