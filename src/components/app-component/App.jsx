import React, {useState,useEffect} from 'react';
import './App.css';
import TestForm from '../test-form/TestForm';
import Questions from '../questionsComponents/questions'
import QuestionsService from '../../services/questionsService';
import QuestionsForm from '../questionsComponents/questionsForm';


function App() {
  const [questions, setQuestions] = useState([])
  useEffect(async () => await QuestionsService.getAllQuestions().then((response)=>setQuestions(response.data)),[]);
  return (
    <div className="App">
      <header className="App-header">
      <div>
        <Questions/>
      </div>
      </header>
    </div>
  );
}

export default App;
