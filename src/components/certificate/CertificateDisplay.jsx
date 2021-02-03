import React from "react";
import { ThemeConsumer } from "react-bootstrap/esm/ThemeProvider";
import "./CertificateDisplay.css";
import ExamService from "../../services/examsService";

class CertificateDisplay extends React.Component {
  formProps = this.props.location.formProps;
  scoreOfQuestion = 100 / this.formProps.test.questions.length;
  d = new Date();
  constructor(props) {
    super(props);
    console.log("loc", this.formProps);
    this.state = { grade: 0 };
  }
  calcScore = (answer, correct) => {
    if (answer.length != correct.length) {
      return 0;
    } else {
      for (let index = 0; index < answer.length; index++) {
        const element = answer[index];
        if (!correct.includes(element)) {
          return 0;
        }
      }
    }
    return this.scoreOfQuestion;
  };
  componentDidMount() {
    let add = 0;
    this.formProps.answers.forEach((a) => {
      if (!Array.isArray(a.answer)) {
        a.answer = [a.answer];
      }
      let scoreForAnswer = this.calcScore(a.answer, a.correctAnswer);
      console.log("score", scoreForAnswer);
      add = add + scoreForAnswer;
      console.log("grade", this.state.grade);
    });
    this.setState({ grade: add });
    let exam = { ...this.formProps, Grade: add };
    ExamService.addExam(exam);
  }

  render() {
    return (
      <div className="CertificateDisplay">
        <div className="div1">
          <div className="div2">
            <span className="span1">Certificate of Completion</span>
            <br />
            <br />
            <span className="span2">
              <i>This is to certify that</i>
            </span>
            <br />
            <br />
            <span className="span3">
              <b>
                {this.formProps.student?.studentName},ID:
                {this.formProps.student?.studentId}
              </b>
            </span>
            <br />
            <br />
            <span className="span2">
              <i>has completed the Test</i>
            </span>{" "}
            <br />
            <br />
            <span className="span3">{this.formProps.test?.Title}</span> <br />
            <br />
            <span className="span5">
              with score of <b>{this.state.grade}</b>
            </span>{" "}
            <br />
            <br />
            <br />
            <br />
            <span className="span2">
              <i>dated</i>
            </span>
            <br />
            <span className="span3">
              {" "}
              {this.d.getDay()}/{this.d.getMonth()}/{this.d.getYear()}{" "}
            </span>
          </div>
        </div>
      </div>
    );
  }
}

export default CertificateDisplay;
