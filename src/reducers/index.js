import {reducer as formReducer} from 'redux-form';
import {combineReducers} from 'redux';
import questionReducer from './questionReducer'
import questionsSelectReducer from './questionsSelectReducer'
import testsReducer from './testReducer';

export default combineReducers({
form: formReducer,
questions: questionReducer,
tests: testsReducer,
questionsSelect: questionsSelectReducer,
})
