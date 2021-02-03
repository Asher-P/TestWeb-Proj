import React from 'react';
import { connect } from 'react-redux';
import { fetchTest, moveQuestion, addAnswer } from '../../actions';
import QuestionPresent from './QuestionPresent';
import { Link } from "react-router-dom";
import './Exam.css';

class Exam extends React.Component {
    testId = this.props.match.params.testid;
    qustionIndex = 0;
    constructor(props) {
        super(props);
        props.fetchTest(this.testId);
        this.state = { currentQuestion: {}, showQuestions: false, studentName: "", studentId: "" };
    }
    componentDidMount() {

    }
    examNotDone = () => this.props.test.questions?.length > this.qustionIndex;
    startExam(e) {
        this.props.moveQuestion(this.props.test.questions[this.qustionIndex]);
        this.setState({ showQuestions: !this.props.currentQuestion });
    }
    onSubmit = (answer) => {
        this.qustionIndex = this.qustionIndex + 1;
        if (this.examNotDone) {
            this.props.moveQuestion(this.props.test.questions[this.qustionIndex]);
            //console.log("props:", this.props);
        }
        console.log(answer);
        let sendAnswer = {
            questionId: this.props.currentQuestion.Id,
            answer,
            correctAnswer: this.props.currentQuestion.Answers.filter(a => a.isCorrect == true).map(a => a.Content)
        }
        console.log("answer", sendAnswer);
        this.props.addAnswer(sendAnswer);
        // if(this.examNotDone()){
        //     React.ReactDom.render(
        //         <Link><button>submit</button></Link>
        //     )
        // }

    }

    renderRegister = () => {
        return (
            <div>
                <div>
                <label className="input">FullName</label>
                <input type="text" value={this.state.studentName} 
                onChange={(e)=>this.setState({studentName:e.target.value})} className="ui input"></input>
                </div>
                <div>
                <label className="input">ID</label>
                <input type="text" value={this.state.studentId}
                onChange={(e)=>this.setState({studentId:e.target.value})} className="ui input"></input>
                </div>
                <div>
                    <button onClick={(e) => this.startExam(e)}>Start</button>
                </div>
            </div>
        )

    }
    render() {
        console.log(this.examNotDone());
        return (
            <div className="Exam">
                <div className="ui container">
                    <div className="ui card">{this.props.test?.Title}</div>
                    {this.state.showQuestions ? <QuestionPresent onSubmit={this.onSubmit} question={this.props.currentQuestion}></QuestionPresent> : null}
                </div>
                {this.examNotDone() ? (this.state.showQuestions ? null : this.renderRegister()) : (<Link to={
                    {
                        pathname: "/CertificateDisplay", formProps: {
                            test: this.props.test,
                            answers: this.props.answers,
                            student: { studentName: this.state.studentName, studentId: this.state.studentId }
                        }
                    }
                }>Submit</Link>)}

            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return ({
        test: state.test,
        currentQuestion: state.currentQuestion,
        answers: state.answers
    })

}
export default connect(mapStateToProps, { fetchTest, moveQuestion, addAnswer })(Exam)
