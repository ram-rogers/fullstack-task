package com.example.server.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.server.dto.LoginDTO;
import com.example.server.dto.UserDTO;
import com.example.server.entity.UserEntity;
import com.example.server.repo.UserRepo;
import com.example.server.response.Response;
import com.example.server.service.UserService;

@RestController
@CrossOrigin
@RequestMapping("/user")
public class UserController {
	
	
	@Autowired
	private UserService userService;
	
	@Autowired
	private UserRepo userRepo;
	
	
	@GetMapping("/check/{id}")
	public UserEntity getUserById(@PathVariable String id) {
		return userRepo.findByAssociateId(id);
	}
	
	@PostMapping(path="/register")
	public Response addUser(@RequestBody UserDTO userDTO) {
		return userService.addUser(userDTO);
	}
	
	@GetMapping("/users")
	public List<UserEntity> viewUser() {
		return userService.viewUsers();
	}
	
	
//	public ResponseEntity<String> checkIdExists(@PathVariable String id) {
//        boolean exists = userService.checkIfIdExists(id);
//        if (exists) {
//            return ResponseEntity.ok("ID exists in the table.");
//        } else {
//            return ResponseEntity.notFound().build();
//        }
//    }  
	   
	@PostMapping(path="/login")
	public ResponseEntity<?> loginUser(@RequestBody LoginDTO loginDTO){
		Response loginResponse = userService.loginUser(loginDTO);
		return ResponseEntity.ok(loginResponse);
	}

}
