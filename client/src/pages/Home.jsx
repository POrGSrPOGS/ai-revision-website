import { useState, useEffect, useRef } from "react";

import components from "../components";
const { Toggle, Question, Marks } = components;

import questionFormats from "../components/questionFormats";

import { loadQuestion, answerQuestion } from "../services/questions";

export default function Home({}) {
  // Initialisation
  const [answers, setAnswers] = useState([]);
  const [currentQuestion, setQuestion] = useState(null);
  const [marks, setMarks] = useState(null);

  const QuestionComponent =
    questionFormats[currentQuestion?.format.name ?? "ShortAnswer"];

  // Functions

  const displayQuestion = async (filters) => {
    const data = await loadQuestion(filters);
    console.log({ data });

    const displayInfo = data.displayInfo;
    setQuestion(displayInfo);
  };

  const submitAnswers = async () => {
    console.log("User answered:", answers);

    const data = await answerQuestion(answers);
    console.log({ data });

    const maxMark = currentQuestion.maxMark;
    const mark = data.mark;
    const markPoints = data.markPoints;

    setMarks({
      maxMark: maxMark,
      mark: mark,
      markPoints: markPoints,
    });
  };

  const nextQuestion = async () => {
    setMarks(null);
    setAnswers([]);
    await displayQuestion();
  };

  const handleClick = async (event) => {
    event.preventDefault();
    if (marks) {
      await nextQuestion();
    } else {
      await submitAnswers();
    }
  };

  // Effects

  useEffect(() => {
    displayQuestion();
  }, []);

  // UI

  return (
    <>
      <div className="flex justify-center min-h-screen pt-20">
        <main className="flex flex-col items-center gap-4">
          <Question question={currentQuestion} />

          <QuestionComponent
            placeholder="Enter your answer"
            answers={answers}
            onChange={setAnswers}
            onSubmit={handleClick}
            buttonText={marks ? "Next" : "Submit"}
            format={currentQuestion?.format}
          />

          <Marks marks={marks} />
        </main>
      </div>
    </>
  );
}
