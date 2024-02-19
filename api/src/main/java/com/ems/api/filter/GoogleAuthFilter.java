package com.ems.api.filter;

import com.ems.api.service.EMSUserDetailsService;
import com.ems.api.service.JwtService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;

@Component
public class GoogleAuthFilter {
    @Autowired
    private JwtService jwtService;
    @Autowired
    private EMSUserDetailsService userDetailsService;

    public Boolean isGoogleTokenValid(String googleToken, String userEmail) {

           String email = jwtService.extractEmail(googleToken);

        if (email != null && email.equals(userEmail)) {
            UserDetails userDetails = userDetailsService.loadUserByEmail(email);
            return jwtService.validateToken(googleToken, userDetails);
        }
        return false;
    }

}
