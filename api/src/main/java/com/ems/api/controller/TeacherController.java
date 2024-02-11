package com.ems.api.controller;

import com.ems.api.service.StudentService;
import com.ems.api.service.TeacherService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/teacher")
public class TeacherController {
    @Autowired
    private TeacherService teacherService;
    @PostMapping("/acceptadvisor")
    public String signUp(@RequestBody String studentId, @RequestBody String advisorId) {

        return teacherService.acceptAdvisor(studentId, advisorId);
    }
}
