import React from 'react';
import './App.css';
<<<<<<< HEAD
import TestForm from '../test-form/TestForm';
import Questions from '../questionsComponents/questions'
import QuestionsService from '../../services/questionsService';
import TestList from '../tests-list-componenet/TestList';
import Route from '../routeComponent/Route';
import TestEdit from '../test-edit/TestEdit';
=======
import Routes from '../routeComponent/Routes';
import Navigation from '../Navigation/navigation';
>>>>>>> 862a65cba282be9e3cafa03f1e96825a9d954bb2


function App() {
  return (   
    <div className="App">
      <header className="App-header">
      </header>
      <div>
<<<<<<< HEAD
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
=======
      <Navigation />
      <Routes />
>>>>>>> 862a65cba282be9e3cafa03f1e96825a9d954bb2
      </div>
    </div>
  );
}

export default App;
