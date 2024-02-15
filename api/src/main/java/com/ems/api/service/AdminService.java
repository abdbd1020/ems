package com.ems.api.service;

import com.ems.api.model.*;
import com.ems.api.repository.AdminRepository;
import com.ems.api.repository.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
public class AdminService {
    @Autowired
    private AdminRepository adminRepository;

    @Autowired
    private UserRepository userRepository;


    @Transactional
    public ArrayList<EMSUser> getAllUsers() {
        return adminRepository.getAllUsers();
    }

    @Transactional

    public String updateUser(EMSUser user) {
        System.out.println(user.getId());
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
}
