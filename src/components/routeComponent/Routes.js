import React, { Component } from "react";
import { Router, Switch, Route } from "react-router-dom";
import Questions from "../questionsComponents/questions";
import QuestionsTable from "../questionsComponents/questionsTable";
import QuestionsForm from "../questionsComponents/questionsForm";
import TestList from '../tests-list-componenet/TestList';
import TestForm from '../test-form/TestForm';
import Home from '../homeComponents/home';
import History from '../../History/history';

export default class Routes extends Component {
    render() {
        return (
            <Router history={History}>
                <Switch>
                    <Route path="/" exact component={Home} />
                    <Route path="/Questions" component={Questions} />
                    <Route path="/QuestionsForm" component={QuestionsForm} />
                    <Route path="/AllQuestions" component={QuestionsTable} />
                    <Route path="/TestForm" component={TestForm} />
                </Switch>
            </Router>
        )
    }
}