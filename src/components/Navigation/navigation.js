import React from "react";
import { Navbar, Nav, Form, Button } from "react-bootstrap";
import { withRouter, Link } from "react-router-dom";
import "./navigation.css";

const Navigation = (props) => {
  return (
    <div className="ui inverted segment">
      <Navbar bg="primary" variant="dark">
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ui inverted secondary pointing menu">
            <Link
              className={
                window.location.pathname === "/home" ? "active item" : "item"
              }
              to={{
                pathname: `/home`,
                organizationProps: {
                  organization: props.organization,
                },
              }}>
              Home
            </Link>
            <Link
              className={
                window.location.pathname === "/questions"
                  ? "active item"
                  : "item"
              }
              to={{
                pathname: `/questions`,
                organizationProps: {
                  organization: props.organization,
                },
              }}>
              Questions
            </Link>
            <Link
              className={
                window.location.pathname === "/tests" ? "active item" : "item"
              }
              to={{
                pathname: `/tests`,
                organizationProps: {
                  organization: props.organization,
                },
              }}>
              Tests
            </Link>
            <Link
              className={
                window.location.pathname === "/reports" ? "active item" : "item"
              }
              to={{
                pathname: `/reports`,
                organizationProps: {
                  organization: props.organization,
                },
              }}>
              Reports
            </Link>
            <Link className="item" to="/">
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
