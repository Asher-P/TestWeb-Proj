import React, { Component } from "react";
import { Button } from "react-bootstrap";
import history from "../../History/history";

function Questions() {
  return (
    <div className="container questions">
      <div>
        <Button
          variant="btn btn-success"
          onClick={() => history.push("/questionsform")}>
          Add a question
        </Button>
      </div>
      <div>
        <Button
          variant="btn btn-success"
          onClick={() => history.push("/allquestions")}>
          Show all Questions
        </Button>
      </div>
    </div>
  );
}
export default Questions;
