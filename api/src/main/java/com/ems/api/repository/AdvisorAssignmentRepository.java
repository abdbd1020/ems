package com.ems.api.repository;

import com.ems.api.model.AdvisorAssignment;
import com.ems.api.model.Student;
import jakarta.persistence.EntityManager;
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

    public ArrayList<AdvisorAssignment> getRequestedAdvisorAssignmentList(Student student) {
        System.out.println("Student: " + student.getStudentId());
        return (ArrayList<AdvisorAssignment>) entityManager.createQuery("SELECT a FROM AdvisorAssignment a WHERE a.student = :student", AdvisorAssignment.class)
                .setParameter("student", student)
                .getResultList();

    }
}
