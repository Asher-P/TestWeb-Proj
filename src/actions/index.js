export const selectQuestions = (question)=>{
    return {
        type:"SELECT_QUESTIONS",
        payload: question
    }
}