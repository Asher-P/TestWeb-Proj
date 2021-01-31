export const selectQuestions = (question)=>{
    return {
        type:"SELECT_QUESTIONS",
        payload: question
    }
}
export const clearselectQuestions = ()=>{
    return {
        type:"CLEAR_SELECT_QUESTIONS",
        payload:null
    }
}
