import { useState, useEffect, useRef } from "react";

import components from "../components";
const { Toggle, Question, Marks } = components;

import questionFormats from "../components/questionFormats";

import { loadQuestion, answerQuestion } from "../services/questions";

export default function Home({}) {

  // Initialisation
  const [answer, setAnswer] = useState("");
  const [currentQuestion, setQuestion] = useState(null);
  const [marks, setMarks] = useState(null);

  const QuestionComponent = questionFormats[currentQuestion?.format.name ?? "ShortAnswer"]


  // Functions

  const displayQuestion = async(filters) => {
    const data = await loadQuestion(filters);
    console.log({ data });

    const displayInfo = data.displayInfo;
    setQuestion(displayInfo);
  };

  const submitAnswer = async() => {

    console.log("User answered:", answer);

    const data = await answerQuestion(answer);
    console.log({ data });

    const maxMark = currentQuestion.maxMark;
    const mark = data.mark;
    const correctAnswers = data.correctAnswers;

    setMarks({
      maxMark: maxMark,
      mark: mark,
      correctAnswers: correctAnswers,
    });
  };

  const nextQuestion = async() => {
    setMarks(null);
    setAnswer("");
    await displayQuestion();
  };

  const handleClick = async() => {
    if (marks) {
      await nextQuestion();
      
    } else {
      await submitAnswer();
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
            value={answer}
            onChange={setAnswer}
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
