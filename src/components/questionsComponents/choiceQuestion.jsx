import React from 'react';
import AnswerInput from './choiceAnswerInput';

function ChoiceQuestion(props) {
        return ( 
           <div>
               <AnswerInput Id="9" answerChanged={props.answerChanged} 
               correctAnswerChanged={props.correctAnswerChanged}/>
               <br/>
               <AnswerInput Id="10" answerChanged={props.answerChanged} 
               correctAnswerChanged={props.correctAnswerChanged}/>
               <br/>
               <AnswerInput Id="11" answerChanged={props.answerChanged} 
               correctAnswerChanged={props.correctAnswerChanged}/>
               <br/>
               <AnswerInput Id="12" answerChanged={props.answerChanged} 
               correctAnswerChanged={props.correctAnswerChanged}/>
            </div>
        );
    }

export default ChoiceQuestion;