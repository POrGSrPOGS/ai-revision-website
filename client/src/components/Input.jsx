export default function Input({ placeholder, value, onChange, onSubmit }) {
  return (
    <>
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
      <button onClick={onSubmit}>Submit</button>
    </>
  );
}