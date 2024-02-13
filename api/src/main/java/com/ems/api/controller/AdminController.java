package com.ems.api.controller;

import com.ems.api.model.EMSUser;
import com.ems.api.service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
@CrossOrigin(origins = "http://localhost:3000")

@RestController
@RequestMapping("/admin")
public class AdminController {

    @Autowired
    private AdminService adminService;
    @GetMapping("/getallusers")
    public ArrayList<EMSUser> getAllUsers() {
        return adminService.getAllUsers();
    }
    @PostMapping("/updateuser")
    public String updateUser(@RequestBody EMSUser user) {


        return adminService.updateUser(user);
    }
}
