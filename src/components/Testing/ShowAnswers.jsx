import React from 'react';
import { fetchExam, moveQuestion } from '../../actions';
import { connect } from 'react-redux';
import AnswerPresent from './AnswerPresent'

class ShowAnswers extends React.Component {

    urlParams = new URLSearchParams(window.location.search);
    examId = this.urlParams.get('id');
    index = 0;
    constructor(props) {
        super(props);
        this.state={showClose:false};
        console.log("props", this.props);
        console.log(this.examId);
        props.fetchExam(this.examId);
    }

    showAnswers = () => {
        this.props.moveQuestion(this.props.currentExam?.answers[this.index]?.questionId)
        this.index++;
    }
    nextQuestion=()=>{
        this.props.moveQuestion(this.props.currentExam?.answers[this.index]?.questionId)
    this.examDone();

    }
    rederQuestionData() {
        return(
            <div className="ui card">
                <div>
                        <label>{this.props.currentQuestion?.Title}</label>
                    </div>
                    <div>
                        <h5 className="blue">{this.props.currentQuestion?.Tags?.map(t=>t+"||")}</h5>
                    </div>
                    <div className="ui attached segment">
                       <h2> {this.props.currentQuestion?.QuestionBody}</h2>
                    </div>
                    <div className="ui attached segment">
                        <h4>{this.props.currentQuestion?.ExtraInfo}</h4>
                    </div>
                    <div>
                        <button onClick={this.nextQuestion}>Next</button>
                    </div>
            </div>
                    )
    }

examDone=()=>{
    console.log("lenght",this.props.currentExam?.test?.questions?.length);
    console.log("index",this.index);
    this.setState({showClose: this.props.currentExam?.test?.questions?.length > this.index});
    
}

    render() {
        console.log("render");
        return (
            <div className="ShowAnswers">
                
                    {this.props.currentQuestion ? (<div className="ui container"><div className="ui card">{this.props.test?.Title}</div>
                    {this.rederQuestionData()}
                    <AnswerPresent question={this.props.currentQuestion} answers={this.props.currentExam?.answers}></AnswerPresent>
                </div>):<button onClick={this.showAnswers}>Show My Exam</button>}
                {this.state.showClose ? <button onClick={()=>window.close()}>Close</button> : null}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        currentExam: state.currentExam,
        currentQuestion: state.currentQuestion
    }
}

export default connect(mapStateToProps, { fetchExam, moveQuestion })(ShowAnswers)
