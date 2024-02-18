import { ServerConfig } from "src/config/ServerConfig";
import DefaultService from "./DefaultService";
import axios from "axios";

// No need to change this. Inserted fixed id for the teachers.

class TeacherService {
  static instance = TeacherService.instance || new TeacherService();
  async getTeacherByEmail(payload) {
    let retry = 0;

    while (retry++ < 2) {
      console.log(ServerConfig.url.API_URL + "/teacher/get_teacher_by_email");
      try {
        const response = await axios.post(
          ServerConfig.url.API_URL + "/teacher/get_teacher_by_email",
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
        console.log("Error in getteacherbyemail in services/TeacherService.js");
        console.log(error);
        retry++;
      }
    }
    return DefaultService.instance.defaultResponse();
  }
  async updateTeacher(payload) {
    let retry = 0;

    while (retry++ < 2) {
      console.log(ServerConfig.url.API_URL + "/teacher/update_teacher");
      try {
        const response = await axios.post(
          ServerConfig.url.API_URL + "/teacher/update_teacher",
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
        console.log("Error in getteacherbyemail in services/TeacherService.js");
        console.log(error);
        retry++;
      }
    }
    return DefaultService.instance.defaultResponse();
  }

  async getAllAdviseeRequest(payload) {
    let retry = 0;

    while (retry++ < 2) {
      console.log(
        ServerConfig.url.API_URL + "/teacher/get_all_advisee_request",
      );
      try {
        const response = await axios.post(
          ServerConfig.url.API_URL + "/teacher/get_all_advisee_request",
          payload,
          DefaultService.instance.getHeaderWithToken(),
        );
        console.log(response);

        if (response.status == "200") {
          return {
            status: true,
            data: response.data,
          };
        }
      } catch (error) {
        console.log("Error in getteacherbyemail in services/TeacherService.js");
        console.log(error);
        retry++;
      }
    }
    return DefaultService.instance.defaultResponse();
  }

  async acceptAdvisorRequest(payload) {
    let retry = 0;

    while (retry++ < 2) {
      console.log(ServerConfig.url.API_URL + "/teacher/accept_advisor_request");
      try {
        const response = await axios.post(
          ServerConfig.url.API_URL + "/teacher/accept_advisor_request",
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
        console.log(
          "Error in acceptadvisorrequest in services/TeacherService.js",
        );
        console.log(error);
        retry++;
      }
    }
    return DefaultService.instance.defaultResponse();
  }

  async removeAdvisorRequest(payload) {
    let retry = 0;

    while (retry++ < 2) {
      console.log(ServerConfig.url.API_URL + "/teacher/remove_advisor_request");
      try {
        const response = await axios.post(
          ServerConfig.url.API_URL + "/teacher/remove_advisor_request",
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
        console.log(
          "Error in removeadvisorrequest in services/TeacherService.js",
        );
        console.log(error);
        retry++;
      }
    }
    return DefaultService.instance.defaultResponse();
  }

  async getAllCurrentAdvisee(payload) {
    let retry = 0;

    while (retry++ < 2) {
      console.log(
        ServerConfig.url.API_URL + "/teacher/get_all_current_advisee",
      );
      try {
        const response = await axios.post(
          ServerConfig.url.API_URL + "/teacher/get_all_current_advisee",
          payload,
          DefaultService.instance.getHeaderWithToken(),
        );
        console.log(response);

        if (response.status == "200") {
          return {
            status: true,
            data: response.data,
          };
        }
      } catch (error) {
        console.log(
          "Error in getallcurrentadvisee in services/TeacherService.js",
        );
        console.log(error);
        retry++;
      }
    }
    return DefaultService.instance.defaultResponse();
  }
}

export default TeacherService;
