import React, { Component } from "react";
import { fetchTests } from "../../actions";
import { connect } from "react-redux";

class ReportsByTest extends Component {
  organization = JSON.parse(sessionStorage.organization);
  constructor(props) {
    super(props);
    this.state = {};
    this.props.fetchTests(this.organization.Id);
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
