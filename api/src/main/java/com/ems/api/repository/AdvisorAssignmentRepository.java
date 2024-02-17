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

    public String saveAdvisorAssignment(AdvisorAssignment advisorAssignment) {
        entityManager.persist(advisorAssignment);
        return "Advisor Assignment Saved Successfully";
    }
    @Transactional
    public ArrayList<AdvisorAssignment> getRequestedAdvisorAssignmentList(Student student) {
        return (ArrayList<AdvisorAssignment>) entityManager.createQuery("SELECT a FROM AdvisorAssignment a WHERE a.student = :student", AdvisorAssignment.class)
                .setParameter("student", student)
                .getResultList();

    }
    @Transactional
    public ArrayList<AdvisorAssignment> getAdvisorAssignmentsByAdvisor(Teacher teacher) {
        return (ArrayList<AdvisorAssignment>) entityManager.createQuery("SELECT a FROM AdvisorAssignment a WHERE a.teacher = :teacher", AdvisorAssignment.class)
                .setParameter("teacher", teacher)
                .getResultList();
    }



    public String acceptAdvisorAssignment(AdvisorAssignment advisorAssignment) {
        entityManager.merge(advisorAssignment);
        return "Advisor Assignment Accepted Successfully";

    }

    public AdvisorAssignment getAdvisorAssignmentsById(Long id) {
        return entityManager.find(AdvisorAssignment.class, id);
    }

    public String removeAdvisorAssignment(AdvisorAssignment currentAdvisorAssignment) {
        entityManager.remove(currentAdvisorAssignment);
        return "Advisor Assignment Removed Successfully";
    }
}
