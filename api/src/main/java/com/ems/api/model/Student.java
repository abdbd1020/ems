package com.ems.api.model;

import jakarta.persistence.*;
@Entity
public class Student {

    @Id
    private String studentId;

    @OneToOne
    @JoinColumn(name = "student_user_id")
    private EMSUser emsUser;

    @ManyToOne
    @JoinColumn(name = "department_name", nullable = true)
    private Department department;

    private int batchNo;

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