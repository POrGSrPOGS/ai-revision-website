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
        value={answers[0]||""}
        onChange={(event) => onChange([event.target.value])}
        className="border border-green-700 text-xl p-3 rounded-l-lg"
      />
      <button type="submit" className="border border-green-500 px-4 py-3 text-xl rounded-r-lg">
        {buttonText}
      </button>
    </form>
  );
}
