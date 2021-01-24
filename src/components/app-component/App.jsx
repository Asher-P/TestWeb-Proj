import React, {useState,useEffect} from 'react';
import './App.css';
import TestForm from '../test-form/TestForm';
import Questions from '../questionsComponents/questions'
import QuestionsService from '../../services/questionsService';
import QuestionsForm from '../questionsComponents/questionsForm';
import Route from '../routeComponent/Route';


function App() {
  return (
    
    <div className="App">
      <header className="App-header">
      <nav>
        <ul>
          <li><a href="/testcreate">Test Form</a></li>
          <li><a href="/questioncreate">Question Form</a></li>
        </ul>
      </nav>
      </header>
      <div>
        <Route path="/testcreate">
        <TestForm/>
        </Route>
        <Route path="/questioncreate">
          <Questions/>
        </Route>
      </div>
    </div>
  );
}

export default App;
