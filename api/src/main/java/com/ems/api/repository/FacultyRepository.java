package com.ems.api.repository;

import com.ems.api.model.Faculty;
import jakarta.persistence.Entity;
import jakarta.persistence.EntityManager;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;

@Repository

public class FacultyRepository {
    @Autowired
    private EntityManager entityManager;
    @Transactional
    public Faculty getFacultyById(String id) {
        return entityManager.createQuery("SELECT f FROM Faculty f WHERE f.id = :id", Faculty.class)
                .setParameter("id", id)
                .getSingleResult();
    }

    @Transactional
    public ArrayList<Faculty> getAllFaculty() {
        return (ArrayList<Faculty>) entityManager.createQuery("SELECT f FROM Faculty f", Faculty.class).getResultList();
    }

    @Transactional
    public void saveFaculty(Faculty faculty) {

        entityManager.createQuery("INSERT INTO Faculty (name, description) VALUES (:name, :description)")
                .setParameter("name", faculty.getName())
                .setParameter("description", faculty.getDescription())
                .executeUpdate();
    }
    @Transactional
    public String updateFaculty(Faculty faculty) {
        entityManager.createQuery("UPDATE Faculty f SET f.name = :name, f.description = :description WHERE f.id = :id")
                .setParameter("name", faculty.getName())
                .setParameter("description", faculty.getDescription())
                .setParameter("id", faculty.getId())
                .executeUpdate();
        return "Faculty Updated Successfully";
    }
}
