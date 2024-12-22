package com.stream.app.spring_stream_backend.services.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.stream.app.spring_stream_backend.entities.User;
import com.stream.app.spring_stream_backend.entities.UserPrincipal;
import com.stream.app.spring_stream_backend.repositories.UserRepository;


@Service
public class UserAuthenticationServiceImpl implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        
        // System.out.println("here");
        User user = userRepository.findByUsername(username);

        if (user == null) {
            System.out.println("User Not Found");
            throw new UsernameNotFoundException("user not found");
        }
        
        // System.out.println("loaded user : " + user.toString());
        
        return new UserPrincipal(user);
    }
    
}
