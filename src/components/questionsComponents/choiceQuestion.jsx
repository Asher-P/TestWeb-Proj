import React from 'react';
import AnswerInput from './choiceAnswerInput';

function ChoiceQuestion(props) {
        return ( 
           <div>
               <AnswerInput Id="21" answerChanged={props.answerChanged} correctAnswerChanged={props.correctAnswerChanged}/>
               <br/>
               <AnswerInput Id="22" answerChanged={props.answerChanged} correctAnswerChanged={props.correctAnswerChanged}/>
               <br/>
               <AnswerInput Id="23" answerChanged={props.answerChanged} correctAnswerChanged={props.correctAnswerChanged}/>
               <br/>
               <AnswerInput Id="24" answerChanged={props.answerChanged} correctAnswerChanged={props.correctAnswerChanged}/>
               <br/>
               <div>
                  <button className="btn btn-primary btn-sm">Add Question</button>
               </div>
            </div>
        );
    }

export default ChoiceQuestion;