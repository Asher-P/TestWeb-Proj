import React from 'react';
import '../test-form/TestForm.css';
import { connect } from 'react-redux';
import { selectQuestions, clearselectQuestions } from '../../actions'
import FormInputs from '../test-form/FormInputs';
import TestsSerevice from '../../services/testsService'
import QuestionBox from '../question-box-component/QuestionBox';
import Popup from '../popup-component/Popup'
import TestsService from '../../services/testsService';
import QuestionService from '../../services/questionsService';


function ColorRow(e) {
    let TR = e.target;
    while (TR.tagName != "TR") {
        TR = TR.parentNode;
    }
    if (TR.classList.contains("green")) {
        TR.classList.remove("green");
        /*console.log("disable")*/
    }
    else {
        TR.classList.add("green");
        /*console.log("enable")*/
    }
}




class TestEdit extends React.Component {
    constructor(props) {
        super(props);
        console.log("testEdit Prpos",this.props);

        this.state = { dataTable: [], filterTag: "", questions: [], showPopup:{show:false, content:null} };
         props.Test.questions.map(qustionId=>{
             QuestionService.getQuestionById(qustionId).then(res=>{
                 props.selectQuestions(res.data);
             });
         })
        this.initQuestions();

    }

    initQuestions = () => {
        this.props.questions.then(res => {
            this.setState({ questions: res.data });
        })
    }

    togglePopup=(question)=> {
        this.setState({
            showPopup:{show: !this.state.showPopup.show, content:question}
        });
    }


    componentDidMount() {
        this.setState({ dataTable: this.renderQuestions() });
    }

    onSubmit = (test) => {
        test = { ...test, questions: this.props.selectedQuestions.map(q => q.Id) };
        alert("Test successfully created");
        TestsSerevice.addTest(test);
        window.location.reload();
    }
    checkTags=(tag)=>{
            const filterTags = this.state.filterTag.split(",");
            console.log("FilterTag:",filterTags);
            console.log("tag:",tag);
            console.log("flag", filterTags.includes(tag));
            if(filterTags.includes(tag))
                return true;
        return false
        

    }
    renderQuestions() {
        let temp = [];
        this.props.questions
            .then(res => {
                res.data.map((question, index) => {
                    if (this.state.filterTag !== "") {
                        question.Tags.forEach(t=>{
                        if (this.checkTags(t)) {
                            console.log("push");
                            temp.push(
                                <tr key={question.Id} data-item={question}
                                    onClick={(e) => {
                                        ColorRow(e)
                                        this.props.selectQuestions(question);
                                    }}
                                    className={(this.props.selectedQuestions.find(q => q.Id === question.Id)) ? "green" : ""}>
                                    <td>{index}</td>
                                    <td>{question.Id}</td>
                                    <td><QuestionBox question={question} /></td>
                                    <td> <button className="ui button" onClick={()=>this.togglePopup(question)}>Show</button></td>

                                </tr>)
                            this.setState({ dataTable: temp });
                        }                        })
                    }
                    else {
                        temp.push(<tr key={question.Id} data-item={question}
                            onClick={(e) => {
                                ColorRow(e)
                                this.props.selectQuestions(question);
                            }}
                            className={(this.props.selectedQuestions.find(q => q.Id === question.Id)) ? "green" : ""}>
                            <td>{index}</td>
                            <td>{question.Id}</td>
                            <td><QuestionBox question={question} /></td>
                            <td> <button className="ui button" onClick={()=>this.togglePopup(question)}>Show</button></td>
                        </tr>)
                        this.setState({ dataTable: temp });

                    }
                })
            })

    }

    updateFiletrState = () => {
        this.setState({ filterTag: window.document.getElementById("filterInput").value });
    }
    FilerQuestions = () => {
        this.setState({ dataTable: this.renderQuestions() });
    }
    render() {
        return (
            <div className="TestForm">
                <FormInputs renderField={this.renderQuestions} onSubmit={this.onSubmit}>
                {this.props.Test}
                </FormInputs>
                <div>
                    <input id="filterInput" value={this.state.filterTag} onChange={this.updateFiletrState} />
                    <button onClick={this.FilerQuestions}>Search</button>
                </div>
                <div className="field">
                    <label className="white">Chose questions</label>
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
                <div>{this.state.showPopup.show ?
                    <Popup
                        content = {this.state.showPopup.content}
                        text='Close Me'
                        closePopup={()=>this.togglePopup(null)}
                    />
                    : null
                }</div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        questions: state.questions,
        selectedQuestions: state.questionsSelect
    };
}

export default connect(mapStateToProps, { selectQuestions })(TestEdit);