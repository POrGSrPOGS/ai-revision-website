import { useState, useMemo, useEffect } from "react";

const gapRegex = /\{gap-(\d+)\}/;

export default function GapFill({
  buttonText,
  placeholder,
  answers,
  onChange,
  onSubmit,
  format,
}) {
  const sentence = format.sentence;
  const splitSentence = sentence.split(" ");

  const setArrayIndex = (array, index, value) => {

    const newArray = structuredClone(array)
    newArray[index] = value

    return newArray
  }

  let gapCount = 0;

  
  const unfinishedSentence = splitSentence.map((text, index) => {

    const gapMatch = text.match(gapRegex) || []
    const answerLength = gapMatch[1]

    if (answerLength !== undefined) {

        const answerIndex = gapCount++;

      return (
        <input
        key={index}
          type="text"
          value={answers[answerIndex] || ""}
          onChange={(event) => onChange(setArrayIndex(answers, answerIndex, event.target.value))}
          className="border border-green-700 text-xl p-1 text-center font-bold"
          style={{ width: `${Math.round(answerLength*1.3)}ch` }}
        />
      );


    } else {
      return <p key={index} className="text-xl">{text}</p>;
    }
  });

  return (
    <form className="flex flex-row items-center gap-1" onSubmit={onSubmit}>
      {unfinishedSentence}

      <button
        type="submit"
        className="border border-green-500 px-4 py-1 text-xl"
      >
        {buttonText}
      </button>
    </form>
  );
}
