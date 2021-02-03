import React from "react";

function QuestionTypes(props) {
  return (
    <div>
      <div>
        <select onChange={props.onChange}>
          <option value="Choice">Choice Question</option>
          <option id="MultiChoiceSelect" value="MultipleChoice">
            Multiple Choice Question
          </option>
        </select>
      </div>
    </div>
  );
}

export default QuestionTypes;
