const { Router } = require("express");
const reader = require("../services/questionReader.js");
const { markAnswer } = require("../services/marking.js");
const { selectQuestion } = require("../services/questionEngine.js")
const router = Router();

router.get("/", (request, response) => {
    const filters = request.query;
    console.log(`User wants a question set with filters:`)
    console.log(filters)
    questions = reader.getQuestions(filters)
    request.session.currentQuestionSet = questions
    request.session.curr

    if (!questions) {
        return response.status(404).json("No question(s) found");
    };

    const displayInfo = questions.getDisplayInfo(question);

    response.status(200).json(displayInfo);
});

router.post("/answer", (request, response) => {
  const { id } = request.params;
  const { answer } = request.body;

  const marks = markAnswer(id, answer);

  response.status(200).json(marks);
});


module.exports = router;