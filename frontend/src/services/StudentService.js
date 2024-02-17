import { ServerConfig } from "src/config/ServerConfig";
import DefaultService from "./DefaultService";
import axios from "axios";

class StudentService {
  static instance = StudentService.instance || new StudentService();

  async getStudentByEmail(payload) {
    let retry = 0;

    while (retry++ < 2) {
      console.log(ServerConfig.url.API_URL + "/student/getstudentbyemail");
      try {
        const response = await axios.post(
          ServerConfig.url.API_URL + "/student/getstudentbyemail",
          payload,
          DefaultService.instance.getHeaderWithToken(),
        );

        if (response.status == "200") {
          return {
            status: true,
            data: response.data,
          };
        }
      } catch (error) {
        console.log("Error in getstudentbyemail in services/DefaultService.js");
        console.log(error);
        retry++;
      }
    }
    return DefaultService.instance.defaultResponse();
  }
  async updateStudent(payload) {
    let retry = 0;

    while (retry++ < 2) {
      console.log(ServerConfig.url.API_URL + "/student/updatestudent");
      try {
        const response = await axios.post(
          ServerConfig.url.API_URL + "/student/updatestudent",
          payload,
          DefaultService.instance.getHeaderWithToken(),
        );

        if (response.status == "200") {
          return {
            status: true,
            data: response.data,
          };
        }
      } catch (error) {
        console.log("Error in getstudentbyemail in services/DefaultService.js");
        console.log(error);
        retry++;
      }
    }
    return DefaultService.instance.defaultResponse();
  }
}

export default StudentService;
