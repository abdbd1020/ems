import { ServerConfig } from "src/config/ServerConfig";
import DefaultService from "./DefaultService";
import axios from "axios";

// No need to change this. Inserted fixed id for the teachers.

class TeacherService {
  static instance = TeacherService.instance || new TeacherService();
  async getTeacherByEmail(payload) {
    console.log(payload);
    let retry = 0;

    while (retry++ < 2) {
      console.log(ServerConfig.url.API_URL + "/teacher/getteacherbyemail");
      try {
        const response = await axios.post(
          ServerConfig.url.API_URL + "/teacher/getteacherbyemail",
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
        console.log("Error in getteacherbyemail in services/DefaultService.js");
        console.log(error);
        retry++;
      }
    }
    return DefaultService.instance.defaultResponse();
  }
  async updateTeacher(payload) {
    console.log(payload);
    let retry = 0;

    while (retry++ < 2) {
      console.log(ServerConfig.url.API_URL + "/teacher/updateteacher");
      try {
        const response = await axios.post(
          ServerConfig.url.API_URL + "/teacher/updateteacher",
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
        console.log("Error in getteacherbyemail in services/DefaultService.js");
        console.log(error);
        retry++;
      }
    }
    return DefaultService.instance.defaultResponse();
  }
}

export default TeacherService;
