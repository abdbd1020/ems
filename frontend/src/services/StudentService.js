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
  async getAllAdvisors() {
    let retry = 0;

    while (retry++ < 2) {
      console.log(ServerConfig.url.API_URL + "/student/getalladvisors");
      try {
        const getTeacherListResponse = await axios.get(
          ServerConfig.url.API_URL + "/student/getalladvisors",
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
        ServerConfig.url.API_URL + "/student/requestedadvisorassignmentlist",
      );
      try {
        const getTeacherListResponse = await axios.post(
          ServerConfig.url.API_URL + "/student/requestedadvisorassignmentlist",
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
      console.log(ServerConfig.url.API_URL + "/student/sendadvisorrequest");
      try {
        const response = await axios.post(
          ServerConfig.url.API_URL + "/student/sendadvisorrequest",
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
  async removeAdvisor(payload) {
    let retry = 0;

    while (retry++ < 2) {
      console.log(ServerConfig.url.API_URL + "/student/removeadvisor");
      try {
        const response = await axios.post(
          ServerConfig.url.API_URL + "/student/removeadvisor",
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
      console.log(ServerConfig.url.API_URL + "/student/getcurrentadvisor");
      try {
        const response = await axios.post(
          ServerConfig.url.API_URL + "/student/getcurrentadvisor",
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
