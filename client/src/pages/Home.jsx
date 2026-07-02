import { useState, useEffect, useRef } from "react";

import components from "../components";
const { Toggle, Question, Marks, ProgressBar } = components;

import questionFormats from "../components/questionFormats";

import { loadQuestion, answerQuestion } from "../services/questions";

export default function Home({}) {
  // Initialisation
  const [answers, setAnswers] = useState([]);
  const [currentQuestion, setQuestion] = useState(null);
  const [marks, setMarks] = useState(null);
  const [formatRatios, setFormatRatios] = useState({});

  const QuestionComponent =
    questionFormats[currentQuestion?.format.name ?? "ShortAnswer"];

  // Functions

  const softmax = (logits, keys) => {
    // Turn values into a ratio
    const max = Math.max(...keys.map((k) => logits[k]));
    const exps = {};
    let sum = 0;

    for (const key of keys) {
      exps[key] = Math.exp(logits[key] - max);
      sum += exps[key];
    }

    const result = {};
    for (const key of keys) result[key] = exps[key] / sum;
    return result;
  };

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
    const keywordsFeedback = data.keywordsFeedback;
    const formatState = data.formatState;

    setMarks({
      maxMark: maxMark,
      mark: mark,
      markPoints: markPoints,
      keywordsFeedback: keywordsFeedback,
    });

    console.log({ formatState });
    const newFormatRatios = softmax(formatState, Object.keys(formatState));
    console.log({ newFormatRatios });

    setFormatRatios(newFormatRatios);
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
          <div>
            <ProgressBar
              title="ShortAnswers"
              progress={formatRatios.ShortAnswer ?? 0.33}
              theme={"red"}
            />
            <ProgressBar
              title="MultipleChoices"
              progress={formatRatios.MultipleChoice ?? 0.33}
              theme={"green"}
            />
            <ProgressBar
              title="GapFills"
              progress={formatRatios.GapFill ?? 0.33}
              theme={"blue"}
            />
          </div>
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
