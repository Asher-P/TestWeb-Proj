import React, { Component } from "react";
import { Router, Switch, Route } from "react-router-dom";
import Questions from "../questionsComponents/questions";
import QuestionsTable from "../questionsComponents/questionsTable";
import QuestionsForm from "../questionsComponents/questionsForm";
import TestList from "../tests-list-componenet/TestList";
import TestForm from "../test-form/TestForm";
import Home from "../homeComponents/home";
import OrganizationHome from "../homeComponents/organizationHome";
import History from "../../History/history";
import TestNav from "../testsNav/TestNav";
import TestEdit from "../test-edit/TestEdit";
import Exam from "../Testing/Exam";
import CertificateDisplay from "../certificate/CertificateDisplay";
import ShowAnswers from "../Testing/ShowAnswers";
import Reports from "../reportsComponents/reports";

export default class Routes extends Component {
  render() {
    return (
      <Router history={History}>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/home" component={OrganizationHome} />
          <Route exact path="/questions" component={Questions} />
          <Route path="/questionsform/:id?" component={QuestionsForm} />
          <Route exact path="/allquestions" component={QuestionsTable} />
          <Route exact path="/testform" component={TestForm} />
          <Route path="/tests" component={TestNav} />
          <Route path="/testlist" component={TestList} />
          <Route path="/createtest" component={TestForm} />
          <Route path={`/edittest/:testId`} component={TestEdit} />
          <Route path={`/exam/:testid`} component={Exam} />
          <Route path={"/edittest/"}>
            <h3>Please select a topic.</h3>
          </Route>
          <Route path="/reports" component={Reports} />
          <Route path={"/CertificateDisplay"} component={CertificateDisplay} />
          <Route path={"/showanswers"} component={ShowAnswers} />
        </Switch>
      </Router>
    );
  }
}
