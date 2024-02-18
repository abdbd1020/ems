package com.ems.api.dto;

import com.ems.api.model.Role;

public class LoginResponse {
    private String token;
    private Role role;


    public void setToken(String token) {
        this.token = token;
    }

    public void setRole(Role role) {
        this.role = role;
    }

    public String getToken() {
        return token;
    }

    public Role getRole() {
        return role;
    }
}
