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


    @Transactional
    public ArrayList<EMSUser> getAllUsers() {
        return adminRepository.getAllUsers();
    }

    public ArrayList<EMSUser> getAllInActiveAndGuestUsers() {
        return userRepository.getAllInActiveAndGuestUsers();
    }

    @Transactional
    public String updateUser(@NotNull EMSUser user) {

        if (user.getRole().equals(Role.STUDENT)) {
            Student student = studentRepository.getStudentById(user.getId());
            if (student == null) {
                studentRepository.createStudent(user.getId());
            }

        }
        if (user.getRole().equals(Role.TEACHER)) {
            Teacher teacher = teacherRepository.getTeacherById(user.getId());
            if (teacher == null) {
                teacherRepository.createTeacher(user.getId());
            }

        }

        return adminRepository.updateUser(user);
    }

    public void ensureAdminExists() {
        EMSUser admin = userRepository.findByRole(Role.ADMIN);

        if (admin == null) {
            EMSUser newAdmin = new EMSUser();
            newAdmin.setEmail("a@a.com");
            newAdmin.setPassword("123456");
            newAdmin.setRole(Role.ADMIN);
            newAdmin.setStatus(Status.ACTIVE);
            userRepository.saveUser(newAdmin);
            System.out.println("Created admin user with email: " + newAdmin.getEmail() + " and password: " + newAdmin.getPassword());
        }
    }
    @Transactional

    public ArrayList<EMSUser> getInactiveUsers() {
        return adminRepository.getInactiveUsers();
    }
    @Transactional

    public ArrayList<EMSUser> getAllUsersByRole(Role role) {
        return adminRepository.getAllUsersByRole(role);
    }

    @Transactional
    public ArrayList<Department> getAllDepartments() {
        return adminRepository.getAllDepartments();
    }
    @Transactional
    public ArrayList<Faculty> getAllFaculty() {
        return adminRepository.getAllFaculty();
    }
    @Transactional
    public String addFaculty(Faculty faculty) {
        adminRepository.saveFaculty(faculty);
        return "Faculty Added Successfully";
    }

    @Transactional
    public String updateFaculty(Faculty faculty) {
        return adminRepository.updateFaculty(faculty);
    }

    @Transactional
    public String addDepartment(DepartmentRequest departmentRequest) {

        Department department = getDepartmentFromRequest(departmentRequest);

        return adminRepository.addDepartment(department);
    }

    @Transactional
    public String updateDepartment(DepartmentRequest departmentRequest) {
        Department department = getDepartmentFromRequest(departmentRequest);
        department.setId(departmentRequest.getId());
        return adminRepository.updateDepartment(department);

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
