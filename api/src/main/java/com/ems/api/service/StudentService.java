package com.ems.api.service;

import com.ems.api.model.EMSUser;
import com.ems.api.model.Role;
import com.ems.api.model.Status;
import com.ems.api.repository.StudentRepository;
import com.ems.api.repository.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class StudentService {
    @Autowired
    private StudentRepository studentRepository;
    @Transactional
    public String requestAdvisor(String studentId, String advisorId) {

        return studentRepository.requestAdvisor(studentId, advisorId);

    }
}
