import React from 'react';

function ChoiceAnswerInput(props) {
    return ( 
        <div>
            <label htmlFor={props.Id}>Answer:</label>
            <input id={props.Id} onChange={props.answerChanged}/>
            <div>
                <label>
                    <input type="radio" id={props.Id - 1} name="correctAnswers" onChange={props.correctAnswerChanged}/>
                    Correct Answer 
                </label>
            </div>
        </div>
    );
}
export default ChoiceAnswerInput;