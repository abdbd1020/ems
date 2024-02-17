package com.ems.api.controller;

import com.ems.api.dto.EmailRequest;
import com.ems.api.model.EMSUser;
import com.ems.api.model.Student;
import com.ems.api.service.StudentService;
import com.ems.api.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/student")
public class StudentController {
    @Autowired
    private StudentService studentService;
    @PostMapping("/requestAdvisor")
    public String signUp(@RequestBody String studentId,@RequestBody String advisorId) {

        return studentService.requestAdvisor(studentId, advisorId);
    }
    @PostMapping("getstudentbyemail")
    public Student getStudentByEmail(@RequestBody EmailRequest emailRequest) {
        System.out.println(emailRequest.getEmail());
        return studentService.getStudentByEmail(emailRequest.getEmail());
    }
    @PostMapping("/updatestudent")
    public String updateStudent(@RequestBody Student student) {
        return studentService.updateStudentAndFetchToken(student);
    }
}
