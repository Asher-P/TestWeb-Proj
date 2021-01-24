import QuestionService from '../services/questionsService';
import data from '../data/questions.data'

const questionReducer = ()=>{
 return QuestionService.getAllQuestions();
}



export default questionReducer;