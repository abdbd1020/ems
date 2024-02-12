/* eslint-disable prettier/prettier */
import { ServerConfig } from "src/config/ServerConfig";
import DefaultService from "./DefaultService";
import axios from "axios";

class AdminService {
  static instance = AdminService.instance || new AdminService();
}

export default AdminService;
