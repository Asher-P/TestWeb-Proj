import {reducer as formReducer} from 'redux-form';
import {combineReducers} from 'redux';
import questionReducer from './questionReducer'
import questionsSelectReducer from './questionsSelectReducer'
import testReducer from './testReducer';

export default combineReducers({
form: formReducer,
questions: questionReducer,
test: testReducer,
questionsSelect: questionsSelectReducer,
})
