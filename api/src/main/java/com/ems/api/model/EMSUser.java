package com.ems.api.model;

import jakarta.persistence.*;
import org.springframework.web.bind.annotation.RequestBody;

@Entity
public class EMSUser {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)

    private String id;
    @Enumerated(EnumType.STRING)
    private Role role;
    private String name;
    @Column(unique = true)

    private String email;
    private String password;
    private String phone;
    @Enumerated(EnumType.STRING)
    private Status status;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public Status getStatus() {
        return status;
    }

    public void setStatus(Status status) {
        this.status = status;
    }
}
