import React, { Component } from "react";
import { Router, Switch, Route } from "react-router-dom";
import Questions from "../questionsComponents/questions";
import QuestionsTable from "../questionsComponents/questionsTable";
import QuestionsForm from "../questionsComponents/questionsForm";
import TestList from '../tests-list-componenet/TestList';
import TestForm from '../test-form/TestForm';
import Home from '../homeComponents/home';
import History from '../../History/history';
import TestNav from "../testsNav/TestNav";
import TestEdit from "../test-edit/TestEdit";
import Exam from "../Testing/Exam";
import CertificateDisplay from "../certificate/CertificateDisplay";

export default class Routes extends Component {
    render() {
        return (
            <Router history={History}>
                <Switch>
                    <Route path="/" exact component={Home} />
                    <Route path="/Questions" component={Questions} />
                    <Route path="/QuestionsForm" component={QuestionsForm} />
                    <Route path="/AllQuestions" component={QuestionsTable} />
                    <Route path="/tests" component={TestNav} />
                    <Route path="/testlist" component={TestList} />
                    <Route path="/createtest" component={TestForm} />
                    <Route path={`/edittest/:testId`} component={TestEdit} />
                    <Route path={`/exam/:testid`} component={Exam} />
                    <Route path={"/edittest/"}>
                        <h3>Please select a topic.</h3>
                    </Route>
                    <Route path={"/CertificateDisplay"} component={CertificateDisplay}/>
                </Switch>
            </Router>
        )
    }
}