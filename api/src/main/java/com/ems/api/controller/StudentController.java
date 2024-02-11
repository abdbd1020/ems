package com.ems.api.controller;

import com.ems.api.model.EMSUser;
import com.ems.api.service.StudentService;
import com.ems.api.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/student")
public class StudentController {
    @Autowired
    private StudentService studentService;
    @PostMapping("/requestAdvisor")
    public String signUp(@RequestBody String studentId,@RequestBody String advisorId) {

        return studentService.requestAdvisor(studentId, advisorId);
    }
}
