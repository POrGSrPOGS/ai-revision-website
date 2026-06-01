const { Router } = require("express");
const questions = require("../services/questionReader.js");
const { markAnswer } = require("../services/marking.js");
const questionsData = require("../data/questionsData.json");
const { selectQuestion } = require("../services/questionEngine.js")

const router = Router();

router.get("/", (request, response) => {
    const question = selectQuestion(questionsData);

    if (!question) {
        return response.status(404).json("Question not found");
    };

    const displayInfo = questions.getDisplayInfo(question);

    response.status(200).json(displayInfo);
});

router.get("/:id", (request, response) => {
    const question = questions.getQuestion(request.params.id);

    if (!question) {
        return response.status(404).json("Question not found");
    };

    const displayInfo = questions.getDisplayInfo(question);

    response.status(200).json(displayInfo);
});



router.post("/:id/answer", (request, response) => {
  const { id } = request.params;
  const { answer } = request.body;

  const marks = markAnswer(id, answer);

  response.status(200).json(marks);
});


module.exports = router;