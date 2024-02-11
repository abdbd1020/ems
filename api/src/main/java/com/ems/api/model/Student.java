package com.ems.api.model;


import jakarta.persistence.*;

@Entity
public class Student {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private String studentId;

    private String id;

    @OneToOne
    @MapsId
    @JoinColumn(name = "user_id")
    private EMSUser user;

    private String departmentName;

    @ManyToOne
    @JoinColumn(name = "advisor_id")
    private EMSUser advisor;

    private String batchNo;


    public String getStudentId() {
        return studentId;
    }

    public void setStudentId(String studentId) {
        this.studentId = studentId;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public EMSUser getUser() {
        return user;
    }

    public void setUser(EMSUser user) {
        this.user = user;
    }

    public String getDepartmentName() {
        return departmentName;
    }

    public void setDepartmentName(String departmentName) {
        this.departmentName = departmentName;
    }

    public EMSUser getAdvisor() {
        return advisor;
    }

    public void setAdvisor(EMSUser advisor) {
        this.advisor = advisor;
    }

    public String getBatchNo() {
        return batchNo;
    }

    public void setBatchNo(String batchNo) {
        this.batchNo = batchNo;
    }
}
