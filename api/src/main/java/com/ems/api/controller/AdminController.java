package com.ems.api.controller;

import com.ems.api.model.EMSUser;
import com.ems.api.service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;

@RestController
@RequestMapping("/user")
public class AdminController {

    @Autowired
    private AdminService adminService;
    @GetMapping("/getallusers")
    public ArrayList<EMSUser> getAllUsers() {
        return adminService.getAllUsers();
    }

}
