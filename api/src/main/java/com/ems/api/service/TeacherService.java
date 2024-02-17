package com.ems.api.service;

import com.ems.api.dto.AdviseeRequest;
import com.ems.api.dto.AdvisorRequest;
import com.ems.api.dto.EmailRequest;
import com.ems.api.model.*;
import com.ems.api.repository.*;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

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
    @Autowired
    private AdvisorAssignmentRepository advisorAssignmentRepository;
    @Autowired
    private StudentRepository studentRepository;
    @Transactional
    public String acceptAdvisor(AdvisorAssignment advisorAssignment) {
        AdvisorAssignment currentAdvisorAssignment = advisorAssignmentRepository.getAdvisorAssignmentsById(advisorAssignment.getId());
        currentAdvisorAssignment.setAccepted(true);
        return advisorAssignmentRepository.acceptAdvisorAssignment(currentAdvisorAssignment);



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

    public ArrayList<AdviseeRequest> getAllAdviseeRequest(EmailRequest emailRequest) {
        Teacher teacher = getTeacherByEmail(emailRequest.getEmail());
        ArrayList<AdvisorAssignment> advisorAssignments = advisorAssignmentRepository.getAdvisorAssignmentsByAdvisor(teacher);
        ArrayList<AdviseeRequest> adviseeRequests = new ArrayList<>();
        for (AdvisorAssignment advisorAssignment : advisorAssignments) {
            if(advisorAssignment.getStudent().getEmsUser().getStatus().equals(Status.INACTIVE) ||advisorAssignment.isAccepted()) {
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

    public String rejectAdvisor(AdvisorAssignment advisorAssignment) {
        AdvisorAssignment currentAdvisorAssignment = advisorAssignmentRepository.getAdvisorAssignmentsById(advisorAssignment.getId());
        return advisorAssignmentRepository.removeAdvisorAssignment(currentAdvisorAssignment);
    }
}
