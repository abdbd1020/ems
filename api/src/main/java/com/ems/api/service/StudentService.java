package com.ems.api.service;

import com.ems.api.model.*;
import com.ems.api.repository.StudentRepository;
import com.ems.api.repository.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class StudentService {
    @Autowired
    private StudentRepository studentRepository;
    @Autowired
    private UserRepository userRepository;
    @Transactional
    public String requestAdvisor(String studentId, String advisorId) {

        return studentRepository.requestAdvisor(studentId, advisorId);

    }
    @Transactional
    public Student getStudentByEmail(String email) {
        EMSUser user = userRepository.findByEmail(email);
        Student student = studentRepository.getStudentById(user.getId());
        student.setEmsUser(user);
        return student;
    }
    @Transactional
    public String updateStudentAndFetchToken(Student student) {
        EMSUser user = userRepository.getUserByEmail(student.getEmsUser().getEmail());
        user.setEmail(student.getEmsUser().getEmail());
        user.setName(student.getEmsUser().getName());
        user.setPhone(student.getEmsUser().getPhone());
        student.setStudentId(user.getId());
        student.setEmsUser(user);
        studentRepository.updateStudent(student);
        return "Token";
    }
}
