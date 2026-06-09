export default function Submit({
  buttonText,
  placeholder,
  value,
  onChange,
  onSubmit,
  size,
}) {
  return (
    <div className={`flex items-center justify-center pt-20 ${size}`}>
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="border-1 border-green-700 text-xl p-1"
      />
      <button
        onClick={onSubmit}
        className="border border-green-500 p-1 text-xl"
      >
        {buttonText}
      </button>
    </div>
  );
}
