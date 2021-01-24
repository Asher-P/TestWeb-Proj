import React, { Component } from 'react';

class ChoiceQuestion extends Component {
    constructor(props){
        super(props);
        this.state = { title: "", errors: {}, questionBody: "", answers: [ {} ] };
    }

   answerChanged = (e) =>{
      let allAnswers = [...this.state.answers]
      let answerId = e.currentTarget.id;
      allAnswers[answerId] = {Content: "", isCorrect: false}
      allAnswers[answerId] = e.currentTarget.value;
      this.setState({answer: allAnswers})
   }
    render(){
        return ( 
           <div>
               <div>
                   <label htmlFor="1">First Answer:</label>
                   <input id="1" onChange={this.answerChanged}/>
               </div>
               <div>
                   <label htmlFor="2">Second Answer:</label>
                   <input id="2" onChange={this.answerChanged}/>
               </div>
               <div>
                  <label htmlFor="3">Third Answer:</label>
                  <input id="3" onChange={this.answerChanged}/>
               </div>
               <div>
                  <label htmlFor="4">Fourth Answer:</label>
                  <input id="4" onChange={this.answerChanged}/>
               </div>
               <div>
                  <button onClick = {this.checkAnswers} className="btn btn-primary btn-sm">Check Answers</button>
               </div>
            </div>
        );
    }
   
 }

export default ChoiceQuestion;