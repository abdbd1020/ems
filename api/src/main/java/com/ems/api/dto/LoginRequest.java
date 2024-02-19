package com.ems.api.dto;

public class LoginRequest {
    private String email;
    private String password;


    private String googleToken;

    public String getEmail() {
        return this.email;
    }

    public String getPassword() {
        return this.password;
    }

    public String getGoogleToken() {
        return googleToken;
    }




}
