import {reducer as formReducer} from 'redux-form';
import {combineReducers} from 'redux';
import {answerReducer} from './answersReducer';
import questionReducer from './questionReducer'
import questionsSelectReducer from './questionsSelectReducer'
import testReducer from './testReducer';
import currentQuestionReducer from './currentQuestion';
import currentExamReducer from './currentExamReducer';


export default combineReducers({
form: formReducer,
questions: questionReducer,
test: testReducer,
questionsSelect: questionsSelectReducer,
currentQuestion: currentQuestionReducer,
answers: answerReducer,
currentExam: currentExamReducer
})
