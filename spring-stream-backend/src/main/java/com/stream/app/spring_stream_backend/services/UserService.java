package com.stream.app.spring_stream_backend.services;

import com.stream.app.spring_stream_backend.Dto.UserDto;
// import com.stream.app.spring_stream_backend.Dto.LoginDto;
import com.stream.app.spring_stream_backend.entities.User;

public interface UserService {

    User addUser(UserDto userDTO);
    // LoginMesage loginUser(LoginDTO loginDTO);
}
