package com.ems.api.controller;

import com.ems.api.dto.AdviseeRequest;
import com.ems.api.dto.AdvisorRequest;
import com.ems.api.dto.EmailRequest;
import com.ems.api.model.AdvisorAssignment;
import com.ems.api.model.Teacher;
import com.ems.api.service.StudentService;
import com.ems.api.service.TeacherService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/teacher")
public class TeacherController {
    @Autowired
    private TeacherService teacherService;

    @PostMapping("/getteacherbyemail")
    public Teacher getTeacherById(@RequestBody EmailRequest email) {
        return teacherService.getTeacherByEmail(email.getEmail());
    }
    @PostMapping("/updateteacher")
    public String updateTeacher(@RequestBody Teacher teacher) {
        return teacherService.updateTeacherAndFetchToken(teacher);
    }
    @PostMapping("/getalladviseerequest")
    public ArrayList<AdviseeRequest> getAllAdviseeRequest(@RequestBody EmailRequest emailRequest) {
        return teacherService.getAllAdviseeRequest(emailRequest);
    }
    @PostMapping("/getallcurrentadvisee")
    public ArrayList<AdvisorAssignment> getAllCurrentAdvisee(@RequestBody EmailRequest emailRequest) {
        return teacherService.getAllCurrentAdvisee(emailRequest);
    }
    @PostMapping("/acceptadvisorrequest")
    public String acceptAdvisorRequest(@RequestBody AdvisorAssignment advisorAssignment) {
        return teacherService.acceptAdvisor(advisorAssignment);
    }
    @PostMapping("/removeadvisorrequest")
    public String rejectAdvisorRequest(@RequestBody AdvisorAssignment advisorAssignment) {
        return teacherService.rejectAdvisor(advisorAssignment);
    }
}
