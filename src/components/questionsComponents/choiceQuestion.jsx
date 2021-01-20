import React from 'react';

function ChoiceQuestion(props) {
        return ( 
           <div>
               <div className="inputAnswer">
                   <label htmlFor="0">First Answer:</label>
                   <input id="0" onChange={props.answerChanged}/>
                   <div>
                    <label>
                   <input type="radio" name="correctAnswers" onChange={props.correctAnswerChanged}/>
                   Correct Answer
                   </label>
                   </div>
               </div>
               <br/>
               <div className="inputAnswer">
                   <label htmlFor="1">Second Answer:</label>
                   <input id="1" onChange={props.answerChanged}/>
                   <div>
                    <label>
                   <input type="radio" name="correctAnswers" onChange={props.correctAnswerChanged}/>
                   Correct Answer 
                   </label>
                   </div>
               </div>
               <br/>
               <div className="inputAnswer">
                  <label htmlFor="2">Third Answer:</label>
                  <input id="2" onChange={props.answerChanged}/>
                  <div>
                   <input type="radio" name="correctAnswers" onChange={props.correctAnswerChanged}/>
                   Correct Answer 
                   </div>
               </div>
               <br/>
               <div>
                  <label htmlFor="3">Fourth Answer:</label>
                  <input id="3" onChange={props.answerChanged}/>
                  <div>
                      <label>
                   <input type="radio" id="3" name="correctAnswers" onChange={props.correctAnswerChanged}/>
                   Correct Answer 
                   </label>
                   </div>
               </div>
               <br/>
               <div>
                  <button className="btn btn-primary btn-sm">Add Question</button>
               </div>
            </div>
        );
    }

export default ChoiceQuestion;