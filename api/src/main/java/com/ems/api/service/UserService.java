package com.ems.api.service;

import com.ems.api.config.SecurityConfig;
import com.ems.api.model.EMSUser;
import com.ems.api.model.Role;
import com.ems.api.model.Status;
import com.ems.api.repository.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
public class UserService {

    @Autowired
    JwtService jwtService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private SecurityConfig securityConfig;


    @Transactional
    public String createUserAndFetchToken(EMSUser user) {
        user.setRole(Role.GUEST);
        user.setStatus(Status.INACTIVE);
        user.setPassword(securityConfig.passwordEncoder().encode(user.getPassword()));
        userRepository.saveUser(user);
        return user.getId();
    }

    @Transactional
    public String logInAndFetchToken(EMSUser emsUser) {
        EMSUser user = userRepository.getUserByEmail(emsUser.getEmail());



        if (!isPasswordMatching(emsUser.getPassword(), user.getPassword())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid credentials");
        }

        if (!user.getStatus().equals(Status.ACTIVE)) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "User is not active");
        }

        if (!emsUser.getRole().equals(user.getRole())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Role mismatch");
        }

        // Successful authentication and authorization

        return jwtService.generateToken(emsUser.getName());
    }

    public String updateUser(EMSUser user) {
        userRepository.updateUser(user);
        return user.getId();
    }

    private boolean isPasswordMatching(String rawPassword, String hashedPassword) {
        // Check if the hashed password starts with the bcrypt identifier
        if (hashedPassword.startsWith("$2a$")) {
            // Hash the raw password and compare it with the stored hashed password
            return securityConfig.passwordEncoder().matches(rawPassword, hashedPassword);
        } else {
            // Compare plain text password with stored hashed password (for admin)
            return rawPassword.equals(hashedPassword);
        }
    }
}
