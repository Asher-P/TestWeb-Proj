import React from 'react';
import './TestForm.css';
import { connect } from 'react-redux';
import { selectQuestions } from '../../actions'
import FormInputs from './FormInputs';
import TestsSerevice from '../../services/testsService'
import QuestionBox from '../question-box-component/QuestionBox';


function ColorRow(e) {
    if (e.target.parentNode.tagName == "TR") {
        if (e.target.parentNode.classList.contains("green")) {
            e.target.parentNode.classList.remove("green");
            /*console.log("disable")*/
        }
        else {
            e.target.parentNode.classList.add("green");
            /*console.log("enable")*/
        }
    }
}



class TestForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {dataTable:[]};
        

    }
    
    componentDidMount(){
        this.setState({dataTable:this.renderQuestions()});
    }

    onSubmit = (test)=>{
        test={...test, questions: this.props.selectedQuestions.map(q=>q.Id)};
        alert("Test successfully created");
        TestsSerevice.addTest(test);
       window.location.reload();
    }
    renderQuestions() {
            let temp=[];
            this.props.questions
                .then(res => {
                    res.data.map((question, index) => {
                         temp.push(<tr key={question.Id} data-item={question}
                            onClick={(e)=>{
                                ColorRow(e)
                                this.props.selectQuestions(question);}} >
                            <td>{index}</td>
                            <td>{question.Id}</td>
                            <td><QuestionBox question={question}/></td>
                        </tr>)
                        this.setState({dataTable:temp});
                    })})}

    render() {
        return (
            <div className="TestForm">
                <FormInputs renderField={this.renderQuestions} onSubmit={this.onSubmit}></FormInputs>
                <div className="field">
                        <label>Chose questions</label>
                        <table className="ui celled table">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>ID</th>
                                    <th>Content</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.dataTable}
                            </tbody>
                        </table>
                    </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    
    return {
        questions: state.questions,
        selectedQuestions : state.questionsSelect
    };
}

export default connect(mapStateToProps, { selectQuestions })(TestForm);
