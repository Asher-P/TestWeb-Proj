import React, { Component } from "react";
import { Link } from "react-router-dom";
import Navigation from "../Navigation/navigation";

function Questions(props) {
  if (props.location.organizationProps === undefined)
    window.location.replace("/");
  const organization = props.location.organizationProps.organization;
  return (
    <div className="container questions">
      <Navigation
        organization={props.location.organizationProps.organization}
      />
      <div>
        <Link
          to={{
            pathname: `/questionsform`,
            organizationProps: {
              organization: organization,
            },
          }}>
          Add a question
        </Link>
      </div>
      <div>
        <Link
          to={{
            pathname: `/allquestions`,
            organizationProps: {
              organization: organization,
            },
          }}>
          Show all Questions
        </Link>
      </div>
    </div>
  );
}

export default Questions;
