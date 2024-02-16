package com.ems.api.controller;

import com.ems.api.dto.EmailRequest;
import com.ems.api.model.Teacher;
import com.ems.api.service.StudentService;
import com.ems.api.service.TeacherService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/teacher")
public class TeacherController {
    @Autowired
    private TeacherService teacherService;
    @PostMapping("/acceptadvisor")
    public String signUp(@RequestBody String studentId, @RequestBody String advisorId) {

        return teacherService.acceptAdvisor(studentId, advisorId);
    }
    @PostMapping("/getteacherbyemail")
    public Teacher getTeacherById(@RequestBody EmailRequest email) {
        return teacherService.getTeacherByEmail(email.getEmail());
    }
    @PostMapping("/updateteacher")
    public String updateTeacher(@RequestBody Teacher teacher) {
        return teacherService.updateTeacherAndFetchToken(teacher);
    }
}
