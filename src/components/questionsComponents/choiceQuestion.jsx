import React from 'react';
import AnswerInput from './choiceAnswerInput';

function ChoiceQuestion(props) {
        return ( 
           <div>
               <AnswerInput Id="1" answerChanged={props.answerChanged} correctAnswerChanged={props.correctAnswerChanged}/>
               <br/>
               <AnswerInput Id="2" answerChanged={props.answerChanged} correctAnswerChanged={props.correctAnswerChanged}/>
               <br/>
               <AnswerInput Id="3" answerChanged={props.answerChanged} correctAnswerChanged={props.correctAnswerChanged}/>
               <br/>
               <AnswerInput Id="4" answerChanged={props.answerChanged} correctAnswerChanged={props.correctAnswerChanged}/>
               <br/>
               <div>
                  <button className="btn btn-primary btn-sm">Add Question</button>
               </div>
            </div>
        );
    }

export default ChoiceQuestion;