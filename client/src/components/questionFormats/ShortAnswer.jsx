export default function ShortAnswer({
  buttonText,
  placeholder,
  value,
  onChange,
  onSubmit,
  format,
}) {
  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(event);
  };

  return (
    <form
      className={`flex items-center justify-center pt-20`}
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="border-1 border-green-700 text-xl p-1"
      />
      <button type="submit" className="border border-green-500 p-1 text-xl">
        {buttonText}
      </button>
    </form>
  );
}
