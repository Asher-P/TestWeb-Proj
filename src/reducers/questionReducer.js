import QuestionService from '../services/questionsService';


const questionReducer = ()=>{
 return QuestionService.getAllQuestions();
}



export default questionReducer;