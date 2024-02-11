package com.ems.api.service;

import com.ems.api.repository.StudentRepository;
import com.ems.api.repository.TeacherRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class TeacherService {
    @Autowired
    private TeacherRepository teacherRepository;
    @Transactional
    public String acceptAdvisor(String studentId, String advisorId) {

            return teacherRepository.acceptAdvisor(studentId, advisorId);

    }
}
