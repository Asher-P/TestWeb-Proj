import React from "react";
import { Navbar, Nav, Form, Button } from "react-bootstrap";
import { withRouter, Link } from "react-router-dom";

const Navigation = (props) => {
  console.log(props);
  return (
    <Navbar bg="primary" variant="dark">
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Link
            to={{
              pathname: `/home`,
              organizationProps: {
                organization: props.organization,
              },
            }}>
            Home
          </Link>
          <Link
            to={{
              pathname: `/questions`,
              organizationProps: {
                organization: props.organization,
              },
            }}>
            Questions
          </Link>
          <Link
            to={{
              pathname: `/tests`,
              organizationProps: {
                organization: props.organization,
              },
            }}>
            Tests
          </Link>
          <Link
            to={{
              pathname: `/`,
            }}>
            Log out
          </Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default withRouter(Navigation);
