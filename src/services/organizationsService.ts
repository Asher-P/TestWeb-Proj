import data from "../data/questions.data";
import http from "./httpService";

const serverRoute = "/api/Organizations/";

const OrganizationsService = {
  async getOrganizations() {
    return await await http.get(serverRoute + "getOrganizations");
  },
};

export default OrganizationsService;
