package com.ems.api.service;

import com.ems.api.model.EMSUser;
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

    @Transactional
    public ArrayList<EMSUser> getAllUsers() {
        return adminRepository.getAllUsers();
    }

    public String updateUser(EMSUser user) {
        return adminRepository.updateUser(user);
    }
}
