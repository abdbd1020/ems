package com.ems.api.service;

import com.ems.api.dto.AdviseeRequest;
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
public class TeacherService {
    @Autowired
    private EntityManager entityManager;
    @Autowired
    private TeacherRepository teacherRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private JwtService jwtService;
    @Autowired
    private FacultyRepository facultyRepository;
    @Autowired
    private AdvisorAssignmentRepository advisorAssignmentRepository;
    @Autowired
    private StudentRepository studentRepository;
    @Transactional
    public String acceptAdvisorRequest(@NotNull AdvisorAssignment advisorAssignment) {
        AdvisorAssignment currentAdvisorAssignment = advisorAssignmentRepository.getAdvisorAssignmentsById(advisorAssignment.getId());
        Student student = advisorAssignmentRepository.getStudentFromAdvisorAssignment(currentAdvisorAssignment);
        ArrayList<AdvisorAssignment> advisorAssignments = advisorAssignmentRepository.getRequestedAdvisorAssignmentList(student);
        for (AdvisorAssignment assignment : advisorAssignments) {
            if (!assignment.getId().equals(currentAdvisorAssignment.getId())) {
                advisorAssignmentRepository.removeAdvisorAssignment(assignment);
            }
        }
        currentAdvisorAssignment.setAccepted(true);
        return advisorAssignmentRepository.acceptAdvisorAssignment(currentAdvisorAssignment);
    }
    public Teacher getTeacherByEmail(String email) {
        EMSUser user = userRepository.findByEmail(email);
        Teacher teacher = teacherRepository.getTeacherById(user.getId());
        teacher.setEmsUser(user);
        return teacher;
    }


    @Transactional
    public String updateTeacherAndFetchToken(@NotNull Teacher teacher) {
        EMSUser user = userRepository.getUserByEmail(teacher.getEmsUser().getEmail());
        user.setName(teacher.getEmsUser().getName());
        user.setPhone(teacher.getEmsUser().getPhone());
        teacher.setId(user.getId());
        teacher.setEmsUser(user);
        teacherRepository.updateTeacher(teacher);
        return jwtService.generateToken(teacher.getEmsUser().getEmail());

    }
    public ArrayList<AdviseeRequest> getAllAdviseeRequest(@NotNull EmailRequest emailRequest) {
        Teacher teacher = getTeacherByEmail(emailRequest.getEmail());
        ArrayList<AdvisorAssignment> advisorAssignments = advisorAssignmentRepository.getAdvisorAssignmentsByAdvisor(teacher);
        ArrayList<AdviseeRequest> adviseeRequests = new ArrayList<>();
        for (AdvisorAssignment advisorAssignment : advisorAssignments) {
            if(advisorAssignment.getStudent().getEmsUser().getStatus().equals(Status.INACTIVE) ||advisorAssignment.isAccepted()||advisorAssignment.getStudent().getDepartment()==null) {
                continue;
            }

            AdviseeRequest adviseeRequest = new AdviseeRequest();
            adviseeRequest.setId(advisorAssignment.getId());
            adviseeRequest.setAdviseeName(advisorAssignment.getStudent().getEmsUser().getName());
            adviseeRequest.setAdviseeDepartment(advisorAssignment.getStudent().getDepartment().getName());
            adviseeRequest.setAdviseeBatchNo(advisorAssignment.getStudent().getBatchNo());
            adviseeRequests.add(adviseeRequest);
        }
        return adviseeRequests;

    }
    public ArrayList<AdvisorAssignment> getAllCurrentAdvisee(EmailRequest emailRequest) {
        Teacher teacher = getTeacherByEmail(emailRequest.getEmail());
        ArrayList<AdvisorAssignment> advisorAssignments = advisorAssignmentRepository.getAdvisorAssignmentsByAdvisor(teacher);
        ArrayList<AdvisorAssignment> finalAdvisorAssignments = new ArrayList<>();
        for (AdvisorAssignment advisorAssignment : advisorAssignments) {
            if(advisorAssignment.getStudent().getEmsUser().getStatus().equals(Status.INACTIVE) || !advisorAssignment.isAccepted()) {
                continue;
            }
            entityManager.detach(advisorAssignment);
            entityManager.detach(advisorAssignment.getStudent().getEmsUser());
            entityManager.detach(advisorAssignment.getTeacher().getEmsUser());
            entityManager.detach(advisorAssignment.getTeacher());

            advisorAssignment.getStudent().getEmsUser().setPassword("");
            advisorAssignment.setTeacher(null);

            finalAdvisorAssignments.add(advisorAssignment);
        }
        return finalAdvisorAssignments;

    }
    @Transactional
    public String rejectAdvisor(@NotNull AdvisorAssignment advisorAssignment) {
        AdvisorAssignment currentAdvisorAssignment = advisorAssignmentRepository.getAdvisorAssignmentsById(advisorAssignment.getId());
        return advisorAssignmentRepository.removeAdvisorAssignment(currentAdvisorAssignment);
    }


}
