package com.ems.api.service;

import com.ems.api.model.EMSUser;
import com.ems.api.model.Role;
import com.ems.api.model.Status;
import com.ems.api.repository.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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
        EMSUser user = userRepository.getUserByName(emsUser.getName());
        if (user != null && user.getPassword().equals(emsUser.getPassword())){
            return user.getId();
        }
        return "Invalid User";
    }

    public String updateUser(EMSUser user) {
        userRepository.updateUser(user);
        return user.getId();
    }
}
