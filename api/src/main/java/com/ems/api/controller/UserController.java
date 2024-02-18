package com.ems.api.controller;

import com.ems.api.dto.LoginRequest;
import com.ems.api.dto.LoginResponse;
import com.ems.api.dto.ResetPasswordRequest;
import com.ems.api.service.UserService;
import com.ems.api.model.EMSUser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:3000")

@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/signup")
    public String signUp(@RequestBody EMSUser user) {

        return userService.createUserAndFetchToken(user);
    }

    @GetMapping("/test")
    public String test() {

        return "Working";
    }


    @PostMapping("/login")
    public LoginResponse logIn(@RequestBody LoginRequest loginRequest) {
        return userService.logInAndFetchToken(loginRequest);
    }


    @PostMapping("/reset_password")
    public String resetPassword(@RequestBody ResetPasswordRequest resetPasswordRequest) {
        return userService.resetPassword(resetPasswordRequest);
    }
}
