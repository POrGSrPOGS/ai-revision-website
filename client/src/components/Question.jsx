export default function Question({ question }) {
  return (
    <div className = "text-center text-2xl">
      {question
        ? `${question.text} [${question.maxMark} Marks]`
        : "Loading..."}
    </div>
  );
}
