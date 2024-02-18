import { ServerConfig } from "src/config/ServerConfig";
import DefaultService from "./DefaultService";
import axios from "axios";

class AdminService {
  static instance = AdminService.instance || new AdminService();

  async getAllUsers() {
    let retry = 0;

    while (retry++ < 2) {
      try {
        const getTeacherListResponse = await axios.get(
          ServerConfig.url.API_URL + "/admin/get_all_users",
          DefaultService.instance.getHeaderWithToken(),
        );
        if (getTeacherListResponse.status == "200") {
          return {
            status: true,
            userList: getTeacherListResponse.data,
          };
        }
      } catch (error) {
        console.log(error);
        retry++;
      }
    }
    return DefaultService.instance.defaultResponse();
  }

  async getAllSpecificUsers(api) {
    let retry = 0;

    while (retry++ < 2) {
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
        console.log(error);
        retry++;
      }
    }
    return DefaultService.instance.defaultResponse();
  }

  async getAllInactiveUsers() {
    const api = "/get_all_inactive_users";
    return this.getAllSpecificUsers(api);
  }

  async getAllInactiveAndGuestUsers() {
    const api = "/get_all_inactive_and_guest_users";
    return this.getAllSpecificUsers(api);
  }

  async getAllTeachers() {
    const api = "/get_all_teachers";
    return this.getAllSpecificUsers(api);
  }
  async getAllStudents() {
    const api = "/get_all_students";
    return this.getAllSpecificUsers(api);
  }

  async updateUser(payload) {
    let retry = 0;

    while (retry++ < 2) {
      try {
        const addTeacherResponse = await axios.post(
          ServerConfig.url.API_URL + "/admin/update_user",
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
        console.log(error);
        retry++;
      }
    }
    return DefaultService.instance.defaultResponse();
  }

  // async deleteUser(payload) {
  //   let retry = 0;

  //   while (retry++ < 2) {
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
  //       console.log(error);
  //       retry++;
  //     }
  //   }
  //   return DefaultService.instance.defaultResponse();
  // }

  async getAllFaculty() {
    let retry = 0;

    while (retry++ < 2) {
      try {
        const getTeacherListResponse = await axios.get(
          ServerConfig.url.API_URL + "/admin/get_all_faculty",
          DefaultService.instance.getHeaderWithToken(),
        );
        if (getTeacherListResponse.status == "200") {
          return {
            status: true,
            facultyList: getTeacherListResponse.data,
          };
        }
      } catch (error) {
        console.log(error);
        retry++;
      }
    }
    return DefaultService.instance.defaultResponse();
  }

  async createFaculty(payload) {
    for (const key in payload) {
    }

    let retry = 0;

    while (retry++ < 2) {
      try {
        const addTeacherResponse = await axios.post(
          ServerConfig.url.API_URL + "/admin/add_faculty",
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
        console.log(error);
        retry++;
      }
    }
    return DefaultService.instance.defaultResponse();
  }

  async updateFaculty(payload) {
    for (const key in payload) {
    }

    let retry = 0;

    while (retry++ < 2) {
      try {
        const addTeacherResponse = await axios.post(
          ServerConfig.url.API_URL + "/admin/update_faculty",
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
        console.log(error);
        retry++;
      }
    }
    return DefaultService.instance.defaultResponse();
  }

  async getAllDepartment() {
    let retry = 0;

    while (retry++ < 2) {
      try {
        const getTeacherListResponse = await axios.get(
          ServerConfig.url.API_URL + "/admin/get_all_departments",
          DefaultService.instance.getHeaderWithToken(),
        );
        if (getTeacherListResponse.status == "200") {
          return {
            status: true,
            departmentList: getTeacherListResponse.data,
          };
        }
      } catch (error) {
        console.log(error);
        retry++;
      }
    }
    return DefaultService.instance.defaultResponse();
  }

  async createDepartment(payload) {
    let retry = 0;

    while (retry++ < 2) {
      try {
        const addTeacherResponse = await axios.post(
          ServerConfig.url.API_URL + "/admin/add_department",
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
        console.log(error);
        retry++;
      }
    }
    return DefaultService.instance.defaultResponse();
  }

  async updateDepartment(payload) {
    let retry = 0;

    while (retry++ < 2) {
      try {
        const addTeacherResponse = await axios.post(
          ServerConfig.url.API_URL + "/admin/update_department",
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
        console.log(error);
        retry++;
      }
    }
    return DefaultService.instance.defaultResponse();
  }
}

export default AdminService;
