/* eslint-disable prettier/prettier */
import { ServerConfig } from "src/config/ServerConfig";
import DefaultService from "./DefaultService";
import axios from "axios";

// No need to change this. Inserted fixed id for the teachers.

class StudentService {
  static instance = StudentService.instance || new StudentService();
}

export default StudentService;
