import React from "react";

function MultiAnswerInput(props) {
  return (
    <div class="field">
      <label htmlFor={props.Id}>Answer:</label>
      <input id={props.Id} onChange={props.answerChanged} name="allAnswers" />
      <div class="ui checkbox">
        <input
          type="checkbox"
          id={props.Id - 1}
          name="correctAnswers"
          onChange={props.correctAnswerChanged}
        />
        <label htmlFor={props.Id - 1}>Correct Answer</label>
      </div>
    </div>
  );
}
export default MultiAnswerInput;
