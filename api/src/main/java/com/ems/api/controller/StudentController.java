package com.ems.api.controller;

import com.ems.api.dto.AdvisorAssignmentResponse;
import com.ems.api.dto.AdvisorRequest;
import com.ems.api.dto.EmailRequest;
import com.ems.api.model.AdvisorAssignment;
import com.ems.api.model.EMSUser;
import com.ems.api.model.Student;
import com.ems.api.model.Teacher;
import com.ems.api.service.StudentService;
import com.ems.api.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;

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
    @GetMapping("/getalladvisors")
    public ArrayList<Teacher> getAllAdvisors() {
        return studentService.getAllAdvisors();
    }
    @PostMapping("/sendadvisorrequest")
    public String sendAdvisorRequest(@RequestBody AdvisorRequest advisorRequest) {
        return studentService.sendAdvisorRequest(advisorRequest);
    }
    @PostMapping("/requestedadvisorassignmentlist")
    public ArrayList<AdvisorAssignmentResponse> requestedAdvisorAssignmentList(@RequestBody EmailRequest emailRequest) {
        System.out.println(emailRequest.getEmail());
        return studentService.requestedAdvisorAssignmentList(emailRequest);
    }
    @PostMapping("/getcurrentadvisor")
    public Teacher getCurrentAdvisor(@RequestBody EmailRequest emailRequest) {
        return studentService.getCurrentAdvisor(emailRequest);
    }
    @PostMapping("/removeadvisor")
    public String removeAdvisor(@RequestBody EmailRequest emailRequest) {
        return studentService.removeAdvisor(emailRequest);
    }



}
