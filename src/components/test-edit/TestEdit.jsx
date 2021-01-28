import React from 'react';
import '../test-form/TestForm.css';
import { connect } from 'react-redux';
import { selectQuestions, clearselectQuestions } from '../../actions'
import FormInputs from '../test-form/FormInputs';
import ReactDOM from 'react-dom';
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
        const urlParams = new URLSearchParams(window.location.search);
        const myParam = urlParams.get('id')
        
        TestsService.getTestById(myParam).then(res=>{
            this.setState({Test: res.data});
            console.log(this.state.Test);
        })
        setTimeout(function() {
            //your code to be executed after 1 second
          }, 2200);
        console.log("constructor");
        this.initQuestions();
        this.questionsRef = React.createRef();
        this.state = { dataTable: [], Test:{}, filterTag: "", questions: [],questionsSelected:[], showPopup:{show:false, content:null} };
        console.log("test",this.state.Test); 
        // Test.questions.map(qustionId=>{
        //      QuestionService.getQuestionById(qustionId).then(res=>{
        //          props.selectQuestions(res.data);
        //          this.setState({questionsSelected:[...this.state.questionsSelected,res.data]});
        //      });
        //  })

    }

    componentWillMount(){
        console.log("componentWillMount",this.state.Test);
    }

    initQuestions = () => {
        this.props.questions.then(res => {
            this.setState({ questions: res.data });
            console.log(this.state);
        })
    }

    togglePopup=(question)=> {
        this.setState({
            showPopup:{show: !this.state.showPopup.show, content:question}
        });
    }


    componentDidMount() {
        this.setState({ dataTable: this.renderQuestions() });
        console.log("DidMount state",this.state.Test);
        ReactDOM.render(
            this.state.dataTable,
            document.getElementById('tableHolder')
            );
    }
    componentDidUpdate(){
        console.log("Udate state",this.state);
    }

    onSubmit = (test) => {
        test = { ...test, questions: this.props.selectedQuestions.map(q => q.Id) };
       console.log("test", test);
        alert("Test successfully created");
        //TestsSerevice.addTest(test);
        //window.location.reload();
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
        console.log("Render",this.state)
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
                                    ref={this.questionsRef}
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
                            ref={this.questionsRef}
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
                        <tbody id="tableHolder">
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