package com.ems.api.controller;

import com.ems.api.config.SecurityConfig;
import com.ems.api.dto.DepartmentRequest;
import com.ems.api.model.Department;
import com.ems.api.model.EMSUser;
import com.ems.api.model.Faculty;
import com.ems.api.model.Role;
import com.ems.api.service.AdminService;
import com.ems.api.service.JwtService;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.web.bind.annotation.*;
import org.springframework.web.reactive.function.client.WebClient;

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



    @GetMapping("/get_all_users")
    public ArrayList<EMSUser> getAllUsers() {
        return adminService.getAllUsers();
    }
    @PostMapping("/update_user")
    public String updateUser(@RequestBody EMSUser user) {
        return adminService.updateUserAsAdmin(user);
    }
    @GetMapping("/get_all_inactive_users")
    public ArrayList<EMSUser> getInactiveUsers() {
        return adminService.getInactiveUsers();
    }
    @GetMapping("/get_all_inactive_and_guest_users")
    public ArrayList<EMSUser> getAllInActiveAndGuestUsers() {
        return adminService.getAllInActiveAndGuestUsers();
    }
    @GetMapping("/get_all_students")
    public ArrayList<EMSUser> getAllStudents() {
        return adminService.getAllUsersByRole(Role.STUDENT);
    }
    @GetMapping("/get_all_teachers")
    public ArrayList<EMSUser> getAllTeachers() {
        return adminService.getAllUsersByRole(Role.TEACHER);
    }

    @GetMapping("/get_all_departments")
    public ArrayList<Department> getAllDepartments() {
        return adminService.getAllDepartments();
    }
    @GetMapping("/get_all_faculty")
    public ArrayList<Faculty> getAllFaculty() {
          return adminService.getAllFaculty();

    }
    @PostMapping("/add_faculty")
    public String addFaculty(@RequestBody Faculty faculty) {

        return adminService.addFaculty(faculty);
    }
    @PostMapping("/update_faculty")
    public String updateFaculty(@RequestBody Faculty faculty) {
        return adminService.updateFaculty(faculty);
    }
    @PostMapping("/add_department")
    public String addDepartment(@RequestBody DepartmentRequest departmentRequest){

        return adminService.addDepartment(departmentRequest);
    }
    @PostMapping("/update_department")
    public String updateDepartment(@RequestBody DepartmentRequest departmentRequest){
        return adminService.updateDepartment(departmentRequest);
    }

}
