const { Router } = require("express");
const reader = require("../services/questionReader.js");
const { markAnswer } = require("../services/marking.js");
const engine = require("../services/questionEngine.js")
const router = Router();

router.get("/", (request, response) => {
    const filters = request.query;
    console.log(`User wants a question set with filters:`)
    console.log(filters)
    const questions = reader.getQuestions(filters)

    const question = engine.getRandomQuestion(questions, [request.session.currentQuestion])
    //request.session.currentQuestionSet = questions
    request.session.currentQuestion = question.id

    if (!questions) {
        return response.status(404).json("No question(s) found");
    };

    const displayInfo = reader.getDisplayInfo(question);

    response.status(200).json(displayInfo);
});

router.post("/answer", (request, response) => {

    const id = request.session.currentQuestion;
    const { answer } = request.body;


    console.log({
        id,
        answer
    });

    const marks = markAnswer(id, answer);

    response.status(200).json(marks);
});


module.exports = router;