import http from "./httpService";

const serverRoute = "/api/tests/";

const TestsService = {
  async getAllTests() {
    return await await http.get(serverRoute + "gettests");
  },
  async getTestById(id: string) {
    return await await http.get(serverRoute + `gettestbyid/${id}`);
  },

  async editTest(testChanges: any) {
    return await await http.put(
      serverRoute + `edittest/${testChanges.Id}`,
      testChanges
    );
  },

  async addTest(test: any) {
    return await http.post(serverRoute + "addtest", test);
  },
};

export default TestsService;
