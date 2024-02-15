package com.ems.api.model;

import jakarta.persistence.*;

@Entity
@PrimaryKeyJoinColumn(name = "TeacherUserId")

public class Teacher extends EMSUser {

    @ManyToOne
    @JoinColumn(name = "faculty_name", nullable = false)
    private Faculty faculty;

    private String designation;

    // Getter and setter methods for faculty and designation

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