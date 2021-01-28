import React, {useState,useEffect} from 'react';
import './App.css';
import TestForm from '../test-form/TestForm';
import Questions from '../questionsComponents/questions'
import QuestionsService from '../../services/questionsService';
import TestList from '../tests-list-componenet/TestList';
import Route from '../routeComponent/Route';
import TestEdit from '../test-edit/TestEdit';


function App() {
  return (
    
    <div className="App">
      <header className="App-header">
      <nav>
        <ul>
          <li><a href="/testcreate">Test Form</a></li>
          <li><a href="/questions">Questions</a></li>
          <li><a href="/testlist">Test List</a></li>
        </ul>
      </nav>
      </header>
      <div>
        <Route path="/testcreate">
        <TestForm/>
        </Route>
        <Route path="/questions">
          <Questions/>
        </Route>
        <Route path="/testlist">
          <TestList/>
        </Route>
        <Route path="/testedit">
          <TestEdit/>
        </Route>
      </div>
    </div>
  );
}

export default App;
