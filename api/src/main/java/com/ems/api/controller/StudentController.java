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

    @PostMapping("get_student_by_email")
    public Student getStudentByEmail(@RequestBody EmailRequest emailRequest) {
        System.out.println(emailRequest.getEmail());
        return studentService.getStudentByEmail(emailRequest.getEmail());
    }
    @PostMapping("/update_student")
    public String updateStudent(@RequestBody Student student) {
        return studentService.updateStudentAndFetchToken(student);
    }
    @GetMapping("/get_all_advisors")
    public ArrayList<Teacher> getAllAdvisors() {
        return studentService.getAllAdvisors();
    }
    @PostMapping("/send_advisor_request")
    public String sendAdvisorRequest(@RequestBody AdvisorRequest advisorRequest) {
        return studentService.sendAdvisorRequest(advisorRequest);
    }
    @PostMapping("/requested_advisor_assignment_list")
    public ArrayList<AdvisorAssignmentResponse> requestedAdvisorAssignmentList(@RequestBody EmailRequest emailRequest) {
        System.out.println(emailRequest.getEmail());
        return studentService.requestedAdvisorAssignmentList(emailRequest);
    }
    @PostMapping("/get_current_advisor")
    public Teacher getCurrentAdvisor(@RequestBody EmailRequest emailRequest) {
        return studentService.getCurrentAdvisor(emailRequest);
    }
    @PostMapping("/remove_advisor")
    public String removeAdvisor(@RequestBody EmailRequest emailRequest) {
        return studentService.removeAdvisor(emailRequest);
    }



}
