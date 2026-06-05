import { useState, useEffect, useRef } from "react";
import Input from "../components/Input";

export default function Home({ isDark, onToggleDark }) {
  const [answer, setAnswer] = useState("");
  const [currentQuestion, setQuestion] = useState(null);

  const [currentMark, setMark] = useState(null);
  const [correctAnswers, setCorrectAnswers] = useState(null)

  const [buttonText, setButtonText] = useState("Submit")
  const hasLoaded = useRef(false);


  let markFeedback = "";
  let correctAnswersFeedback = "";

  if (currentMark !== null) {
    if (currentMark == currentQuestion.maxMarks) {
      markFeedback = "🟢"; // Full marks

    } else if (currentMark > 0){
      markFeedback = "🟠"; // Partial marks

    } else {
      markFeedback = "🔴"; // No marks
    }

    markFeedback += ` [${currentMark}/${currentQuestion.maxMarks}]`
    }

    if (correctAnswers?.length) {
      correctAnswersFeedback =
        "\nCorrect answers:\n" +
        correctAnswers.map(answer => `•  ${answer}`).join("\n");
    }

  const loadQuestion = async () => {
    try {
      const response = await fetch("api/questions");
      const data = await response.json();
      const question = data.displayInfo

      console.log({data});

      setQuestion(question);
      setMark(null);
      setCorrectAnswers(null);

    } catch (error) {
      console.error("Failed to load question:");
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

      const data = await response.json();
      const marks = data.marks
      const possibleAnswers = data.possibleAnswers
      
      console.log({data});

      setCorrectAnswers(possibleAnswers)
      setMark(marks);
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
          {markFeedback}
        </h2>  
        <h3 style={{ whiteSpace: "pre-wrap" }}> {correctAnswersFeedback} </h3>
      </main>
    </>
  );
}