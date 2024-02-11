package com.ems.api.model;

import jakarta.persistence.*;

@Entity
public class Teacher {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    private String facultyName;
    private String designation;

    @OneToOne
    @MapsId
    @JoinColumn(name = "user_id")
    private EMSUser user;


    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getFacultyName() {
        return facultyName;
    }

    public void setFacultyName(String facultyName) {
        this.facultyName = facultyName;
    }

    public String getDesignation() {
        return designation;
    }

    public void setDesignation(String designation) {
        this.designation = designation;
    }

    public EMSUser getUser() {
        return user;
    }

    public void setUser(EMSUser user) {
        this.user = user;
    }
}
