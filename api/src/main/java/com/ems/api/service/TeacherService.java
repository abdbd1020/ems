package com.ems.api.service;

import com.ems.api.model.EMSUser;
import com.ems.api.model.Faculty;
import com.ems.api.model.Teacher;
import com.ems.api.repository.FacultyRepository;
import com.ems.api.repository.StudentRepository;
import com.ems.api.repository.TeacherRepository;
import com.ems.api.repository.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class TeacherService {
    @Autowired
    private TeacherRepository teacherRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private JwtService jwtService;
    @Autowired
    private FacultyRepository facultyRepository;
    @Transactional
    public String acceptAdvisor(String studentId, String advisorId) {

            return teacherRepository.acceptAdvisor(studentId, advisorId);

    }
    @Transactional
    public Teacher getTeacherByEmail(String email) {
        EMSUser user = userRepository.findByEmail(email);
        Teacher teacher = teacherRepository.getTeacherById(user.getId());
        teacher.setEmsUser(user);
        return teacher;
    }


    @Transactional
    public String updateTeacherAndFetchToken(Teacher teacher) {
        EMSUser user = userRepository.getUserByEmail(teacher.getEmsUser().getEmail());
        user.setEmail(teacher.getEmsUser().getEmail());
        user.setName(teacher.getEmsUser().getName());
        user.setPhone(teacher.getEmsUser().getPhone());
        teacher.setId(user.getId());
        teacher.setEmsUser(user);
        teacherRepository.updateTeacher(teacher);
        return jwtService.generateToken(teacher.getEmsUser().getEmail());

    }
}
