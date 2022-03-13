import React, {useEffect, useState} from "react";

const QuizOver = React.forwardRef((props, ref) => {

    const {
        levelNames, 
        score,
        maxQuestions, 
        quizLevel, 
        percent,
        loadLevelQuestions
    } = props

    console.log(props)

    const [asked, setAsked] = useState([])

    useEffect(() => {
        setAsked(ref.current)
    }, [ref])

    const averageGrade = maxQuestions /2

    if (score < averageGrade) {
        setTimeout(() => {
            loadLevelQuestions(0)
        }, 3000)
    }

    const decision = score >= averageGrade ? (
        <>
        <div className="stepsBtnContainer">
            {
                quizLevel < levelNames.length ? 
                (   <>
                        <p className="successMsg">Bravo, passez au niveau suivant !</p>
                        <button onClick={() => loadLevelQuestions(quizLevel)} className="btnResult success">Niveau suivant</button>
                    </>
                ) 
                :
                (
                    <>
                        <p className="successMsg">Bravo, vous êtes un expert !</p>
                        <button onClick={() => loadLevelQuestions(0)} className="btnResult gameOver">Accueil</button>
                    </>
                )
            }
        </div>
        <div className="percentage">
            <div className="progressPercnet">Réussite : {percent}%</div>
            <div className="progressPercnet">Note : {score}/{maxQuestions}</div>
        </div>
        </>
    ) : (
        <>
            <div className="stepsBtnContainer">
                <p className="failureMsg">Vous avez échoué !</p>
            </div>
            <div className="percentage">
                <div className="progressPercnet">Réussite : {percent}%</div>
                <div className="progressPercnet">Note : {score}/{maxQuestions}</div>
            </div>
        </>
    )

    const questionAnswer = score >= averageGrade ? (
        asked.map((question) => {
            return (
                <tr key={question.id}>
                    <td>{question.question}</td>
                    <td>{question.answer}</td>
                    <td>
                        <button className="btnInfo">
                            Infos
                        </button>
                    </td>
                </tr>
            )
    
        })

    ) : (
        <tr>
            <td colSoan="3">
                <div className="loader"></div>
                <p style={{textAlign: "center", color: "red"}}>Pas de réponses !</p>
            </td>
        </tr>

    )

    return(
        <>
            {decision}
            <hr/>
            <p>Les réponses aux questions posées :</p>
            <div className="answerCont">
                <table className="answers">
                    <thead>
                        <tr>
                            <th>Question</th>
                            <th>Réponses</th>
                            <th>Infos</th>
                        </tr>
                    </thead>
                    <tbody>
                        {questionAnswer}
                    </tbody>
                </table>
            </div>
        </>
    )
})


export default React.memo(QuizOver)