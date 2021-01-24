import { render } from '@testing-library/react';
import React, { Component } from 'react';
import AnswerInput from './multiAnswerInput';

class MultipleChoiceQuestion extends Component {

   constructor(props){
      super(props);
      this.state = { Index: 5 }
   }
   addAnswerInput = (e) =>{
      if(this.state.Index <= 8){
         let input = document.getElementById(this.state.Index);
         input.hidden = false;
         if(this.state.Index < 8){
            this.setState({ Index: this.state.Index + 1 });
         }
         else{
            alert("Reached the maximum limit of answers you can add");
         }
      }
   }
   removeAnswerInput = (e) =>{
      if(this.state.Index >= 5){
         let input = document.getElementById(this.state.Index);
         input.hidden = true;
         if(this.state.Index > 5){
            this.setState({ Index: this.state.Index - 1 });
         }
         else{
            alert("You can not remove any more answers");
         }
      }
   }
   render(){
      return ( 
         <div>
            <div Id="1">
               <AnswerInput Id="1" answerChanged={this.props.answerChanged} 
               correctAnswerChanged={this.props.correctAnswerChanged}/>
            </div>
            <br/>
            <div Id="2">
               <AnswerInput Id="2" answerChanged={this.props.answerChanged} 
               correctAnswerChanged={this.props.correctAnswerChanged}/>
            </div>
            <br/>
            <div Id="3">
               <AnswerInput Id="3" answerChanged={this.props.answerChanged} 
               correctAnswerChanged={this.props.correctAnswerChanged}/>
            </div>
            <br/>
            <div Id="4">
               <AnswerInput Id="4" answerChanged={this.props.answerChanged} 
               correctAnswerChanged={this.props.correctAnswerChanged}/>
            </div>
            <br/>
            <div Id="5" hidden = {true}>
               <AnswerInput Id="5" answerChanged={this.props.answerChanged} 
               correctAnswerChanged={this.props.correctAnswerChanged}/>
            </div>
            <br/>
            <div Id="6" hidden = {true}>
               <AnswerInput Id="6" answerChanged={this.props.answerChanged} 
               correctAnswerChanged={this.props.correctAnswerChanged}/>
            </div>
            <br/>
            <div Id="7" hidden = {true}>
               <AnswerInput Id="7" answerChanged={this.props.answerChanged} 
               correctAnswerChanged={this.props.correctAnswerChanged}/>
            </div>
            <br/>
            <div Id="8" hidden = {true}>
               <AnswerInput Id="8" answerChanged={this.props.answerChanged} 
               correctAnswerChanged={this.props.correctAnswerChanged}/>
            </div>
            <div>
               <button className="btn btn-primary btn-sm">Add Question</button>
            </div>
            <input type="button" value = "Add Answer" onClick ={this.addAnswerInput}/>
            <input type="button" value = "Remove Answer" onClick ={this.removeAnswerInput}/>
         </div>
     );
   }
}

export default MultipleChoiceQuestion;