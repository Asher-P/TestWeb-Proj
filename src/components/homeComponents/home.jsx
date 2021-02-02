import React, { Component } from "react";
import history from '../../History/history';
import { Button } from 'react-bootstrap';

export default class Home extends Component {
  render() {
    return (
      <div className="Home">
        <div className="lander">
          <h1>Home page</h1>
          <h2>Welcome!</h2>
          <form>
            <div>
              <label>Please Select a Domain</label>
            </div>
            <Button variant="btn btn-success" onClick={() => history.push('/AllQuestions')}>Show Questions</Button>
          </form>
        </div>
      </div>
    );
  }
}