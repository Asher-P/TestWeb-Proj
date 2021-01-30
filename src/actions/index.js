import TestsService from '../services/testsService'
import QuestionService from '../services/questionsService'
export const selectQuestions = (question)=>{
    return {
        type:"SELECT_QUESTIONS",
        payload: question
    }
}
export const fetchQuestions = ()=> async dispatch =>{
    const response = await QuestionService.getAllQuestions();
    dispatch(({type:"FETCH_QUESTIONS", payload: response.data}));
}

export const fetchQuestion= (id) => async dispatch =>{
    const response = await QuestionService.getQuestionById(id);
    dispatch({type:"FETCH_Question", payload:response.data});
}
export const clearselectQuestions = ()=>{
    return {
        type:"CLEAR_SELECT_QUESTIONS",
        payload:null
    }
}

export const fetchTest= (id) => async dispatch =>{
    const response = await TestsService.getTestById(id);
    dispatch({type:"FETCH_TEST", payload:response.data});
}

export const fetchTests= () => async dispatch =>{
    const response = await TestsService.getAllTests();
    dispatch({type:"FETCH_TESTS", payload:response.data});
}