package com.ems.api.filter;

import com.ems.api.dto.GoogleTokenInfoResponse;
import com.ems.api.dto.LoginRequest;
import com.ems.api.service.EMSUserDetailsService;
import com.ems.api.service.JwtService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.server.ResponseStatusException;
import reactor.core.publisher.Mono;

import java.time.Instant;

@Component
public class GoogleAuthFilter {
    @Value("${google.token.auth.provider.url}")
    private String googleURL;


    public Boolean isGoogleTokenValid(LoginRequest loginRequest){

        try{
            String url = googleURL + loginRequest.getGoogleToken();
            WebClient webClient = WebClient.create();
            Mono<GoogleTokenInfoResponse> webResponse = webClient.get().uri(url).retrieve().bodyToMono(GoogleTokenInfoResponse.class);
            GoogleTokenInfoResponse googleTokenInfoResponse = webResponse.block();
            if(googleTokenInfoResponse.getEmail() == null || !googleTokenInfoResponse.getEmail_verified() || !googleTokenInfoResponse.getEmail().equals(loginRequest.getEmail()) ){
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid credentials");
            }
            if(Instant.now().getEpochSecond() > googleTokenInfoResponse.getExp()){
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Token expired");
            }

        }
        catch (Exception e){
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid credentials");
        }


        return true;
    }

}
