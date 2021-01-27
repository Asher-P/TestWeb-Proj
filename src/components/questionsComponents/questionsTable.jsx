import React,{ Component } from "react";
import QuestionBox from '../question-box-component/QuestionBox';
import Popup from '../popup-component/Popup';
import { connect } from 'react-redux';
import { selectQuestions } from '../../actions';


class QuestionsTable extends Component {
    constructor(props) {
        super(props);
        this.state = { questions: [], dataTable: [], filterTag: "", showPopup:{show:false, content:null} }
        this.initQuestions();
    }

    initQuestions = () => {
      this.props.questions.then(res => {
          this.setState({ questions: res.data });
      })
  }

    componentDidMount() {
      this.setState({ dataTable: this.renderQuestions() });
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
                        <tr key={question.Id} data-item={question}>
                            <td>{index}</td>
                            <td>{question.Id}</td>
                            <td><QuestionBox question={question} /></td>
                            <td> <button className="ui button" onClick={()=>this.togglePopup(question)}>Show</button></td>
                        </tr>)
                    this.setState({ dataTable: temp });
                }                        
              })
            }
            else {
                temp.push(<tr key={question.Id} data-item={question}>
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

      checkTags=(tag)=>{
        const filterTags = this.state.filterTag.split(",");
        console.log("FilterTag:",filterTags);
        console.log("tag:",tag);
        console.log("flag", filterTags.includes(tag));
        if(filterTags.includes(tag))
            return true;
        return false
      }

togglePopup=(question)=> {
  this.setState({
      showPopup:{show: !this.state.showPopup.show, content:question}
  });
}
    render() { 
        return ( 
            <div>
              <div>
                    <input id="filterInput" value={this.state.filterTag} onChange={this.updateFiletrState} />
                    <button onClick={this.FilerQuestions}>Search</button>
                </div>
                <div className="field">
                    <label className="white">All Questions</label>
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
         );
    }
}
 
const mapStateToProps = (state) => {

  return {
      questions: state.questions,
      selectedQuestions: state.questionsSelect
  };
}

export default connect(mapStateToProps, { selectQuestions })(QuestionsTable);
  