package com.ems.api.repository;

import org.springframework.stereotype.Repository;

@Repository
public class TeacherRepository {
    public String acceptAdvisor(String studentId, String advisorId) {
        return "Advisor accepted successfully!";
    }
}
