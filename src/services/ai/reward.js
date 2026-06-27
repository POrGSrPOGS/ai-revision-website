const relativeMarkScore = (lastMark = 0, newMark, maxMark) => {

    const improvement = newMark - lastMark
    const maxImprovement = maxMark - lastMark

    console.log(lastMark, newMark, maxMark)

    if (maxImprovement === 0) {
        return 0.5
    }

    return Math.max(0, improvement / maxImprovement)
}

module.exports = { relativeMarkScore }