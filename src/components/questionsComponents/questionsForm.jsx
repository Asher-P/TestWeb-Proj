import { Component } from "react";
import QuestionTypes from "./questionTypes";
import MultipleChoiceQuestion from "./multipleChoiceQuestion"
import ChoiceQuestion from "./choiceQuestion"

// jsx class component
class QuestionsForm extends Component {
  constructor(props){
    super(props);
    this.state = {title: "", errors: {}, questionBody: "", answers: [ {Content: "", isCorrect: false} ], 
    extraInfo: "", tags: "", inputsNum: 4}
  }

  cleanAllInputs = (numOfInputs) =>{
    for (let index = 1; index <= numOfInputs; index++) {
      let input = document.getElementById(index)
      input.value = "";
    }
  }

  //////////start of onChange events\\\\\\\\\\
  answerChanged = (e) =>{
    let allAnswers = [...this.state.answers];
    let answerId = e.currentTarget.id; 
    if(allAnswers[answerId - 1] === undefined){ //id is higher than the index by one
      allAnswers[answerId - 1] = {Content: "", isCorrect: false}
    }
    allAnswers[answerId - 1].Content = e.currentTarget.value;
    this.setState({answers: allAnswers})
 }

 correctChoiceAnswerChanged = (e) =>{
   let answerIndex = e.currentTarget.id;
   let allAnswers = [...this.state.answers];   
   for (let index = 0; index < allAnswers.length; index++) {
    if(allAnswers[index] === undefined){
      allAnswers[index] = {Content: "", isCorrect: false}
    }
    else{
      let content = allAnswers[index].Content;
      allAnswers[index] = {Content: content, isCorrect: false}
    }
  }  
   if(allAnswers[answerIndex] === undefined){
     allAnswers[answerIndex] = {Content: "", isCorrect: true}
   }
   else{
     let content = allAnswers[answerIndex].Content;
     allAnswers[answerIndex] = {Content: content, isCorrect: true}    
   }
   this.setState({answers: allAnswers});
   console.log(this.state.answers);
 }

 correctMultiAnswerChanged = (e) =>{
  let answerIndex = e.currentTarget.id;
  console.log(this.state.answers);
  let allAnswers = [...this.state.answers];
  if(allAnswers[answerIndex] === undefined){
    allAnswers[answerIndex] = {Content: "", isCorrect: true}
    this.setState({answers: allAnswers});
  }
  else{
    let answer = allAnswers[answerIndex];
    if(!answer.isCorrect){
      allAnswers[answerIndex] = {Content: answer.Content, isCorrect: true}
    }
    else{
      allAnswers[answerIndex] = {Content: answer.Content, isCorrect: false}
    }   
    this.setState({answers: allAnswers});
  }
 }

  typeChanged = (e) =>{
    let multiple = document.getElementById("multipleChoiceQ");
    let choice = document.getElementById("choiceQ");
    this.setState( { answers: [ { Content: "", isCorrect: false } ]});
    if(e.currentTarget.value === "Choice"){
      multiple.hidden = true;
      choice.hidden = false;
    }
    else{
      multiple.hidden = false;
      choice.hidden = true;
    }
    this.cleanAllInputs(8);
  }

  titleChanged = (e) => {
    this.setState({ title: e.currentTarget.value, errors: {} });
  };

  bodyChanged = (e) => {
    this.setState({questionBody: e.currentTarget.value, errors: {}});
  }

  extraInfoChanged = (e) =>{
    this.setState({extraInfo: e.currentTarget.value, errors: {}});
  }

  tagsChanged = (e) =>{
    this.setState({tags: e.currentTarget.value, errors: {}});
  }
  //////////end of onChange events\\\\\\\\\\

  //////////Validation\\\\\\\\\\
  validateQuestion = () => {
    const errors = {};
    if (this.state.title.trim() === "") errors.title = "Title is required.";
    if (this.state.questionBody.trim() === "") errors.content = "Content is required.";
    if(!this.validateAllAnswers()) errors.answers = "Please fill all of the answers and have at least 1 correct answer depends on the question type.";
    return Object.keys(errors).length === 0 ? null : errors;
  };

  validateAllAnswers = () =>{
    let allAnswers = this.state.answers;
    let count = 0;
    for (let index = 0; index < this.state.inputsNum; index++) {
       if(!this.validateAnswer(allAnswers[index])) return false;
       if(!allAnswers[index].isCorrect) count++;
    }
    if(count === 0) return false;
  }

  validateAnswer = (answer) =>{
    if(answer === undefined) return false; 
      else{
        if(answer.Content.trim() === "") return false;
      }      
    }
  //////////End of validation\\\\\\\\\\

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
    const question = { Title: this.state.title, QuestionBody: this.state.questionBody, Answers: this.state.answers, 
      ExtraInfo: this.state.extraInfo, Tags: this.state.tags };
    this.props.showQuestion(question);
  }

  updateInputsNum = (numOfInputs) =>{
    if(this.state.inputsNum !== numOfInputs) this.setState({inputsNum: numOfInputs});
  }

  render() {
    const { title, errors, questionBody, extraInfo, tags } = this.state;
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
            <input value={questionBody} onChange={this.bodyChanged} id="Content" type="text"/>
            {errors.content && (
              <div className="alert alert-danger">{errors.content}</div>
            )}
          </div>
          <div>
            <label htmlFor="ExtraInfo">Extra Info</label>
            <textarea id="ExtraInfo" value={extraInfo} onChange={this.extraInfoChanged}></textarea>
          </div>
          <div>
            <label htmlFor="Tags">Tags</label>
            <input id="Tags" type="text" value={tags} onChange={this.tagsChanged}/>
          </div>
          <div hidden={false} id="choiceQ">
              <ChoiceQuestion  answerChanged = {this.answerChanged} correctAnswerChanged={this.correctChoiceAnswerChanged}/>
              {errors.answers && (
              <div className="alert alert-danger">{errors.answers}</div>
            )}
          </div>
          <div hidden={true} id="multipleChoiceQ">
              <MultipleChoiceQuestion answerChanged = {this.answerChanged} correctAnswerChanged={this.correctMultiAnswerChanged} updateInputsNum = {this.updateInputsNum}/>
              {errors.answers && (
              <div className="alert alert-danger">{errors.answers}</div>
            )}
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