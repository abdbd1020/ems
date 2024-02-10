package com.ems.api.Service;

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
}
