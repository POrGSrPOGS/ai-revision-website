export default function Question({ question }) {
  return (
    <div className="text-center text-2xl mb-10">
      {question ? `${question.text} [${question.maxMark} Marks]` : "Loading..."}
    </div>
  );
}
