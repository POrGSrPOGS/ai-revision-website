export default function Toggle({ value, onChange, label }) {
  return (
    <button
      type="button"
      onClick={() => onChange(!value)}
      className={`px-4 py-2 transition ${
        value
          ? "bg-green-600 text-black font-bold text-lg "
          : "bg-gray-800 font-bold text-white"
      }`}
    >
      {label}
    </button>
  );
}
