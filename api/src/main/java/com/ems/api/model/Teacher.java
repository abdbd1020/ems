package com.ems.api.model;

import jakarta.persistence.*;

@Entity
public class Teacher {

    @Id
    private String id;

    @OneToOne
    @JoinColumn(name = "teacher_user_id")
    private EMSUser emsUser;

    @ManyToOne
    @JoinColumn(name = "faculty_id")
    private Faculty faculty;

    private String designation;


    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public EMSUser getEmsUser() {
        return emsUser;
    }

    public void setEmsUser(EMSUser emsUser) {
        this.emsUser = emsUser;
    }

    public Faculty getFaculty() {
        return faculty;
    }

    public void setFaculty(Faculty faculty) {
        this.faculty = faculty;
    }

    public String getDesignation() {
        return designation;
    }

    public void setDesignation(String designation) {
        this.designation = designation;
    }
}
