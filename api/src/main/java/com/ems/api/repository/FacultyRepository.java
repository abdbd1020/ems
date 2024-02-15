package com.ems.api.repository;

import com.ems.api.model.Faculty;
import jakarta.persistence.Entity;
import jakarta.persistence.EntityManager;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

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
}
