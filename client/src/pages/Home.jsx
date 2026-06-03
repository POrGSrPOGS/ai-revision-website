import { useState, useEffect, useRef } from "react";
import Input from "../components/Input";

export default function Home({ isDark, onToggleDark }) {
  const [answer, setAnswer] = useState("");
  const [currentQuestion, setQuestion] = useState(null);
  const [currentMark, setMark] = useState(null);
  const [buttonText, setButtonText] = useState("Submit")
  const hasLoaded = useRef(false);


  let feedbackText;

  if (currentMark !== null) {
    if (currentMark == currentQuestion.maxMarks) {
      feedbackText = "🟢"; // Full marks

    } else if (currentMark > 0){
      feedbackText = "🟠"; // Partial marks

    } else {
      feedbackText = "🔴"; // No marks
    }

    feedbackText += ` [${currentMark}/${currentQuestion.maxMarks}]`
    }

  const loadQuestion = async () => {
    try {
      const response = await fetch("api/questions?");
      const question = await response.json();
      setQuestion(question);
      console.log("Question Information: ", question);
      setMark(null);
    } catch (error) {
      console.error("Failed to load question:", error);
    }
  };

  useEffect(() => {
    if (hasLoaded.current) return;
    hasLoaded.current = true;
    loadQuestion();
  }, []);

  const handleClick = async () => {
    if (buttonText === "Submit"){

      console.log("User answered:", answer);

      const response = await fetch(`/api/questions/answer`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          answer: answer
        })
      });

      const mark = await response.json();
      console.log(`${mark} marks`);
      setMark(mark);

      setButtonText("Next");

    } else {
      setAnswer("")
      loadQuestion()
      setButtonText("Submit");
    };
  };

  return (
    <>
      <button className="theme-toggle" onClick={onToggleDark}>
        {isDark ? "☀️ Light" : "🌙 Dark"}
      </button>
      <main>
        <h1>
          Question: {currentQuestion ? `${currentQuestion.text} [${currentQuestion.maxMarks} Marks]` : "Loading..."}
        </h1>

        <Input
          placeholder="Enter your answer"
          value={answer}
          onChange={(event) => setAnswer(event.target.value)}
          onSubmit={handleClick}
          buttonText = {buttonText}
        />

        <h2>
          {feedbackText}
        </h2>  
        {/* ✅ ❌  */}
      </main>
    </>
  );
}