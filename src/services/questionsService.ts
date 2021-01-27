import http from "./httpService";

export interface Question {
  Id: number;
  Title: string;
  QuestionBody: string;
}

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
};

export default QuestionService;
