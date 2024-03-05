package com.example.server.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.server.repo.UserRepo;
import com.example.server.dto.LoginDTO;
import com.example.server.dto.UserDTO;
import com.example.server.entity.UserEntity;
import com.example.server.response.Response;

@Service
public class UserServiceImpl implements UserService{

	@Autowired
	private UserRepo userRepo;
	
	
	@Autowired
	private PasswordEncoder passwordEncoder;
	
	
		
	
	
	@Override
	public Response addUser(UserDTO userDTO) {
		
		UserEntity user1 = getUserById(userDTO.getAssociateId());
		
		if(user1 == null) {
			return new Response("email Not found",false);
		}
		String encodedPassword = passwordEncoder.encode(userDTO.getPassword());
		user1.setPassword(encodedPassword);

		userRepo.save(user1);
		return new Response("Regisered Successfully",true);
	}
	
	public UserEntity getUserById(String id) {
		return userRepo.findByAssociateId(id);
	}


	@Override
	public Response loginUser(LoginDTO loginDTO) {
		
		String msg = "";
		UserEntity user1 = getUserById(loginDTO.getAssociateId());
		
		if(user1 != null) {
			String password = loginDTO.getPassword();
			String encodedPassword = user1.getPassword();
			
			Boolean isPwdRight = passwordEncoder.matches(password, encodedPassword);
			if(isPwdRight) {
				Optional<UserEntity> user = userRepo.findOneByAssociateIdAndPassword(loginDTO.getAssociateId(), encodedPassword);
				
				if(user.isPresent()) {
					return new Response("Login Success",true);
				}
				else {
					return new Response("Login failed",false);
				}  
			}
			else {
				return new Response("Password Not Match",false);
			}
		}
		else {
			return new Response("Email Not exists",false);
		}
	}
	
	
	
	

	@Override
	public List<UserEntity> viewUsers() {
		return userRepo.findAll();
	}     

}
