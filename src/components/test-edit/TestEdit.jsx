import React from 'react';
import '../test-form/TestForm.css';
import { connect } from 'react-redux';
import { selectQuestions, fetchTest, fetchQuestion, fetchQuestions } from '../../actions'
import FormInputs from '../test-form/FormInputs';
import ReactDOM from 'react-dom';
import QuestionBox from '../question-box-component/QuestionBox';
import Popup from '../popup-component/Popup'
import TestsService from '../../services/testsService';
import QuestionService from '../../services/questionsService';

function ColorRow(e) {
    let TR = e.target;
    while (TR.tagName != "TR") {
        TR = TR.parentNode;
    }
    console.log("TR", TR);
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
    testId = this.props.match.params.testId;
    test = null;
    constructor(props) {
        super(props);
        console.log("props", props);
        console.log("testId", this.testId)


        // TestsService.getTestById(myParam).then(res=>{
        //     this.setState({Test: res.data});
        //     console.log(this.state.Test);
        //})

        this.questionsRef = React.createRef();
        this.state = { dataTable: [], Test: {}, filterTag: "", questions: [], questionsSelected: [], showPopup: { show: false, content: null } };
        //console.log("test",this.state.Test); 


    }


    initQuestions = () => {
        this.props.questions.then(res => {
            this.setState({ questions: res.data });
            // console.log(this.state);
        })
    }

    togglePopup = (question) => {
        this.setState({
            showPopup: { show: !this.state.showPopup.show, content: question }
        });
    }


    componentDidMount() {
        this.props.fetchQuestions();
        let res = this.props.fetchTest(this.testId);
        console.log("res", res);
        this.props.test.questions?.forEach(q =>{
            this.props.selectQuestions(this.props.fetchQuestion(q));
        })
        this.props.test.questions?.map(q => {
            let TRList = window.document.getElementsByName(q.toString());
            {/*console.log("TR",TRList)
        console.log(TRList[0]);*/}
        if(TRList)
            TRList[0].classList.add("green");
        }

        )

        //console.log("DidMount state",this.state.Test);

    }


    onSubmit = (test) => {
        test = { ...test, questions: this.props.selectedQuestions.map(q => q.Id) };
        console.log("test", test);
        alert("Test successfully created");
        TestsService.editTest(test);
        //window.location.reload();
    }
    checkTags = (tag) => {
        const filterTags = this.state.filterTag.split(",");
        console.log("FilterTag:", filterTags);
        console.log("tag:", tag);
        console.log("flag", filterTags.includes(tag));
        if (filterTags.includes(tag))
            return true;
        return false


    }
    renderQuestions() {
        if (this.state.filterTag !== "") {
            let filterTags = this.state.filterTag.split(',');
            return this.props.questions.filter(q => filterTags.some(t => q.Tags.includes(t)))
                .map((question, index) => {
                    return (<tr key={question.Id} data-item={question}
                        onClick={(e) => {
                            ColorRow(e)
                            this.props.selectQuestions(question);
                        }}

                        className={(this.props.selectedQuestions.find(q => q.Id === question.Id)) ? "green" : ""}>
                        <td>{index}</td>
                        <td>{question.Id}</td>
                        <td><QuestionBox question={question} /></td>
                        <td> <button className="ui button" onClick={() => this.togglePopup(question)}>Show</button></td>
                    </tr>)
                }
                )
        }
        else {
            return this.props.questions.map((question, index) => {
                return (<tr name={`${question.Id}`} key={question.Id} data-item={question}
                    onClick={(e) => {
                        ColorRow(e)
                        this.props.selectQuestions(question);
                    }}
                    ref={this.questionsRef}
                    className={(this.props.selectedQuestions.find(q => q.Id === question.Id)) ? "green" : ""}>
                    <td>{index}</td>
                    <td>{question.Id}</td>
                    <td><QuestionBox question={question} /></td>
                    <td> <button className="ui button" onClick={() => this.togglePopup(question)}>Show</button></td>
                </tr>)
            }
            )
        }
    }

    componentDidUpdate() {
        this.test = this.props.test;

        console.log("test", this.props.test);
       
    }
    updateFiletrState = () => {
        this.setState({ filterTag: window.document.getElementById("filterInput").value });
    }
    FilerQuestions = () => {
        this.setState({ dataTable: this.renderQuestions() });
    }

    render() {
        //console.log("Render", this.state)
        //console.log("test from render", this.props.test);
        //console.log("test data from render", this.props.test?.data);
        return (
            <div className="TestForm">
                <FormInputs renderField={this.renderQuestions} onSubmit={this.onSubmit}>
                    {this.props.test}
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
                        <tbody id="tableHolder">
                            {this.renderQuestions()}
                        </tbody>
                    </table>
                </div>
                <div>{this.state.showPopup.show ?
                    <Popup
                        content={this.state.showPopup.content}
                        text='Close Me'
                        closePopup={() => this.togglePopup(null)}
                    />
                    : null
                }</div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        test: state.test,
        questions: state.questions,
        selectedQuestions: state.questionsSelect
    };
}

export default connect(mapStateToProps, { selectQuestions, fetchQuestion, fetchTest, fetchQuestions })(TestEdit);