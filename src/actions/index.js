import TestsService from '../services/testsService'
import QuestionService from '../services/questionsService'
import ExamsService from '../services/examsService'
import OrganizationsService from '../services/organizationsService'
export const selectQuestions = (question) => {
    return {
        type: "SELECT_QUESTIONS",
        payload: question
    }
}
export const fetchQuestions = () => async dispatch => {
    const response = await QuestionService.getAllQuestions();
    console.log("fetchQuestions",response.data);
    dispatch(({ type: "FETCH_QUESTIONS", payload: response.data }));
}

export const fetchQuestion = (id) => async dispatch => {
    const response = await QuestionService.getQuestionById(id);
    if (response.status == 200) {
        dispatch({ type: "FETCH_QUESTION", payload: response.data });
    }
    else {
        dispatch({ type: "FETCH_QUESTION", payload: null })
    }
}
export const clearselectQuestions = () => {
    return {
        type: "CLEAR_SELECT_QUESTIONS",
        payload: null
    }
}

export const fetchTest = (id) => async dispatch => {
    const response = await TestsService.getTestById(id);
    dispatch({ type: "FETCH_TEST", payload: response.data });
}
export const fetchExam = (id) => async dispatch => {
    const response = await ExamsService.getExamById(id);
    dispatch({ type: "FETCH_EXAM", payload: response.data });
}

export const fetchTests = () => async dispatch => {
    const response = await TestsService.getAllTests();
    dispatch({ type: "FETCH_TESTS", payload: response.data });
}
export const addAnswer = (answer) => {
    return {type:"ADD_ANSWER",payload:answer}
}
export const moveQuestion = (id) => async dispatch=> {
    const response = await QuestionService.getQuestionById(id);
    if (response.status == 200) {
        dispatch({ type: "MOVE_QUESTION", payload: response.data });
    }
    else {
        dispatch({ type: "MOVE_QUESTION", payload: null })
    }
}
export const fetchOrganizations = () => async (dispatch) => {
  const response = await OrganizationsService.getOrganizations();
  dispatch({ type: "FETCH_ORGANIZATIONS", payload: response.data });
};