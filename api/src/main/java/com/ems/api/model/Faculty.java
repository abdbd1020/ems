package com.ems.api.model;

import jakarta.persistence.*;

@Entity

public class Faculty {


    @jakarta.persistence.Id
    @GeneratedValue(strategy = GenerationType.UUID)
    String Id;
    @Column(unique = true)
    String name;
    private String description;

    public String getId() {
        return Id;
    }

    public void setId(String id) {
        Id = id;
    }

    public Faculty(String name, String description) {
        this.name = name;
        this.description = description;
    }

    public Faculty() {
    }

    public String getName() {
        return name;
    }

    public String getDescription() {
        return description;
    }
}
