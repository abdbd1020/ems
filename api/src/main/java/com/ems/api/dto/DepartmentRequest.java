package com.ems.api.dto;

public class DepartmentRequest {

    private String id;
    private String name;
    private String description;
    private String facultyId;

    public String getName() {
        return name;
    }

    public String getDescription() {
        return description;
    }

    public String getFacultyId() {
        return facultyId;

    }

    public String getId() {
        return id;
    }
}
