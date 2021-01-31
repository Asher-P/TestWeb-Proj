import React from 'react';
import { Navbar, Nav, Form, Button } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';

const Navigation = (props) => {
    console.log(props);
    return (
        <Navbar bg="primary" variant="dark">
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link href="/">Home</Nav.Link>
<<<<<<< HEAD
                    <Nav.Link href="/questions">Questions</Nav.Link>
                    <Nav.Link href="/TestForm">Test Form</Nav.Link>
=======
                    <Nav.Link href="/questions">Questions</Nav.Link>
                    <Nav.Link href="/tests">Tests</Nav.Link>
                    
>>>>>>> 359804e243fcf0ea4dfcb7410508120f88d3f692
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}

export default withRouter(Navigation);