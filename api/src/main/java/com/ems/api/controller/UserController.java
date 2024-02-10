package com.ems.api.controller;

import com.ems.api.Service.UserService;
import com.ems.api.model.EMSUser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/user")
public class UserController {
    @Autowired
    private UserService userService;
    @PostMapping("/signup")
    public String signUp(@RequestBody EMSUser user) {

        return userService.createUserAndFetchToken(user);
    }
}
