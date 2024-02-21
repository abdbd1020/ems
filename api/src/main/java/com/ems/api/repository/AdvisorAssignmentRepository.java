package com.ems.api.repository;

import com.ems.api.model.AdvisorAssignment;
import com.ems.api.model.Student;
import com.ems.api.model.Teacher;
import jakarta.persistence.EntityManager;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;

@Repository
public class AdvisorAssignmentRepository {

    @Autowired
    private EntityManager entityManager;

    @Transactional
    public String saveAdvisorAssignment(AdvisorAssignment advisorAssignment) {
        entityManager.persist(advisorAssignment);
        return "Advisor Assignment Saved Successfully";
    }
    public ArrayList<AdvisorAssignment> getRequestedAdvisorAssignmentList(Student student) {
        return (ArrayList<AdvisorAssignment>) entityManager.createQuery("SELECT a FROM AdvisorAssignment a WHERE a.student = :student", AdvisorAssignment.class)
                .setParameter("student", student)
                .getResultList();

    }
    public ArrayList<AdvisorAssignment> getAdvisorAssignmentsByAdvisor(Teacher teacher) {
        return (ArrayList<AdvisorAssignment>) entityManager.createQuery("SELECT a FROM AdvisorAssignment a WHERE a.teacher = :teacher", AdvisorAssignment.class)
                .setParameter("teacher", teacher)
                .getResultList();
    }


    @Transactional
    public String acceptAdvisorAssignment(AdvisorAssignment advisorAssignment) {
        entityManager.merge(advisorAssignment);
        return "Advisor Assignment Accepted Successfully";

    }
    public AdvisorAssignment getAdvisorAssignmentsById(String id) {
        return entityManager.find(AdvisorAssignment.class, id);
    }
    @Transactional
    public String removeAdvisorAssignment(AdvisorAssignment currentAdvisorAssignment) {
        entityManager.remove(currentAdvisorAssignment);
        return "Advisor Assignment Removed Successfully";
    }
    public AdvisorAssignment getCurrentAdvisorOfSingleStudent(Student student) {
        try{
            return entityManager.createQuery("SELECT a FROM AdvisorAssignment a WHERE a.student = :student AND a.isAccepted = true", AdvisorAssignment.class)
                    .setParameter("student", student)
                    .getSingleResult();
        }
        catch (Exception e){
            return null;
        }

    }
    @Transactional
    public String removeAdvisorAssignmentById(String id) {
        entityManager.createQuery("DELETE FROM AdvisorAssignment a WHERE a.id = :id")
                .setParameter("id", id)
                .executeUpdate();
        return "Advisor Assignment Removed Successfully";
    }


    @Transactional
    public void deleteAdvisorAssignmentByAdvisor(Teacher teacher) {
        entityManager.createQuery("DELETE FROM AdvisorAssignment a WHERE a.teacher = :teacher")
                .setParameter("teacher", teacher)
                .executeUpdate();
    }
    @Transactional
    public void deleteAdvisorAssignmentByStudent(Student student) {
        entityManager.createQuery("DELETE FROM AdvisorAssignment a WHERE a.student = :student")
                .setParameter("student", student)
                .executeUpdate();
    }
    public Student getStudentFromAdvisorAssignment(AdvisorAssignment currentAdvisorAssignment) {
        return entityManager.find(Student.class, currentAdvisorAssignment.getStudent().getStudentId());
    }
}
