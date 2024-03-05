package com.example.server.service;

import java.util.List;

import com.example.server.dto.LoginDTO;
import com.example.server.dto.UserDTO;
import com.example.server.entity.UserEntity;
import com.example.server.response.Response;

public interface UserService {

	
	Response addUser(UserDTO userDTO);

	Response loginUser(LoginDTO loginDTO);

	UserEntity getUserById(String id);
	
	List<UserEntity> viewUsers();
}
