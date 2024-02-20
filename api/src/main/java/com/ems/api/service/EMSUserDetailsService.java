package com.ems.api.service;


import com.ems.api.model.EMSUserDetails;
import com.ems.api.model.EMSUser;
import com.ems.api.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component
public class EMSUserDetailsService implements UserDetailsService {

    @Autowired
    private UserRepository repository;
    private EMSUserDetails EMSUserDetails;

    @Override
    public org.springframework.security.core.userdetails.UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<EMSUser> emsUser = Optional.ofNullable(repository.findByName(username));
        return emsUser.map(EMSUserDetails::new)
                .orElseThrow(() -> new UsernameNotFoundException("user not found " + username));

    }

    public EMSUserDetails loadUserByEmail(String email) {
        Optional<EMSUser> emsUser = Optional.ofNullable(repository.getUserByEmail(email));
        if (emsUser.isEmpty()) {
            throw new UsernameNotFoundException("user not found " + email);
        }
        return emsUser.map(EMSUserDetails::new)
                .orElseThrow(() -> new UsernameNotFoundException("user not found " + email));
    }
}
