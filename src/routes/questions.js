const { Router } = require("express");
const reader = require("../services/questionReader.js");
const { markAnswer } = require("../services/marking.js");
const engine = require("../services/questionEngine.js")
const router = Router();

router.get("/", (request, response) => {
    const filters = request.query;
    console.log({filters})
    const questions = reader.getQuestionIds(filters)

    const excluded = []

    currentQuestionId = request.session.currentQuestionId
    if (currentQuestionId){
        excluded.push(currentQuestionId)
    }

    const questionId = engine.getRandomQuestionId(questions, excluded)
    //request.session.currentQuestionSet = questions
    request.session.currentQuestionId = questionId
    if (!questions) {
        return response.status(404).json("No question(s) found");
    };

    question = reader.getQuestion(questionId)

    const displayInfo = reader.getDisplayInfo(question);
    console.log({displayInfo})

    response.status(200).json(displayInfo);
});

router.post("/answer", (request, response) => {

    const id = request.session.currentQuestionId;
    const { answer } = request.body;


    console.log({
        id,
        answer
    });

    const marks = markAnswer(id, answer);

    response.status(200).json(marks);
});


module.exports = router;