package com.stream.app.spring_stream_backend.services.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.stream.app.spring_stream_backend.entities.User;
import com.stream.app.spring_stream_backend.Dto.UserDto;
import com.stream.app.spring_stream_backend.repositories.UserRepository;
import com.stream.app.spring_stream_backend.services.UserService;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public User addUser(UserDto userDto) {
        User user = new User(
                userDto.getUserid(),
                userDto.getUsername(),
                userDto.getPassword(),
                userDto.getEmail()

        );

        User savedUser = userRepository.save(user);
        return savedUser;
    }

}
