import React, {useState,useEffect} from 'react';
import './App.css';
import TestForm from '../test-form/TestForm';
import QuestionsService from '../../services/questionsService';


function App() {
  const [questions, setQuestions] = useState([])
  useEffect(async () => await QuestionsService.getAllQuestions().then((response)=>setQuestions(response.data)),[]);
  return (
    <div className="App">
      <header className="App-header">
      App Component 
      <div>
        <TestForm questions={questions}></TestForm>
      </div>
      </header>
    </div>
  );
}

export default App;
