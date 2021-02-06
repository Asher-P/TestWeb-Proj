import React from "react";
import { Navbar, Nav, Form, Button } from "react-bootstrap";
import { withRouter, Link } from "react-router-dom";

const Navigation = (props) => {
  return (
    <div>
      <Navbar bg="primary" variant="dark">
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Link
              class="header item"
              to={{
                pathname: `/home`,
                organizationProps: {
                  organization: props.organization,
                },
              }}>
              Home
            </Link>
            <Link
              class="item"
              to={{
                pathname: `/questions`,
                organizationProps: {
                  organization: props.organization,
                },
              }}>
              Questions
            </Link>
            <Link
              class="item"
              to={{
                pathname: `/tests`,
                organizationProps: {
                  organization: props.organization
                },
              }}>
              Tests
            </Link>
            <Link class="item" to="/">
              Log Out
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <div>
        <br />
      </div>
    </div>
  );
};

export default withRouter(Navigation);
