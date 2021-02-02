import data from "../data/questions.data";
import http from "./httpService";

const serverRoute = "/api/Questions/";

const QuestionService = {
  async getAllQuestions() {
    return await (await http.get(serverRoute + "getQuestions"));
  },
  async getQuestionById(id:string) {
    return await (await http.get(serverRoute + `getquestionbyid/${id}`));
  },

  async addQuestion(question: any) {
    return await http.post(serverRoute + "addQuestion", question);
  },

  async editQuestion(question: any, id: any) {
    console.log("correct");    
    let questionToEdit = { question: question, id: id }; 
    return await http.post(serverRoute + "editQuestion", questionToEdit);
  }
};


export default QuestionService;
