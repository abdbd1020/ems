package com.ems.api.repository;

import org.springframework.stereotype.Repository;

@Repository

public class StudentRepository {
    public String requestAdvisor(String studentId, String advisorId) {
        return "Request sent to advisor successfully!";

    }
}
