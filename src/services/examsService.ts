import http from "./httpService";

const serverRoute = "/api/exams/";

const ExamsService = {
  async getAllExams() {
    return await await http.get(serverRoute + "gettests");
  },
  async getExamById(id: string) {
    return await await http.get(serverRoute + `gettestbyid/${id}`);
  },

  async addExam(exam: any) {
    return await http.post(serverRoute + "addexam", exam);
  },
};

export default ExamsService;
