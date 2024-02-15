package com.ems.api.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;

@Entity

public class Faculty {


    @jakarta.persistence.Id
    @GeneratedValue(strategy = GenerationType.UUID)
    String Id;
    @NotNull
    @Column(unique = true)
    String name;
    @NotNull
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
