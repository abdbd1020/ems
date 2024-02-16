package com.ems.api.repository;

import com.ems.api.model.Student;
import jakarta.persistence.EntityManager;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository

public class StudentRepository {
   @Autowired
    private EntityManager entityManager;

   @Transactional
    public Student getStudentById(String id) {
        try{
            return entityManager.find(Student.class, id);
        }
        catch (Exception e){
            return null;
        }

    }
    @Transactional
    public String requestAdvisor(String studentId, String advisorId) {
        return "Request sent to advisor successfully!";

    }
    @Transactional
    public void createStudent(String id) {

        entityManager.createQuery("INSERT INTO Student (id) VALUES (:id)")
                .setParameter("id", id)
                .executeUpdate();
    }
}
