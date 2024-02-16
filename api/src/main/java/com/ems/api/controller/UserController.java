package com.ems.api.controller;

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
    public String logIn(@RequestBody EMSUser user) {
        return userService.logInAndFetchToken(user);
    }

//    @GetMapping("/getuserbyid")
//    public EMSUser getUserById(@RequestParam String id) {
//        return userService.getUserById(id);
//    }
}
