export default function Marks({ marks }) {
  if (!marks) return null;

  const maxMark = marks?.maxMark;

  const mark = marks?.mark;
  const markPoints = marks?.markPoints;
  const keywordsFeedback = marks?.keywordsFeedback;

  let feedback = "";
  let colour = "";

  if (mark === maxMark) {
    feedback = "Perfection!";
    colour = "text-green-400";
  } else if (mark > 0) {
    feedback = "Almost!";
    colour = "text-orange-400";
  } else {
    feedback = "Better luck next time";
    colour = "text-red-400";
  }

  console.log(markPoints);

  const userAnswers = keywordsFeedback.map((keywordFeedback, index) => {
    const keyword = keywordFeedback.word;

    return (
      <h3 key={index} className="">
        {keyword} ({keywordFeedback.feedback})
      </h3>
    );
  });

  const correctAnswers = markPoints.map((markPoint, index) => (
    <div key={index} className="mt-6">
      <h2 className="text-xl font-semibold">Marking Point {index + 1}: </h2>

      <ul className="list-none p-0 m-0">
        {markPoint.map((correctAnswer, i) => (
          <li key={i}>• {correctAnswer}</li>
        ))}
      </ul>
    </div>
  ));

  return (
    <div className={`text-3xl font-bold text-center `}>
      <div className={`text-4xl mt-5 ${colour}`}> {`${feedback}`}</div>
      <div className={`mt-3 text-2xl ${colour}`}>
        {" "}
        {`[ ${mark} / ${maxMark} ] `}{" "}
      </div>

      <div className="font-mono text-blue-400 mt-10 text-left">
        <div className="text-3xl mb-4"> Your Answers: </div>
        <div className="text-2xl "> {userAnswers} </div>
      </div>

      <div className="font-mono text-green mt-10 text-left">
        <div className="text-3xl mb-4"> Correct Answers: </div>
        <div className="text-2xl "> {correctAnswers} </div>
      </div>
    </div>
  );
}
