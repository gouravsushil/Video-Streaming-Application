package com.stream.app.spring_stream_backend.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.stream.app.spring_stream_backend.Dto.UserDto;
import com.stream.app.spring_stream_backend.services.UserService;
import com.stream.app.spring_stream_backend.entities.User;


@RestController
@CrossOrigin
@RequestMapping("/api/v1/user")
public class UserController {

    @Autowired
    private UserService userService;
    
    @PostMapping(path ="/save")
    public User saveUser(@RequestBody UserDto userDto)
    {
        // return new User(userDto.getUserid(), userDto.getUsername(), userDto.getPassword(), userDto.getEmail());
        User user = userService.addUser(userDto);
        return user;
    }
}
