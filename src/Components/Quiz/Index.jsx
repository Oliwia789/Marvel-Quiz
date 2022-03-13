import React, {Component} from "react";
import { toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.min.css"
import Levels from "../Levels/Index";
import ProgressBar from "../ProgressBar/Index";
import QuizOver from "../QuizOver/Index";
import { QuizMarvel } from "../quizMarvel/Index";


toast.configure()

class Quiz extends Component {

    state = {
        levelNames: ["debutant", "confirme", "expert"],
        quizLevel: 0,
        maxQuestions: 10,
        storedQuestions: [],
        question: null,
        options: [],
        idQuestion: 0,
        btnDisabled: true,
        userAnswer: null,
        score: 0,
        showWelcomeMsg: false,
        quizEnd: false
    }

    storedDataRef = React.createRef()

    showWelcomeMsg = pseudo => {
        if(!this.state.showWelcomeMsg) {
            this.setState({
                showWelcomeMsg: true
            })
            toast.warn(`Bienvenue ${pseudo}, et bonne chance !`, {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: false
            })
        }
    }

    loadQuestions = level => {
        const fetchedArrayQuiz = QuizMarvel[0].quizz[level]
        if(fetchedArrayQuiz.length >= this.state.maxQuestions ) {
            this.storedDataRef.current = fetchedArrayQuiz
            const newArray = fetchedArrayQuiz.map(({answer, ...keepRest}) => keepRest)
            this.setState({
                storedQuestions: newArray
            })

        } else {

        }
    }

    componentDidMount() {
        this.loadQuestions(this.state.levelNames[this.state.quizLevel])
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.storedQuestions !== prevState.storedQuestions) {
            this.setState({
                question: this.state.storedQuestions[this.state.idQuestion].question,
                options: this.state.storedQuestions[this.state.idQuestion].options
            })

        }
        if (this.state.idQuestion !== prevState.idQuestion) {
            this.setState({
                question: this.state.storedQuestions[this.state.idQuestion].question,
                options: this.state.storedQuestions[this.state.idQuestion].options,
                stauserAnswer: null,
                btnDisabled: true
            })
        }
        if(this.props.userData.pseudo) {
            this.showWelcomeMsg(this.props.userData.pseudo)
        }
    }

    submitAnswer = selectedAnswer => {
        this.setState({
            userAnswer: selectedAnswer,
            btnDisabled: false
        })
    }

    nextQuestion = () => {
        if(this.state.idQuestion === this.state.maxQuestions -1) {
            this.gameOver()

        } else {
            this.setState((prevState) => ({
                idQuestion: prevState.idQuestion +1
            }))
        }
        const goodAnswer = this.storedDataRef.current[this.state.idQuestion].answer
        if(this.state.userAnswer === goodAnswer) {
            this.setState((prevState) => ({
                score: prevState.score +1
            }))
            toast.success("Bravo +1", {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: false
            })
        } else {
            toast.error("Raté 0", {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: false
            })
        }
    }

    gameOver = () => {
        this.setState({
            quizEnd: true
        })

    }

    render(){

        const displayOptions = this.state.options.map((options, index) => {
            return (
                <p key={index} onClick={() => this.submitAnswer(options)} className={`answerOptions ${this.state.userAnswer === options ? "selected" : null}`}>{options}</p>
            )

        })

        return this.state.quizEnd ? (<QuizOver ref={this.storedDataRef}/>) : (
            <>
            <Levels/>
            <ProgressBar idQuestion={this.state.idQuestion} maxQuestion={this.state.maxQuestions}/>
            <h2>{this.state.question}</h2>
            {displayOptions}
            <button 
            disabled={this.state.btnDisabled} 
            className="btnSubmit" 
            onClick={this.nextQuestion}
            >
            {this.state.idQuestion < this.state.maxQuestions -1 ? "Suivant" : "Terminer"}
            </button>
            </> 
        )
    }
}

export default Quiz