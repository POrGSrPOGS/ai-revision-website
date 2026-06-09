export default function Marks({ marks }) {
    if (!marks) return

    const maxMark = marks?.maxMark

    const mark = marks?.mark
    const correctAnswers = marks?.correctAnswers

    let feedback = ""
    if (mark === maxMark) {
        feedback = "Excellent"
    } else if (mark > 0) {
        feedback = "Almost"
    } else {
        feedback = "Better luck next time"
    }
    
    return(

        <div className = "text-3xl mt-5 font-bold text-green-400">
            {`[ ${mark} / ${maxMark} ] ${feedback}!`}
            
            <ul className= "text-xl mt-10 font-mono text-green-600">
                <div className = "mb-4"> Possible Answers: </div>
                {correctAnswers.map((correctAnswer, index) => (
                    <li key={index}>{`• "${correctAnswer}" [1] `}</li>

                ))}

            </ul>
            
        </div>
  )



}