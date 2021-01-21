import React from 'react';

function MultiAnswerInput(props) {
    return ( 
        <div>
            <label htmlFor={props.Id}>Answer:</label>
            <input id={props.Id} onChange={props.answerChanged}/>
            <div>
                <label>
                    <input type="checkbox" id={props.Id - 1} name="correctAnswers" onChange={props.correctAnswerChanged}/>
                    Correct Answer 
                </label>
            </div>
        </div>
    );
}
export default MultiAnswerInput;