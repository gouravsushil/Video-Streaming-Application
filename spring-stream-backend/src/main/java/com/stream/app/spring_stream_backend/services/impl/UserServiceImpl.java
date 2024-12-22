package com.stream.app.spring_stream_backend.services.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.stream.app.spring_stream_backend.entities.User;
import com.stream.app.spring_stream_backend.Dto.UserDto;
import com.stream.app.spring_stream_backend.repositories.UserRepository;
import com.stream.app.spring_stream_backend.services.UserService;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private AuthenticationManager authManager;

    @Autowired
    private JWTService jwtService;

    @Autowired
    private UserRepository userRepository;

    private static final BCryptPasswordEncoder encoder = new BCryptPasswordEncoder(12);
    
    @Override
    public User addUser(UserDto userDto) {
        User user = new User(
                userDto.getUserid(),
                userDto.getUsername(),
                encoder.encode(userDto.getPassword()),
                userDto.getEmail()

        );

        User savedUser = userRepository.save(user);
        return savedUser;
    }

    @Override
    public String verify(UserDto userDto) {
        Authentication authentication = authManager.authenticate(new UsernamePasswordAuthenticationToken(userDto.getUsername(), userDto.getPassword()));
        if (authentication.isAuthenticated()) {
            return jwtService.generateToken(userDto.getUsername());
        } else {
            return "failed to verify user";
        }
    }
}
