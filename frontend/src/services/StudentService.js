import { ServerConfig } from "src/config/ServerConfig";
import DefaultService from "./DefaultService";
import axios from "axios";

class StudentService {
  static instance = StudentService.instance || new StudentService();

  async getStudentByEmail(payload) {
    let retry = 0;

    while (retry++ < 2) {
      console.log(ServerConfig.url.API_URL + "/student/get_student_by_email");
      try {
        const response = await axios.post(
          ServerConfig.url.API_URL + "/student/get_student_by_email",
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
      console.log(ServerConfig.url.API_URL + "/student/update_student");
      try {
        const response = await axios.post(
          ServerConfig.url.API_URL + "/student/update_student",
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
  async getAllAdvisors() {
    let retry = 0;

    while (retry++ < 2) {
      console.log(ServerConfig.url.API_URL + "/student/get_all_advisors");
      try {
        const getTeacherListResponse = await axios.get(
          ServerConfig.url.API_URL + "/student/get_all_advisors",
          DefaultService.instance.getHeaderWithToken(),
        );
        if (getTeacherListResponse.status == "200") {
          return {
            status: true,
            data: getTeacherListResponse.data,
          };
        }
      } catch (error) {
        console.log("Error in getalladvisors in services/AdminService.js");
        console.log(error);
        retry++;
      }
    }
    return DefaultService.instance.defaultResponse();
  }

  async getRequestAdadvisorAssignmentList(payload) {
    let retry = 0;

    while (retry++ < 2) {
      console.log(
        ServerConfig.url.API_URL + "/student/requested_advisor_assignment_list",
      );
      try {
        const getTeacherListResponse = await axios.post(
          ServerConfig.url.API_URL +
            "/student/requested_advisor_assignment_list",
          payload,
          DefaultService.instance.getHeaderWithToken(),
        );
        if (getTeacherListResponse.status == "200") {
          return {
            status: true,
            data: getTeacherListResponse.data,
          };
        }
      } catch (error) {
        console.log(
          "Error in requestedadvisorassignmentlist in services/AdminService.js",
        );
        console.log(error);
        retry++;
      }
    }
    return DefaultService.instance.defaultResponse();
  }

  async sendAdvisorRequest(payload) {
    let retry = 0;

    while (retry++ < 2) {
      console.log(ServerConfig.url.API_URL + "/student/send_advisor_request");
      try {
        const response = await axios.post(
          ServerConfig.url.API_URL + "/student/send_advisor_request",
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
          "Error in sendadvisorrequest in services/DefaultService.js",
        );
        console.log(error);
        retry++;
      }
    }
    return DefaultService.instance.defaultResponse();
  }

  async cancelAdvisorRequest(payload) {
    let retry = 0;

    while (retry++ < 2) {
      console.log(ServerConfig.url.API_URL + "/student/cancel_advisor_request");
      try {
        const response = await axios.post(
          ServerConfig.url.API_URL + "/student/cancel_advisor_request",
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
          "Error in canceladvisorrequest in services/DefaultService.js",
        );
        console.log(error);
        retry++;
      }
    }
    return DefaultService.instance.defaultResponse();
  }
  async removeAdvisor(payload) {
    let retry = 0;

    while (retry++ < 2) {
      console.log(ServerConfig.url.API_URL + "/student/remove_advisor");
      try {
        const response = await axios.post(
          ServerConfig.url.API_URL + "/student/remove_advisor",
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
        console.log("Error in removeadvisor in services/DefaultService.js");
        console.log(error);
        retry++;
      }
    }
    return DefaultService.instance.defaultResponse();
  }
  async getCurrentAdvisor(payload) {
    let retry = 0;

    while (retry++ < 2) {
      console.log(ServerConfig.url.API_URL + "/student/get_current_advisor");
      try {
        const response = await axios.post(
          ServerConfig.url.API_URL + "/student/get_current_advisor",
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
        console.log("Error in getcurrentadvisor in services/DefaultService.js");
        console.log(error);
        retry++;
      }
    }
    return DefaultService.instance.defaultResponse();
  }
}

export default StudentService;
