package com.ems.api.service;

import com.ems.api.controller.AdminController;
import com.ems.api.dto.AdvisorAssignmentResponse;
import com.ems.api.dto.AdvisorRequest;
import com.ems.api.dto.EmailRequest;
import com.ems.api.model.*;
import com.ems.api.repository.*;
import jakarta.persistence.EntityManager;
import jakarta.transaction.Transactional;
import org.jetbrains.annotations.NotNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
public class StudentService {
    @Autowired
    private StudentRepository studentRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private TeacherRepository teacherRepository;
    @Autowired
    private FacultyRepository facultyRepository;
    @Autowired
    private AdvisorAssignmentRepository advisorAssignmentRepository;
    @Autowired
    private EntityManager entityManager;

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
    public String updateStudentAndFetchToken(@NotNull Student student) {
        EMSUser user = userRepository.getUserByEmail(student.getEmsUser().getEmail());
        user.setEmail(student.getEmsUser().getEmail());
        user.setName(student.getEmsUser().getName());
        user.setPhone(student.getEmsUser().getPhone());
        student.setStudentId(user.getId());
        student.setEmsUser(user);
        studentRepository.updateStudent(student);
        return "Token";
    }
    @Transactional
    public ArrayList<Teacher> getAllAdvisors() {
        ArrayList<Teacher> teachers = teacherRepository.getAllTeachers();
        for (Teacher teacher : teachers) {
              EMSUser user = userRepository.findByEmail(teacher.getEmsUser().getEmail());
              if(user!=null&&user.getRole().equals(Role.TEACHER)&&user.getStatus().equals(Status.ACTIVE)){
                  teacher.setEmsUser(user);
              }
              else {
                  teachers.remove(teacher);
              }
              Faculty faculty = facultyRepository.getFacultyById(teacher.getFaculty().getId());
              if(faculty!=null){
                  teacher.setFaculty(faculty);
              }
              else {
                  teachers.remove(teacher);
              }
            entityManager.detach(teacher.getEmsUser());

              teacher.getEmsUser().setPassword("");
              teacher.getEmsUser().setRole(null);
              teacher.getEmsUser().setStatus(null);
              teacher.getEmsUser().setPhone("");
              teacher.getEmsUser().setEmail("");

        }
        return teachers;


    }
    @Transactional
    public String sendAdvisorRequest(@NotNull AdvisorRequest advisorRequest) {
        String studentId = userRepository.findByEmail(advisorRequest.getEmail()).getId();
        Student student = studentRepository.getStudentById(studentId);
        Teacher teacher = teacherRepository.getTeacherById(advisorRequest.getId());
        AdvisorAssignment advisorAssignment = new AdvisorAssignment();
        advisorAssignment.setStudent(student);
        advisorAssignment.setTeacher(teacher);
        advisorAssignment.setAccepted(false);
        return advisorAssignmentRepository.saveAdvisorAssignment(advisorAssignment);



    }
    @Transactional
    public ArrayList<AdvisorAssignmentResponse> requestedAdvisorAssignmentList(@NotNull EmailRequest emailRequest) {
        String studentId = userRepository.findByEmail(emailRequest.getEmail()).getId();
        Student student = studentRepository.getStudentById(studentId);
        ArrayList<AdvisorAssignment> advisorAssignments  = advisorAssignmentRepository.getRequestedAdvisorAssignmentList(student);
        ArrayList<AdvisorAssignmentResponse> advisorAssignmentResponses = new ArrayList<>();

        for(AdvisorAssignment advisorAssignment : advisorAssignments) {
            if(advisorAssignment.getTeacher().getEmsUser().getStatus().equals(Status.INACTIVE)) {
                continue;
            }
            AdvisorAssignmentResponse advisorAssignmentResponse = new AdvisorAssignmentResponse();
            advisorAssignmentResponse.setTeacherId(advisorAssignment.getTeacher().getId());
            advisorAssignmentResponse.setId(advisorAssignment.getId());
            advisorAssignmentResponse.setAccepted(advisorAssignment.isAccepted());
            advisorAssignmentResponses.add(advisorAssignmentResponse);
        }

        return advisorAssignmentResponses;


    }
    @Transactional
    public Teacher getCurrentAdvisor(@NotNull EmailRequest emailRequest) {
        String studentId = userRepository.findByEmail(emailRequest.getEmail()).getId();
        Student student = studentRepository.getStudentById(studentId);
        AdvisorAssignment advisorAssignment = advisorAssignmentRepository.getCurrentAdvisorOfSingleStudent(student);
        if(advisorAssignment==null) {
            return null;
        }
        if(advisorAssignment.getTeacher().getEmsUser().getStatus().equals(Status.INACTIVE)) {
            return null;
        }
        Teacher teacher = advisorAssignment.getTeacher();
        entityManager.detach(teacher.getEmsUser());
        teacher.getEmsUser().setPassword("");
        System.out.println(teacher.getEmsUser().getPassword());
        System.out.println(teacher.getEmsUser().getEmail());
        System.out.println(teacher.getEmsUser().getRole());
        return teacher;

    }
    @Transactional
    public String removeAdvisor(@NotNull EmailRequest emailRequest) {
        String studentId = userRepository.findByEmail(emailRequest.getEmail()).getId();
        Student student = studentRepository.getStudentById(studentId);
        AdvisorAssignment advisorAssignment = advisorAssignmentRepository.getCurrentAdvisorOfSingleStudent(student);
        return advisorAssignmentRepository.removeAdvisorAssignment(advisorAssignment);
    }
}
