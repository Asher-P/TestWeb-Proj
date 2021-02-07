import React, { Component } from "react";
import ReactDOM from "react-dom";
import Navigation from "../Navigation/navigation";
import ReportsByStudent from "./reportsByStudent";
import ReportsByTest from "./reportsByTest";
import {fetchExams} from '../../actions';
import { connect } from 'react-redux';
class Reports extends Component {
  organization = JSON.parse(sessionStorage.organization);
  constructor(props) {
    super(props);
    this.state = {
      showReportsByTest: false,
    };
    console.log("props",props);
    this.props.fetchExams();
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
    console.log("reports by student props",this.props.exams)
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
const mapStateToProps=(state)=>{
  return{
    exams:state.exams,
  }
  }
export default connect(mapStateToProps,{fetchExams})(Reports);
