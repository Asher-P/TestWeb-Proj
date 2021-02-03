import { reduxForm, Field } from "redux-form";
import React, { useState } from "react";

class AnsQuestionForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { answerValue: "", flagSingle: false };
  }

  createInput = (formProps) => {
    console.log(formProps);
    return (
      <input
        onChange={formProps.input.onChange}
        name="group1"
        type={formProps.type}
        value={formProps.children}></input>
    );
  };
  onSubmit = (e) => {
    e.preventDefault();
    console.log("ans", e);
    this.props.onSubmit(this.state.answerValue);
    this.setState({
      flagSingle:
        this.props.children?.Answers?.reduce(function (n, val) {
          return n + (val.isCorrect === true);
        }, 0) == 1,
    });
    console.log(this.state.flagSingle);
    this.setState({ answerValue: "" });
    var inputs, index;
    inputs = document.getElementsByTagName("input");
    for (index = 0; index < inputs.length; ++index) {
      inputs[index].checked = false;
    }
  };
  answerChange = (e) => {
    if (this.props.children?.QuestionType === "Choice")
      this.setState({ answerValue: e.target.value });
    else {
      if (this.state.answerValue === "")
        this.setState({ answerValue: [e.target.value] });
      else
        this.setState({
          answerValue: [e.target.value, ...this.state.answerValue],
        });
    }
  };
  renderSingleAnswer = () => {
    return (
      <form className="ui form" onSubmit={this.onSubmit}>
        {this.props.children?.Answers?.map((a, index) => {
          return (
            <div key={index} className="Field radio checkbox">
              <div className="ui card">
                <input
                  onChange={this.answerChange}
                  name="group1"
                  type="radio"
                  value={a.Content}></input>
                {/*<Field name="answer" component={createInput} type="radio">{a.Content}</Field>*/}
                <label>{a.Content}</label>
              </div>
            </div>
          );
        })}

        <div className="nextbtn">
          <button type="submit">Next</button>
        </div>
      </form>
    );
  };
  renderMultiAnswer = () => {
    return (
      <form className="ui form" onSubmit={this.onSubmit}>
        {this.props.children?.Answers?.map((a, index) => {
          return (
            <div key={index} className="Field radio checkbox">
              <div className="ui card">
                <input
                  onChange={this.answerChange}
                  name="group1"
                  type="checkbox"
                  value={a.Content}></input>
                {/*<Field name="answer" component={createInput} type="radio">{a.Content}</Field>*/}
                <label>{a.Content}</label>
              </div>
            </div>
          );
        })}

        <div className="nextbtn">
          {this.props.children ? <button type="submit">Next</button> : null}
        </div>
      </form>
    );
  };
  render() {
    return (
      <div className="AnsQuestionForm">
        {this.props.children?.QuestionType === "Choice"
          ? this.renderSingleAnswer()
          : this.renderMultiAnswer()}
      </div>
    );
  }
}

export default reduxForm({ form: "QuestionAnswer" })(AnsQuestionForm);
