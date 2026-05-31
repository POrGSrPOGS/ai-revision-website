const { Router } = require("express");
const questions = require("../controllers/questions");

const router = Router();

router.get("/:id", (request, response) => {
    const question = questions.getQuestion(request.params.id);
    const displayInfo = questions.getDisplayInfo()

    if (!question) {
        return response.status(404).json("Question not found");
    }

    response.status(200).json(displayInfo)
});

const { markAnswer } = require("../services/marking");

router.post("/:id/answer", (req, res) => {
  const { id } = req.params;
  const { answer } = req.body;

  const result = markAnswer(id, answer);

  res.json(result);
});


module.exports = router;