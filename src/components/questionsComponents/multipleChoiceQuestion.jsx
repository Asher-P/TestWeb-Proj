import { render } from "@testing-library/react";
import React, { Component } from "react";
import AnswerInput from "./multiAnswerInput";

function MultipleChoiceQuestion(props) {
  return (
    <div>
      <div>
        <AnswerInput
          Id="1"
          answerChanged={props.answerChanged}
          correctAnswerChanged={props.correctAnswerChanged}
        />
      </div>
      <br />
      <div>
        <AnswerInput
          Id="2"
          answerChanged={props.answerChanged}
          correctAnswerChanged={props.correctAnswerChanged}
        />
      </div>
      <br />
      <div>
        <AnswerInput
          Id="3"
          answerChanged={props.answerChanged}
          correctAnswerChanged={props.correctAnswerChanged}
        />
      </div>
      <br />
      <div>
        <AnswerInput
          Id="4"
          answerChanged={props.answerChanged}
          correctAnswerChanged={props.correctAnswerChanged}
        />
      </div>
      <br />
      <div Id="13" hidden={true}>
        <AnswerInput
          Id="5"
          answerChanged={props.answerChanged}
          correctAnswerChanged={props.correctAnswerChanged}
        />
      </div>
      <br />
      <div Id="14" hidden={true}>
        <AnswerInput
          Id="6"
          answerChanged={props.answerChanged}
          correctAnswerChanged={props.correctAnswerChanged}
        />
      </div>
      <br />
      <div Id="15" hidden={true}>
        <AnswerInput
          Id="7"
          answerChanged={props.answerChanged}
          correctAnswerChanged={props.correctAnswerChanged}
        />
      </div>
      <br />
      <div Id="16" hidden={true}>
        <AnswerInput
          Id="8"
          answerChanged={props.answerChanged}
          correctAnswerChanged={props.correctAnswerChanged}
        />
      </div>
      <input type="button" value="Add Answer" onClick={props.addAnswerInput} />
      <input
        type="button"
        value="Remove Answer"
        onClick={props.removeAnswerInput}
      />
    </div>
  );
}
export default MultipleChoiceQuestion;
