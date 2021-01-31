import React from 'react';
import { connect } from 'react-redux';
import { fetchTest, moveQuestion, addAnswer } from '../../actions';
import QuestionPresent from './QuestionPresent';

class Exam extends React.Component {
    testId = this.props.match.params.testid;
    qustionIndex = 0;
    constructor(props) {
        super(props);
        props.fetchTest(this.testId);
        this.state = { currentQuestion: {}, showQuestions: false };
    }
    componentDidMount() {

    }
    examDone =()=> this.props.test.questions.length > this.qustionIndex;
    startExam(e) {
        this.props.moveQuestion(this.props.test.questions[this.qustionIndex]);
        this.setState({ showQuestions: !this.props.currentQuestion });
    }
    onSubmit = (answer) => {
        this.qustionIndex = this.qustionIndex + 1;
        if (this.examDone){
            this.props.moveQuestion(this.props.test.questions[this.qustionIndex]);
        //console.log("props:", this.props);
        }
        console.log(answer);
        let sendAnswer ={ questionId: this.props.currentQuestion.Id, answer }
        console.log("answer", sendAnswer);
        this.props.addAnswer(sendAnswer);

    }
    SubmitExam = (e)=>{

    }
    render() {
        return (
            <div className="Exam">
                <div className="ui container">
                    <div className="ui card">{this.props.test?.Title}</div>
                    {this.state.showQuestions ? <QuestionPresent onSubmit={this.onSubmit} question={this.props.currentQuestion}></QuestionPresent> : null}
                </div>
               {this.examDone? (this.state.showQuestions ? null : <button onClick={(e) => this.startExam(e)}>Start</button>) : (<button onClick={this.SubmitExam}>Submit</button>)}

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
