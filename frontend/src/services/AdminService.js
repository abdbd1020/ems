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

  async getAllSpecificUsers(api) {
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
        console.log("Error in " + api + " in services/AdminService.js");
        console.log(error);
        retry++;
      }
    }
    return DefaultService.instance.defaultResponse();
  }

  async getAllInactiveUsers() {
    const api = "/getallinactiveusers";
    return this.getAllSpecificUsers(api);
  }

  async getAllInactiveAndGuestUsers() {
    const api = "/getallinactiveandguestusers";
    return this.getAllSpecificUsers(api);
  }

  async getAllTeachers() {
    const api = "/getallteachers";
    return this.getAllSpecificUsers(api);
  }
  async getAllStudents() {
    const api = "/getallstudents";
    return this.getAllSpecificUsers(api);
  }

  async updateUser(payload) {
    let retry = 0;

    while (retry++ < 2) {
      console.log(ServerConfig.url.API_URL + "/admin/updateuser");
      try {
        const addTeacherResponse = await axios.post(
          ServerConfig.url.API_URL + "/admin/updateuser",
          payload,
          DefaultService.instance.getHeaderWithToken(),
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

  // async deleteUser(payload) {
  //   let retry = 0;

  //   while (retry++ < 2) {
  //     console.log(ServerConfig.url.API_URL + "/admin_delete_teacher");
  //     try {
  //       const addTeacherResponse = await axios.post(
  //         ServerConfig.url.API_URL + "/admin_delete_teacher",
  //         payload,
  //         DefaultService.instance.getHeaderWithToken(),
  //       );

  //       switch (addTeacherResponse.data.responseMessage) {
  //         default:
  //           return addTeacherResponse.data;
  //       }
  //     } catch (error) {
  //       console.log("Error in deleteTeacher in services/AdminService.js");
  //       console.log(error);
  //       retry++;
  //     }
  //   }
  //   return DefaultService.instance.defaultResponse();
  // }

  async getAllFaculty() {
    let retry = 0;

    while (retry++ < 2) {
      console.log(ServerConfig.url.API_URL + "/admin/getallfaculty");
      try {
        const getTeacherListResponse = await axios.get(
          ServerConfig.url.API_URL + "/admin/getallfaculty",
          DefaultService.instance.getHeaderWithToken(),
        );
        if (getTeacherListResponse.status == "200") {
          return {
            status: true,
            facultyList: getTeacherListResponse.data,
          };
        }
      } catch (error) {
        console.log("Error in getAllFaculty in services/AdminService.js");
        console.log(error);
        retry++;
      }
    }
    return DefaultService.instance.defaultResponse();
  }

  async createFaculty(payload) {
    for (const key in payload) {
      console.log(key, payload[key]);
    }

    let retry = 0;

    while (retry++ < 2) {
      console.log(ServerConfig.url.API_URL + "/admin/addfaculty");
      try {
        const addTeacherResponse = await axios.post(
          ServerConfig.url.API_URL + "/admin/addfaculty",
          payload,
          DefaultService.instance.getHeaderWithToken(),
        );

        if (addTeacherResponse.status == "200") {
          return {
            status: true,
            responseMessage: addTeacherResponse.data.responseMessage,
          };
        }
      } catch (error) {
        console.log("Error in createFaculty in services/AdminService.js");
        console.log(error);
        retry++;
      }
    }
    return DefaultService.instance.defaultResponse();
  }

  async updateFaculty(payload) {
    for (const key in payload) {
      console.log(key, payload[key]);
    }

    let retry = 0;

    while (retry++ < 2) {
      console.log(ServerConfig.url.API_URL + "/admin/updatefaculty");
      try {
        const addTeacherResponse = await axios.post(
          ServerConfig.url.API_URL + "/admin/updatefaculty",
          payload,
          DefaultService.instance.getHeaderWithToken(),
        );

        if (addTeacherResponse.status == "200") {
          return {
            status: true,
            responseMessage: addTeacherResponse.data.responseMessage,
          };
        }
      } catch (error) {
        console.log("Error in updatefaculty in services/AdminService.js");
        console.log(error);
        retry++;
      }
    }
    return DefaultService.instance.defaultResponse();
  }

  async getAllDepartment() {
    let retry = 0;

    while (retry++ < 2) {
      console.log(ServerConfig.url.API_URL + "/admin/getalldepartments");
      try {
        const getTeacherListResponse = await axios.get(
          ServerConfig.url.API_URL + "/admin/getalldepartments",
          DefaultService.instance.getHeaderWithToken(),
        );
        if (getTeacherListResponse.status == "200") {
          return {
            status: true,
            departmentList: getTeacherListResponse.data,
          };
        }
      } catch (error) {
        console.log("Error in getAllDepartment in services/AdminService.js");
        console.log(error);
        retry++;
      }
    }
    return DefaultService.instance.defaultResponse();
  }

  async createDepartment(payload) {
    let retry = 0;

    while (retry++ < 2) {
      console.log(ServerConfig.url.API_URL + "/admin/adddepartment");
      try {
        const addTeacherResponse = await axios.post(
          ServerConfig.url.API_URL + "/admin/adddepartment",
          payload,
          DefaultService.instance.getHeaderWithToken(),
        );

        if (addTeacherResponse.status == "200") {
          return {
            status: true,
            responseMessage: addTeacherResponse.data.responseMessage,
          };
        }
      } catch (error) {
        console.log("Error in createDepartment in services/AdminService.js");
        console.log(error);
        retry++;
      }
    }
    return DefaultService.instance.defaultResponse();
  }

  async updateDepartment(payload) {
    let retry = 0;

    while (retry++ < 2) {
      console.log(ServerConfig.url.API_URL + "/admin/updatedepartment");
      try {
        const addTeacherResponse = await axios.post(
          ServerConfig.url.API_URL + "/admin/updatedepartment",
          payload,
          DefaultService.instance.getHeaderWithToken(),
        );

        if (addTeacherResponse.status == "200") {
          return {
            status: true,
            responseMessage: addTeacherResponse.data.responseMessage,
          };
        }
      } catch (error) {
        console.log("Error in updateDepartment in services/AdminService.js");
        console.log(error);
        retry++;
      }
    }
    return DefaultService.instance.defaultResponse();
  }
}

export default AdminService;
