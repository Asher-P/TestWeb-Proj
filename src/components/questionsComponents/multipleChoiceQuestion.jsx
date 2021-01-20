import React from 'react';
import AnswerInput from './multiAnswerInput';

function MultipleChoiceQuestion(props) {
    return ( 
        <div>
               <AnswerInput Id="1" answerChanged={props.answerChanged} correctAnswerChanged={props.correctAnswerChanged} />
               <br/>
               <AnswerInput Id="2" answerChanged={props.answerChanged} correctAnswerChanged={props.correctAnswerChanged} />
               <br/>
               <AnswerInput Id="3" answerChanged={props.answerChanged} correctAnswerChanged={props.correctAnswerChanged} />
               <br/>
               <AnswerInput Id="4" answerChanged={props.answerChanged} correctAnswerChanged={props.correctAnswerChanged} />
               <br/>
               <AnswerInput Id="5" answerChanged={props.answerChanged} correctAnswerChanged={props.correctAnswerChanged}/>
               <br/>
               <AnswerInput Id="6" answerChanged={props.answerChanged} correctAnswerChanged={props.correctAnswerChanged}/>
               <br/>
               <AnswerInput Id="7" answerChanged={props.answerChanged} correctAnswerChanged={props.correctAnswerChanged}/>
               <br/>
               <AnswerInput Id="8" answerChanged={props.answerChanged} correctAnswerChanged={props.correctAnswerChanged}/>
               <br/>
               <div>
                  <button className="btn btn-primary btn-sm">Add Question</button>
               </div>
            </div>
     );
}

 
export default MultipleChoiceQuestion;