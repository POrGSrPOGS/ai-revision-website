// Logic for marking user answers

const questionsReader = require("./questionReader.js");

const normalise = (text) => {
    var normalised = text;

    normalised = normalised.toLowerCase();
    normalised = normalised.replace(/[^\w\s]/g, ""); // Strip punctuation

    return normalised;
};

const markAnswer = (id, answer) => {
    normalisedAnswer = normalise(answer);

    const question = questionsReader.getQuestion(id);
    if (!question) {
        return null;
    };

    const maxMarks = question.maxMarks;

    const correctAnswers = question.answers;
    
    var marks = 0;

    for (const correctAnswer of correctAnswers) {
        correctNormalisedAnswer = normalise(correctAnswer);

        if (normalisedAnswer.includes(correctNormalisedAnswer)) {
            marks += 1;

            if (marks === maxMarks) {
                break;
            };
        };
    };

    return marks;
};

module.exports = { markAnswer };