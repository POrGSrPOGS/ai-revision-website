export default function Marks({ marks }) {
    if (!marks) return

    const maxMark = marks?.maxMark

    const mark = marks?.mark
    const correctAnswers = marks?.correctAnswers

    let feedback = ""
    let colour = ""

    if (mark === maxMark) {
        feedback = "Perfection!"
        colour = "green-400"
    } else if (mark > 0) {
        feedback = "Almost!"
        colour = "orange-400"
    } else {
        feedback = "Better luck next time"
        colour = "red-400"
    }
    
    return(

        <div className = {`text-3xl mt-5 font-bold text-${colour}`}>
            {`[ ${mark} / ${maxMark} ] ${feedback}`}
            
            <ul className= "text-xl mt-10 font-mono text-green-600">
                <div className = "mb-4"> Correct Answers: </div>
                {correctAnswers.map((correctAnswer, index) => (
                    <li key={index}>{`• "${correctAnswer}" [1] `}</li>

                ))}

            </ul>
            
        </div>
  )
}
