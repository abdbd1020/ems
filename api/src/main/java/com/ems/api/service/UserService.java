package com.ems.api.service;

import com.ems.api.config.SecurityConfig;
import com.ems.api.dto.ResetPasswordRequest;
import com.ems.api.model.EMSUser;
import com.ems.api.model.Role;
import com.ems.api.model.Status;
import com.ems.api.repository.UserRepository;
import jakarta.transaction.Transactional;
import org.jetbrains.annotations.NotNull;
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
    public String createUserAndFetchToken(@NotNull EMSUser user) {
        user.setRole(Role.GUEST);
        user.setStatus(Status.INACTIVE);
        user.setPassword(securityConfig.passwordEncoder().encode(user.getPassword()));
        userRepository.saveUser(user);
        return user.getId();
    }

    @Transactional
    public String logInAndFetchToken(@NotNull EMSUser emsUser) {
        EMSUser user = userRepository.getUserByEmail(emsUser.getEmail());

        if (isPasswordNotMatching(emsUser.getPassword(), user.getPassword())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid credentials");
        }

        if (!user.getStatus().equals(Status.ACTIVE)) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "User is not active");
        }

        if (!emsUser.getRole().equals(user.getRole())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Role mismatch");
        }

        return jwtService.generateToken(user.getEmail());
    }

    public String updateUser(EMSUser user) {
        userRepository.updateUser(user);
        return user.getId();
    }

    private boolean isPasswordNotMatching(String rawPassword, @NotNull String hashedPassword) {
        if (hashedPassword.startsWith("$2a$")) {
            return !securityConfig.passwordEncoder().matches(rawPassword, hashedPassword);
        } else {
            return !rawPassword.equals(hashedPassword);
        }
    }

    public String resetPassword(@NotNull ResetPasswordRequest resetPasswordRequest) {
        EMSUser user = userRepository.getUserByEmail(resetPasswordRequest.getEmail());
//        check if current password is correct
        if (isPasswordNotMatching(resetPasswordRequest.getCurrentPassword(), user.getPassword())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid current password");
        }
        user.setPassword(securityConfig.passwordEncoder().encode(resetPasswordRequest.getNewPassword()));
        userRepository.updateUser(user);
        return "Password reset successful";
    }
}
