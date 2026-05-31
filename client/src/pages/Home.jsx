import { useState, useEffect } from "react";
import Input from "../components/Input";

export default function Home({ isDark, onToggleDark }) {
  const [answer, setAnswer] = useState("");
  const [question, setQuestion] = useState(null);

  const handleSubmit = () => {
    console.log("User answered:", answer);
  };

  useEffect(() => {
    const loadQuestion = async () => {
      try {
        const res = await fetch("api/questions/q1a");
        const response = await res.json();
        const questionData = response.data;
        setQuestion(questionData);
        console.log("Question Information: ", questionData);
      } catch (err) {
        console.error("Failed to load question:", err);
      }
    };

    loadQuestion();
  }, []);

  return (
    <>
      <button className="theme-toggle" onClick={onToggleDark}>
        {isDark ? "☀️ Light" : "🌙 Dark"}
      </button>
      <main>
        <h1>
          Question: {question ? question.text : "Loading..."}
        </h1>

        <Input
          placeholder="Enter your answer"
          value={answer}
          onChange={(event) => setAnswer(event.target.value)}
          onSubmit={handleSubmit}
        />
      </main>
    </>
  );
}