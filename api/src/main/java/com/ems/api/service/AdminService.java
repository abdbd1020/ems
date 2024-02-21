package com.ems.api.service;

import com.ems.api.dto.DepartmentRequest;
import com.ems.api.model.*;
import com.ems.api.repository.*;
import jakarta.transaction.Transactional;
import org.jetbrains.annotations.NotNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
public class AdminService {
    @Autowired
    private AdminRepository adminRepository;

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private FacultyRepository facultyRepository;
    @Autowired
    private StudentRepository studentRepository;
    @Autowired
    private TeacherRepository teacherRepository;
    @Autowired
    private DepartmentRepository departmentRepository;
    @Autowired
    private AdvisorAssignmentRepository advisorAssignmentRepository;


    public ArrayList<EMSUser> getAllUsers() {
        return userRepository.getAllUsers();
    }

    public ArrayList<EMSUser> getAllInActiveAndGuestUsers() {
        return userRepository.getAllInActiveAndGuestUsers();
    }

    @Transactional
    public String updateUserAsAdmin(@NotNull EMSUser user) {

        if (user.getRole().equals(Role.STUDENT)) {
            Student student = studentRepository.getStudentById(user.getId());
            Teacher teacher = teacherRepository.getTeacherById(user.getId());
            if (teacher != null) {
                advisorAssignmentRepository.deleteAdvisorAssignmentByAdvisor(teacher);
                teacherRepository.deleteTeacher(user.getId());
            }
            if (student == null) {
                studentRepository.createStudent(user.getId());
            }
            Student tempStudent = studentRepository.getStudentById(user.getId());
            tempStudent.setEmsUser(user);
            studentRepository.updateStudent(tempStudent);


        }
        else if (user.getRole().equals(Role.TEACHER)) {
            Teacher teacher = teacherRepository.getTeacherById(user.getId());
            Student student = studentRepository.getStudentById(user.getId());
            if (student != null) {
                advisorAssignmentRepository.deleteAdvisorAssignmentByStudent(student);
                studentRepository.deleteStudent(user.getId());
            }
            if (teacher == null) {
                teacherRepository.createTeacher(user.getId());
            }
            Teacher tempTeacher = teacherRepository.getTeacherById(user.getId());
            tempTeacher.setEmsUser(user);
            teacherRepository.updateTeacher(tempTeacher);

        }
        else if(user.getRole().equals(Role.GUEST)){
            Student student = studentRepository.getStudentById(user.getId());
            Teacher teacher = teacherRepository.getTeacherById(user.getId());
            if (teacher != null) {
                teacherRepository.deleteTeacher(user.getId());
            }
            if (student != null) {
                studentRepository.deleteStudent(user.getId());
            }
        }

        else {
            throw new RuntimeException("Invalid Role");
        }
        return adminRepository.updateUserAsAdmin(user);

    }


    public ArrayList<EMSUser> getInactiveUsers() {
        return userRepository.getInactiveUsers();
    }
    public ArrayList<EMSUser> getAllUsersByRole(Role role) {
        return userRepository.getAllUsersByRole(role);
    }

    public ArrayList<Department> getAllDepartments() {
        return departmentRepository.getAllDepartments();
    }
    public ArrayList<Faculty> getAllFaculty() {
        return facultyRepository.getAllFaculty();
    }
    @Transactional
    public String addFaculty(Faculty faculty) {
        facultyRepository.saveFaculty(faculty);
        return "Faculty Added Successfully";
    }

    @Transactional
    public String updateFaculty(Faculty faculty) {
        return facultyRepository.updateFaculty(faculty);
    }

    @Transactional
    public String addDepartment(DepartmentRequest departmentRequest) {

        Department department = getDepartmentFromRequest(departmentRequest);

        return departmentRepository.addDepartment(department);
    }

    @Transactional
    public String updateDepartment(DepartmentRequest departmentRequest) {
        Department department = getDepartmentFromRequest(departmentRequest);
        department.setId(departmentRequest.getId());
        return departmentRepository.updateDepartment(department);

    }
    @Transactional
    private Department getDepartmentFromRequest(DepartmentRequest departmentRequest) {
        Faculty faculty = facultyRepository.getFacultyById(departmentRequest.getFacultyId());
        Department department = new Department();
        department.setName(departmentRequest.getName());
        department.setFaculty(faculty);
        department.setDescription(departmentRequest.getDescription());
        return department;
    }


}
