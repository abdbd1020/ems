import { ServerConfig } from "src/config/ServerConfig";
import DefaultService from "./DefaultService";
import axios from "axios";

class AdminService {
  static instance = AdminService.instance || new AdminService();

  async getAllUsers() {
    let retry = 0;

    while (retry++ < 2) {
      console.log(ServerConfig.url.API_URL + "/admin/getallusers");
      try {
        const getTeacherListResponse = await axios.get(
          ServerConfig.url.API_URL + "/admin/getallusers",
          DefaultService.instance.getHeaderWithToken(),
        );
        if (getTeacherListResponse.status == "200") {
          return {
            status: true,
            userList: getTeacherListResponse.data,
          };
        }
      } catch (error) {
        console.log("Error in getTeacherList in services/AdminService.js");
        console.log(error);
        retry++;
      }
    }
    return DefaultService.instance.defaultResponse();
  }

  async getAllSpecifiicUsers(api) {
    let retry = 0;

    while (retry++ < 2) {
      console.log(ServerConfig.url.API_URL + "/admin" + api);
      try {
        const getTeacherListResponse = await axios.get(
          ServerConfig.url.API_URL + "/admin" + api,
          DefaultService.instance.getHeaderWithToken(),
        );
        if (getTeacherListResponse.status == "200") {
          return {
            status: true,
            userList: getTeacherListResponse.data,
          };
        }
      } catch (error) {
        console.log("Error in" + api + " in services/AdminService.js");
        console.log(error);
        retry++;
      }
    }
    return DefaultService.instance.defaultResponse();
  }

  async updateUser(payload) {
    let retry = 0;

    while (retry++ < 2) {
      console.log(ServerConfig.url.API_URL + "/admin/updateuser");
      try {
        const addTeacherResponse = await axios.post(
          ServerConfig.url.API_URL + "/admin/updateuser",
          payload,
          DefaultService.instance.getHeader(),
        );

        if (addTeacherResponse.status == "200") {
          return {
            status: true,
            responseMessage: addTeacherResponse.data.responseMessage,
          };
        }
      } catch (error) {
        console.log("Error in addTeacher in services/AdminService.js");
        console.log(error);
        retry++;
      }
    }
    return DefaultService.instance.defaultResponse();
  }

  async deleteUser(payload) {
    let retry = 0;

    while (retry++ < 2) {
      console.log(ServerConfig.url.API_URL + "/admin_delete_teacher");
      try {
        const addTeacherResponse = await axios.post(
          ServerConfig.url.API_URL + "/admin_delete_teacher",
          payload,
          DefaultService.instance.getHeader(),
        );

        switch (addTeacherResponse.data.responseMessage) {
          default:
            return addTeacherResponse.data;
        }
      } catch (error) {
        console.log("Error in deleteTeacher in services/AdminService.js");
        console.log(error);
        retry++;
      }
    }
    return DefaultService.instance.defaultResponse();
  }

  async getAllInactiveUsers() {
    const api = "/getallinactiveusers";
    return this.getAllSpecifiicUsers(api);
  }
  async getAllTeachers() {
    const api = "/getallteachers";
    return this.getAllSpecifiicUsers(api);
  }
  async getAllStudents() {
    const api = "/getallstudents";
    return this.getAllSpecifiicUsers(api);
  }
}

export default AdminService;
