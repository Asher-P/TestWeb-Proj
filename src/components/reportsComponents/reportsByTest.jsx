import React, { Component } from "react";

class ReportsByTest extends Component {
  organization = JSON.parse(sessionStorage.organization);
  constructor(props) {
    super(props);
    this.state = { currentExams: [] };
  }

  loadExams = () => {
    let exams = [];
    let tests = this.props.tests;
    this.props.exams.forEach((exam) => {
      for (let index = 0; index < tests.length; index++) {
        if (exam.test.Id === tests[index].Id) {
          console.log("ok");
          exams.push(exam);
        }
      }
    });
    console.log("exams", exams);
    this.setState({ currentExams: exams });
  };

  componentDidMount() {
    if (this.props.exams !== undefined) this.loadExams();
    else {
      console.log(this.props.exams);
    }
  }

  renderList() {
    return this.props.tests.map((t, index) => {
      return (
        <tr key={index}>
          <td>{t.Title}</td>
          <td>{t.Field.Name}</td>
          <td>{t.questions.length}</td>
        </tr>
      );
    });
  }

  render() {
    return (
      <div>
        <table className="ui table">
          <thead>
            <tr>
              <td>Title</td>
              <td>Field</td>
              <td>Questions Sum</td>
            </tr>
          </thead>
          <tbody>{this.renderList()}</tbody>
        </table>
      </div>
    );
  }
}

export default ReportsByTest;
