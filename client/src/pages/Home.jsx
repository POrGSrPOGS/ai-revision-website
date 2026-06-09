import { useState, useEffect, useRef } from "react";

import components from "../components";
const { Input, Toggle, Question, Marks } = components;

export default function Home({ isDark, onToggleDark }) {
  const [answer, setAnswer] = useState("");
  const [currentQuestion, setQuestion] = useState(null);

  const [marks, setMarks] = useState(null);

  const [isAnswering, setIsAnswering] = useState(true);

  const loadQuestion = async () => {
    try {
      const response = await fetch("api/questions");
      const data = await response.json();
      const question = data.displayInfo;

      console.log({ data });
      
      setQuestion(question);

    } catch (error) {
      console.error("Failed to load question:");
    }
  };

  useEffect(() => {
    loadQuestion();
  }, []);

  const handleClick = async () => {
    if (!marks) {
      console.log("User answered:", answer);

      const response = await fetch(`/api/questions/answer`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          answer: answer,
        }),
      });

      const data = await response.json();

      const maxMark = currentQuestion.maxMark
      const mark = data.mark;
      const correctAnswers = data.correctAnswers;

      setMarks({
        maxMark: maxMark,
        mark: mark,
        correctAnswers: correctAnswers
      })

      console.log({ data });

    } else {
      setMarks(null)
      setAnswer("");
      loadQuestion();
    }
  };

  return (
    <>
      <Toggle
        label={isDark ? "Light Mode" : "Dark Mode"}
        value={isDark}
        onChange={onToggleDark}
      />
      <div className="flex justify-center min-h-screen pt-20">
        <main className="flex flex-col items-center gap-4">
          <Question question={currentQuestion} />

          <Input
            placeholder="Enter your answer"
            value={answer}
            onChange={(event) => setAnswer(event.target.value)}
            onSubmit={handleClick}
            buttonText={!marks ? "Submit" : "Next"}
            size="lx"
          />

          <Marks 
            marks={marks}
          />

        </main>
      </div>
    </>
  );
}
