import {reducer as formReducer} from 'redux-form';
import {combineReducers} from 'redux';
import questionReducer from './questionReducer'
import questionsSelectReducer from './questionsSelectReducer'

export default combineReducers({
form: formReducer,
questions: questionReducer,
questionsSelect: questionsSelectReducer
})
