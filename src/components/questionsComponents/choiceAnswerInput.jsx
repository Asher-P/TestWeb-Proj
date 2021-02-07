import React from "react";

function ChoiceAnswerInput(props) {
  return (
    <div class="field">
      <label htmlFor={props.Id}>Answer:</label>
      <input id={props.Id} onChange={props.answerChanged} name="allAnswers" />
      <div>
        <input
          type="radio"
          id={props.Id - 1}
          name="correctAnswers"
          onChange={props.correctAnswerChanged}
        />
        <label class="inputLabel">Correct Answer</label>
      </div>
    </div>
  );
}
export default ChoiceAnswerInput;
