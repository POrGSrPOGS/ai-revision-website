export default function Question({ question }) {
  return (
    <div className = "text-center text-2xl mb-20">
      {question
        ? `${question.text} [${question.maxMark} Marks]`
        : "Loading..."}
    </div>
  );
}
