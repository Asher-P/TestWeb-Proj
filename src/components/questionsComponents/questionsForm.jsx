import { Component } from "react";
import QuestionTypes from "./questionTypes";
import MultipleChoiceQuestion from "./multipleChoiceQuestion"
import ChoiceQuestion from "./choiceQuestion"

// jsx class component
class QuestionsForm extends Component {
  constructor(props){
    super(props);
    this.state = {title: "", errors: {}, questionBody: "", answers: [ {Content: "", isCorrect: false} ]}
  }

  answerChanged = (e) =>{
    let allAnswers = [...this.state.answers];
    let answerId = e.currentTarget.id; 
    if(allAnswers[answerId - 1] === undefined){ //id is higher than the index by one
      allAnswers[answerId - 1] = {Content: "", isCorrect: false}
    }
    allAnswers[answerId - 1].Content = e.currentTarget.value;
    this.setState({answers: allAnswers})
    // console.log("content changed");
    // console.log(this.state.answers);
 }

 correctAnswerChanged = (e) =>{
   let answerIndex = e.currentTarget.id;
   let allAnswers = [...this.state.answers];
   if(allAnswers[answerIndex] === undefined){
     allAnswers[answerIndex] = {Content: "", isCorrect: true}
     this.setState({answers: allAnswers});
    //  console.log(this.state.answers);
   }
   else{
     let content = allAnswers[answerIndex].Content;
     allAnswers[answerIndex] = {Content: content, isCorrect: true}
     this.setState({answers: allAnswers});
    //  console.log(this.state.answers);
   }
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

  showCurrentQuestion = (e) =>{
    const question = { Title: this.state.title, QuestionBody: this.state.questionBody, Answers: this.state.answers };
    this.props.showQuestion(question);
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
            <input value={questionBody} 
            onChange={this.bodyChanged}
            id="Content"
            type="text"/>
            {errors.content && (
              <div className="alert alert-danger">{errors.content}</div>
            )}
          </div>
          <div hidden={false} id="choiceQ">
              <ChoiceQuestion  answerChanged = {this.answerChanged} correctAnswerChanged={this.correctAnswerChanged}/>
          </div>
          <div hidden={true} id="multipleChoiceQ">
              <MultipleChoiceQuestion answerChanged = {this.answerChanged} correctAnswerChanged={this.correctAnswerChanged}/>
          </div>      
          </form>
          <br/>
          <div>
            <label>
            <input type="button" onClick={this.showCurrentQuestion} value="Show Question"/>
            </label>
            
          </div>
      </div>
    );
  }
}

export default QuestionsForm;