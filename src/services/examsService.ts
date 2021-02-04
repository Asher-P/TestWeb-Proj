import http from "./httpService";

  
  const serverRoute = "/api/exams/";
  
  const ExamsService = {
    async getAllExams() {
      return await (await http.get(serverRoute + "getexams"));
    },
    async getExamById(id:string) {
      return await (await http.get(serverRoute + `getexambyid/${id}`));
      
    },
    async addExam(exam: any) {
        return await http.post(serverRoute + "addexam", exam);
      },
  };

export default ExamsService;
