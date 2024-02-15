package com.ems.api.model;

import jakarta.persistence.*;

@Entity
@PrimaryKeyJoinColumn(name = "StudentUserId")

public class Student extends EMSUser {

    @ManyToOne
    @JoinColumn(name = "department_name", nullable = false)
    private Department department;

    @ManyToOne
    @JoinColumn(name = "advisor_id")
    private Teacher advisor;

    private String studentId;
    private int batchNo;

    // Getter and setter methods for department, advisor, studentId, and batchNo

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
