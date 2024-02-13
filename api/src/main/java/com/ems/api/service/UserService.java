package com.ems.api.service;

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
    private UserRepository userRepository;
    @Transactional
    public String createUserAndFetchToken(EMSUser user) {
        user.setRole(Role.GUEST);
        user.setStatus(Status.INACTIVE);
        userRepository.saveUser(user);
        return user.getId();
    }

    @Transactional
    public String logInAndFetchToken(EMSUser emsUser) {
        EMSUser user = userRepository.getUserByEmail(emsUser.getEmail());

        if (user == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid credentials");

        }

        if (!user.getPassword().equals(emsUser.getPassword())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid credentials");
        }

        if (!user.getStatus().equals(Status.ACTIVE)) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "User is not active");
        }

        if (!emsUser.getRole().equals(user.getRole())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Role mismatch");
        }

        // Successful authentication and authorization
        return user.getId();
    }

    public String updateUser(EMSUser user) {
        userRepository.updateUser(user);
        return user.getId();
    }
}
