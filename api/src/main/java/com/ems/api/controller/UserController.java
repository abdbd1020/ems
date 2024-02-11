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

    @GetMapping("/login")
    public String logIn(@RequestBody EMSUser user) {
        return userService.logInAndFetchToken(user);
    }

    @PostMapping("/updateuser")
    public String updateUser(@RequestBody EMSUser user) {
        return userService.updateUser(user);
    }
}
