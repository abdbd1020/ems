package com.ems.api.model;

public enum Role {

    ADMIN(1,"THE MOST POWERFUL GUY"),TEACHER(2, "NOT SO GOOD GUY"),STUDENT(3,"THE DUMB ONE"),GUEST(0,"THE UNWANTED");

    private long id;
    private String description;
    Role (long id, String description){
        this.id = id;
        this.description = description;
    }


    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
