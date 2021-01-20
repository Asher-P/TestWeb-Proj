import { Component } from "react";
import QuestionTypes from "./questionTypes";
import MultipleChoiceQuestion from "./multipleChoiceQuestion"
import ChoiceQuestion from "./choiceQuestion"

// jsx class component
class QuestionsForm extends Component {
  constructor(props){
    super(props);
    this.state = {title: "", errors: {}, questionBody: "", answers: []}
  }

  typeChanged = (e) =>{
    let multiple = document.getElementById("multipleChoiceQ");
    let choice = document.getElementById("choiceQ");
    if(e.currentTarget.value === "Choice"){
      multiple.hidden = true;
      choice.hidden = false;
    }
    else{
      multiple.hidden = false;
      choice.hidden = true;
    }
  }

  titleChanged = (e) => {
    this.setState({ title: e.currentTarget.value, errors: {} });
  };

  bodyChanged = (e) => {
    this.setState({questionBody: e.currentTarget.value, errors: {}})
  }

  validateQuestion = () => {
    const errors = {};
    if (this.state.title.trim() === "") errors.title = "Title is required.";
    if (this.state.questionBody.trim() === "") errors.content = "Content is required.";
    return Object.keys(errors).length === 0 ? null : errors;
  };

  submitQuestion = (e) => {
    e.preventDefault();
    const errors = this.validateQuestion();
    this.setState({ errors: errors || {} });
    if (errors){ return; }
    const questionToAdd = { Title: this.state.title, QuestionBody: this.state.questionBody, Answers: this.state.answers };
    this.props.onAddQuestion(questionToAdd);
    this.setState({ title: "", questionBody: "", answers: {}});
  };

  checkAnswers = (allAnswers) =>{
    let submitButton = document.getElementById("submitButton");
    submitButton.hidden = false;
    console.log(submitButton);
    console.log("allAnswers are");
    console.log(allAnswers);
    console.log("Current answers are ");
    console.log(this.state.answers);
    
    // submitButton.hidden = false;
  }

  render() {
    const { title, errors, questionBody } = this.state;
    return (
      <div>
          <QuestionTypes onChange = {this.typeChanged}/>
          <form  onSubmit ={this.submitQuestion}>
          <div className="form-group space">
            <label htmlFor="title">Title: </label>
            <input
              value={title}
              onChange={this.titleChanged}
              id="title"
              type="text"
              className="input form-control"
            />
            {errors.title && (
              <div className="alert alert-danger">{errors.title}</div>
            )}
          </div>
          <div className="form-group space">
          <label htmlFor="Content">Content: </label>
            <textarea value={questionBody} 
            onChange={this.bodyChanged}
            id="Content"
            type="text"/>
            {errors.content && (
              <div className="alert alert-danger">{errors.content}</div>
            )}
          </div>
          <div hidden={true} id="submitButton">
            <button className="btn btn-primary btn-sm">Add question</button>
          </div>
          <div hidden={true} id="choiceQ">
              <ChoiceQuestion checkAnswers = {this.checkAnswers}/>
          </div>
          <div hidden={true} id="multipleChoiceQ">
              <MultipleChoiceQuestion/>
          </div>      
          </form>
      </div>
    );
  }
}

export default QuestionsForm;