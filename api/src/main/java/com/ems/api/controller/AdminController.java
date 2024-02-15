package com.ems.api.controller;

import com.ems.api.config.SecurityConfig;
import com.ems.api.model.Department;
import com.ems.api.model.EMSUser;
import com.ems.api.model.Faculty;
import com.ems.api.model.Role;
import com.ems.api.service.AdminService;
import com.ems.api.service.JwtService;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/admin")
public class AdminController {


    @Autowired
    SecurityConfig securityConfig;

    @Autowired
    private AdminService adminService;
    @Autowired
    private JwtService jwtService;
    @GetMapping("/getallusers")
    public ArrayList<EMSUser> getAllUsers() {
        return adminService.getAllUsers();
    }
    @PostMapping("/updateuser")
    public String updateUser(@RequestBody EMSUser user) {

        return adminService.updateUser(user);
    }
    @GetMapping("/getallinactiveusers")
    public ArrayList<EMSUser> getInactiveUsers() {
        return adminService.getInactiveUsers();
    }
    @GetMapping("/getallstudents")
    public ArrayList<EMSUser> getAllStudents() {
        return adminService.getAllUsersByRole(Role.STUDENT);
    }
    @GetMapping("/getallteachers")
    public ArrayList<EMSUser> getAllTeachers() {
        return adminService.getAllUsersByRole(Role.TEACHER);
    }

    @GetMapping("/getalldepartments")
    public ArrayList<Department> getAllDepartments() {
        return adminService.getAllDepartments();
    }
    @GetMapping("/getallfaculty")
    public ArrayList<Faculty> getAllFaculty() {
          return adminService.getAllFaculty();

    }
    @PostMapping("/addfaculty")
    public String addFaculty(@RequestBody Faculty faculty) {
        System.out.println(faculty.getName());
        System.out.println(faculty.getDescription());
        return adminService.addFaculty(faculty);
    }
    @PostMapping("/updatefaculty")
    public String updateFaculty(@RequestBody Faculty faculty) {
        return adminService.updateFaculty(faculty);
    }

}
