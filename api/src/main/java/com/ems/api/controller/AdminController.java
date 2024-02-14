package com.ems.api.controller;

import com.ems.api.dto.AuthRequest;
import com.ems.api.model.EMSUser;
import com.ems.api.service.AdminService;
import com.ems.api.service.JwtService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
@CrossOrigin(origins = "http://localhost:3000")

@RestController
@RequestMapping("/admin")
public class AdminController {
    @Autowired

    private AuthenticationManager authenticationManager;

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

    @PostMapping("/authenticate")
    public String AuthenticateAndGetToken(@RequestBody AuthRequest authRequest) {
        Authentication authentication =  authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(authRequest.getName(), authRequest.getPassword()));

        if (authentication.isAuthenticated()) {
                    return jwtService.generateToken(authRequest.getName());
                }
        else{
            throw new UsernameNotFoundException("Invalid username or password");
        }

    }
}
