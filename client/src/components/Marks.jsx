export default function Marks({ marks }) {
  if (!marks) return null;

  const maxMark = marks?.maxMark;

  const mark = marks?.mark;
  const markPoints = marks?.markPoints;
  const keywordsFeedback = marks?.keywordsFeedback;

  let encouragementText = "";
  let encouragementColour = "";

  if (mark === maxMark) {
    encouragementText = "Perfection!";
    encouragementColour = "text-green-400";
  } else if (mark > 0) {
    encouragementText = "Almost!";
    encouragementColour = "text-orange-400";
  } else {
    encouragementText = "Better luck next time";
    encouragementColour = "text-red-400";
  }

  console.log(markPoints);

  const userAnswers = keywordsFeedback.map((keywordFeedback, index) => {
    const keyword = keywordFeedback.word;
    const feedback = keywordFeedback.feedback

    let userAnswerColour = ""

    if (feedback === "Correct") {
      userAnswerColour = "text-green-600"
    } else if (feedback === "Incorrect") {
      userAnswerColour = "text-red-600"
    } else if (feedback === "Ignored") {
      userAnswerColour = "text-gray-400"
    }


    return (
      <h3 key={index} className="">
        <span className={`${userAnswerColour}`}> {keyword} ({feedback}) </span>
         
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
      <div className={`text-4xl mt-5 ${encouragementColour}`}> {`${encouragementText}`}</div>
      <div className={`mt-3 text-2xl ${encouragementColour}`}>
        {`[ ${mark} / ${maxMark} ] `}
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
