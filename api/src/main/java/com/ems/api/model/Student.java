package com.ems.api.model;

import jakarta.persistence.*;
@Entity
public class Student {

    @Id
    private String id;

    @OneToOne
    @JoinColumn(name = "student_user_id")
    private EMSUser emsUser;

    @ManyToOne
    @JoinColumn(name = "department_name", nullable = false)
    private Department department;

    @ManyToOne
    @JoinColumn(name = "advisor_id")
    private Teacher advisor;

    private String studentId;
    private int batchNo;

    // constructors, getters, setters, and other methods

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

    public Department getDepartment() {
        return department;
    }

    public void setDepartment(Department department) {
        this.department = department;
    }

    public Teacher getAdvisor() {
        return advisor;
    }

    public void setAdvisor(Teacher advisor) {
        this.advisor = advisor;
    }

    public String getStudentId() {
        return studentId;
    }

    public void setStudentId(String studentId) {
        this.studentId = studentId;
    }

    public int getBatchNo() {
        return batchNo;
    }

    public void setBatchNo(int batchNo) {
        this.batchNo = batchNo;
    }
}