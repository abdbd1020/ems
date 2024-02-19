package com.ems.api.service;

import com.ems.api.config.SecurityConfig;
import com.ems.api.dto.LoginRequest;
import com.ems.api.dto.LoginResponse;
import com.ems.api.dto.ResetPasswordRequest;
import com.ems.api.filter.GoogleAuthFilter;
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
    private JwtService jwtService;

    @Autowired
    private GoogleAuthFilter googleAuthFilter;
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
    public LoginResponse logInAndFetchToken(@NotNull LoginRequest loginRequest) {


        EMSUser user = userRepository.getUserByEmail(loginRequest.getEmail());

        if (isPasswordNotMatching(loginRequest.getPassword(), user.getPassword())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid credentials");
        }

        if (!user.getStatus().equals(Status.ACTIVE)) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "User is not active");
        }

        if (user.getRole().equals(Role.GUEST)) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Guest user cannot login");
        }
        LoginResponse loginResponse = new LoginResponse();
        loginResponse.setToken(jwtService.generateToken(user.getEmail()));
        loginResponse.setRole(user.getRole());
        return loginResponse;
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

    public LoginResponse authorizeGoogleTokenLogInAndFetchNewToken(LoginRequest loginRequest) {
        if(!googleAuthFilter.isGoogleTokenValid(loginRequest.getGoogleToken(), loginRequest.getEmail())){
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid google token");
        }

        EMSUser user = userRepository.getUserByEmail(loginRequest.getEmail());

        if (isPasswordNotMatching(loginRequest.getPassword(), user.getPassword())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid credentials");
        }

        if (!user.getStatus().equals(Status.ACTIVE)) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "User is not active");
        }

        if (user.getRole().equals(Role.GUEST)) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Guest user cannot login");
        }
        LoginResponse loginResponse = new LoginResponse();
        loginResponse.setToken(jwtService.generateToken(user.getEmail()));
        loginResponse.setRole(user.getRole());
        return loginResponse;
    }
}
