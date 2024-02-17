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
            return entityManager.find(Student.class, id);


    }
    @Transactional
    public String requestAdvisor(String studentId, String advisorId) {
        return "Request sent to advisor successfully!";

    }
    @Transactional
    public void createStudent(String studentId) {
        entityManager.createNativeQuery("INSERT INTO Student (student_id, batch_no) VALUES (:studentId, :batchNo)")
                .setParameter("studentId", studentId)
                .setParameter("batchNo", 0)
                .executeUpdate();
    }

    @Transactional
    public void updateStudent(Student student) {
        entityManager.merge(student);
    }
}
