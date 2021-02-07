import React, { Component } from "react";
import ReactDOM from "react-dom";
import Navigation from "../Navigation/navigation";
import ReportsByStudent from "./reportsByStudent";
import ReportsByTest from "./reportsByTest";

class Reports extends Component {
  organization = JSON.parse(sessionStorage.organization);
  constructor(props) {
    super(props);
    this.state = {
      showReportsByTest: false,
    };
  }

  showReportByTest = (e) => {
    this.setState({ showReportsByTest: true });
  };
  showReportByStudent = (e) => {
    this.setState({ showReportsByTest: false });
  };

  componentDidUpdate() {
    if (this.state.showReportsByTest) {
      ReactDOM.render(
        <ReportsByTest />,
        document.getElementById("reportsplaceholder")
      );
    } else
      ReactDOM.render(
        <ReportsByStudent />,
        document.getElementById("reportsplaceholder")
      );
  }

  render() {
    console.log("rendered", this.state.showReportsByTest);
    return (
      <div>
        <Navigation organization={this.organization} />
        <div className="ui list">
          <div className="ui item">
            <button
              className="ui primary button"
              onClick={this.showReportByTest}>
              Reports by test
            </button>
          </div>
          <div className="ui item">
            <button
              className="ui primary button"
              onClick={this.showReportByStudent}>
              Reports by student
            </button>
          </div>
        </div>
        <div id="reportsplaceholder"></div>
      </div>
    );
  }
}

export default Reports;
