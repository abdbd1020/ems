package com.ems.api.repository;

import com.ems.api.model.Faculty;
import com.ems.api.model.Teacher;
import jakarta.persistence.EntityManager;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class TeacherRepository {

    @Autowired
    private EntityManager entityManager;
    public String acceptAdvisor(String studentId, String advisorId) {
        return "Advisor accepted successfully!";
    }
    @Transactional
    public Teacher getTeacherById(String id) {
        try{
            return entityManager.find(Teacher.class, id);
        }
        catch (Exception e){
            return null;
        }


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
}
