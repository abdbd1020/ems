package com.ems.api.dto;

public class AdviseeRequest {
    private Long Id;
    private String adviseeName;
    private String adviseeDepartment;
    private int adviseeBatchNo;

    public Long getId() {
        return Id;
    }

    public void setId(Long id) {
        Id = id;
    }

    public String getAdviseeName() {
        return adviseeName;
    }

    public void setAdviseeName(String adviseeName) {
        this.adviseeName = adviseeName;
    }

    public String getAdviseeDepartment() {
        return adviseeDepartment;
    }

    public void setAdviseeDepartment(String adviseeDepartment) {
        this.adviseeDepartment = adviseeDepartment;
    }

    public int getAdviseeBatchNo() {
        return adviseeBatchNo;
    }

    public void setAdviseeBatchNo(int adviseeBatchNo) {
        this.adviseeBatchNo = adviseeBatchNo;
    }
}
