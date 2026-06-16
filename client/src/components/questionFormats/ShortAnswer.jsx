export default function ShortAnswer({
  buttonText,
  placeholder,
  answers,
  onChange,
  onSubmit,
  format,
}) {

  return (
    <form
      className={`flex items-center justify-center pt-20`}
      onSubmit={onSubmit}
    >
      <input
        type="text"
        placeholder={placeholder}
        answers={answers[0]}
        onChange={(event) => onChange([event.target.value])}
        className="border-1 border-green-700 text-xl p-1"
      />
      <button type="submit" className="border border-green-500 px-4 py-1 text-xl">
        {buttonText}
      </button>
    </form>
  );
}
