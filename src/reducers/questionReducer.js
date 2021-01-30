import QuestionService from '../services/questionsService';


const questionReducer =  (state = [], action)=>{
    if(action.type ==="FETCH_QUESTIONS"){
        return action.payload
    }
    if(action.type ==="FETCH_QUESTION"){
        return action.payload
    }
    
  return state;
}



export default questionReducer;