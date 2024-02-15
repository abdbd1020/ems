package com.ems.api.model;

import jakarta.persistence.*;

@Entity
public class Department {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    String Id;
    @Column(unique = true)
    String name;
    String description;
    @ManyToOne
    @JoinColumn(name = "faculty_name", nullable = false)
    private Faculty faculty;

    public String getId() {
        return Id;
    }

    public void setId(String id) {
        Id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
