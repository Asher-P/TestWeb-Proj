import React, { Component } from "react";
import QuestionService from "../../services/questionsService"
import QuestionsForm from "./questionsForm";
import QuestionsTable from "./questionsTable";
import Route from '../routeComponent/Route';

class Questions extends Component {
  state = {
    questions: [],
  };

  async componentDidMount() {
    this.getQuestions();
  }

  async getQuestions() {
    const { data: questions } = await QuestionService.getAllQuestions();
    this.setState({ questions });
    console.log(this.state.questions)
  }

  addQuestion = async (question) => {
    const addedQuestion = await QuestionService.addQuestion(question);
    this.setState({ questions: [...this.state.questions, addedQuestion.data] });
  };
  
  render() {
    return (
      <div className="container questions">
        <div>
        <nav>
        <ul>
          <li><a href="/questions/questioncreate">Add a Question</a></li>
          <li><a href="/questions/allquestions">All Questions</a></li>
        </ul>
      </nav>
        </div>
        {/* <Route path={`/questions/allquestions`}> */}
        {/* <QuestionsTable/> */}
        {/* </Route> */}
        {/* <Route path={`/questions/questioncreate`}> */}
          <QuestionsForm onAddQuestion = {this.addQuestion}/>
        {/* </Route>   */}
      </div>
    );
  }
}

export default Questions;