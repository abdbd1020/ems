package com.ems.api.repository;

import com.ems.api.model.Teacher;
import jakarta.persistence.EntityManager;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;

@Repository
public class TeacherRepository {

    @Autowired
    private EntityManager entityManager;
    public String acceptAdvisor(String studentId, String advisorId) {
        return "Advisor accepted successfully!";
    }
    @Transactional
    public Teacher getTeacherById(String id) {

            return entityManager.find(Teacher.class, id);



    }
    @Transactional
    public void createTeacher(String id) {

            entityManager.createQuery("INSERT INTO Teacher (id) VALUES (:id)")
                    .setParameter("id", id)
                    .executeUpdate();


    }

    @Transactional
    public void updateTeacher(Teacher teacher) {


        entityManager.merge(teacher);
    }
    @Transactional
    public ArrayList<Teacher> getAllTeachers() {
        return (ArrayList<Teacher>) entityManager.createQuery("SELECT t FROM Teacher t", Teacher.class).getResultList();
    }
    @Transactional
    public void deleteTeacher(String id) {
        entityManager.createQuery("DELETE FROM Teacher t WHERE t.id = :id")
                .setParameter("id", id)
                .executeUpdate();
    }
}
