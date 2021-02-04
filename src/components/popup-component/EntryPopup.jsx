import "./EntryPopup.css";
import React, { Component } from "react";
import { Link } from "react-router-dom";

class EntryPopup extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="popup">
        <div className="popup_inner">
          <text>
            Are you sure you want to continue as {this.props.organization.Name}?
          </text>
          <div>
            <Link
              to={{
                pathname: `/allquestions`,
                organizationProps: { organization: this.props.organization },
              }}>
              Yes
            </Link>
            <button onClick={this.props.closePopup}>No</button>
          </div>
        </div>
      </div>
    );
  }
}

export default EntryPopup;
