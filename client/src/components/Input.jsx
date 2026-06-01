export default function Input({ placeholder, value, onChange, onSubmit, buttonText }) {
  return (
    <>
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
      <button onClick={onSubmit}>{buttonText}</button>
    </>
  );
}