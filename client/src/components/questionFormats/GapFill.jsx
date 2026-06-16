import { useState, useMemo } from "react";

const gapToken = "{gap}"

export default function MultipleChoice({
  buttonText,
  placeholder,
  answers,
  onChange,
  onSubmit,
  format,
}) {

    
  return (
    <form className="flex flex-col items-center gap-8" onSubmit={onSubmit}>
      <button
        type="submit"
        className="border border-green-500 px-4 py-1 text-xl"
      >
        {buttonText}
      </button>
    </form>
  );
}
