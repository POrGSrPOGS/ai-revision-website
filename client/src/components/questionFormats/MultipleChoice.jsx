import { useState, useMemo } from "react";

export default function MultipleChoice({
  buttonText,
  placeholder,
  value,
  onChange,
  onSubmit,
  format,
}) {
  const handleSubmit = (event) => {
    // Decides how to get the user's answer and sends it to the server
    event.preventDefault();
    onSubmit(value);
  };

  const getColour = (option) => {
    let colour = "";

    if (value === option) {
      colour = "border-green-300 bg-green-900";
    } else {
      colour = "border-green-500";
    }

    return colour;
  };

  const getRandomIndex = (array) => {
    const index = Math.floor(Math.random() * array.length);
    return index;
  };

  const shuffleOptions = (options) => {
    const arr = structuredClone(options);
    const origLength = arr.length;
    const result = [];

    for (let i = 0; i < origLength; i++) {
      const randomIndex = getRandomIndex(arr);
      const randomOption = arr[randomIndex];

      result.push(randomOption);
      arr.splice(randomIndex, 1);
    }

    return result;
  };

  const options = useMemo(() => {
    return shuffleOptions(format.options);
  }, [format.options]);

  return (
    <form className="flex flex-col items-center gap-8" onSubmit={handleSubmit}>
      <ul className="flex flex-wrap justify-center gap-4 text-xl font-mono text-green-600">
        {options.map((option) => (
          <li key={option}>
            <button
              type="button"
              onClick={() => onChange(option)}
              className={`w-40 border p-2 text-center ${getColour(option)}`}
            >
              {option}
            </button>
          </li>
        ))}
      </ul>

      <button
        type="submit"
        disabled={!value}
        className="border border-green-500 px-4 py-1 text-xl"
      >
        {buttonText}
      </button>
    </form>
  );
}
