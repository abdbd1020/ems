import { ServerConfig } from 'src/config/ServerConfig'
import DefaultService from './DefaultService'
import axios from 'axios'

// No need to change this. Inserted fixed id for the teachers.

class TeacherService {
  static instance = TeacherService.instance || new TeacherService()
}

export default TeacherService
