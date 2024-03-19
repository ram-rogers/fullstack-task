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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.server.dto.ForgotPasswordDTO;
import com.example.server.dto.LoginDTO;
import com.example.server.dto.UserDTO;
import com.example.server.dto.VerifyDTO;
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
	
	
	@SuppressWarnings("unused")
	@GetMapping("/check/{id}")
	public Response getUserById(@PathVariable String id) {
		
		UserEntity user = userService.getUserById(id);
		
		if(user.getIsRegistered().equalsIgnoreCase("No")) {
			return new Response("Your not registered. pls Register",false);
		}
		else if(user != null) {
			return new Response("User Found",true);
			
		}
		return new Response("User not Found",false);
		
  
		
	}  
	
	@PostMapping(path="/register")
	public Response addUser(@RequestBody UserDTO userDTO) {
		return userService.addUser(userDTO);
	}
	
	@GetMapping("/users")
	public List<UserEntity> viewUser() {
		return userService.viewUsers();
	}
	
	
	@PostMapping(path="/login")
	public ResponseEntity<?> loginUser(@RequestBody LoginDTO loginDTO){
		Response loginResponse = userService.loginUser(loginDTO);
		return ResponseEntity.ok(loginResponse);
	}
	


    @PostMapping("/forgot-password")
    public ResponseEntity<?> sendEmail(@RequestBody ForgotPasswordDTO forgotPasswordDTO) {
    	Response mailSent = userService.generateOtpAndSend(forgotPasswordDTO);
    	return ResponseEntity.ok(mailSent);
    	
    
    }
    
    @PostMapping(path="/confirm-otp")
	public ResponseEntity<?> confirmOtp(@RequestBody VerifyDTO verifyDTO) {
		
		Response success = userService.confirmOtp(verifyDTO);
		return ResponseEntity.ok(success);
		   
	}
    
    @GetMapping("/verify")
    public ResponseEntity<?> verifyUser(@RequestParam("token") String token) {
        if (userService.verifyUser(token)) {
            return ResponseEntity.ok("Email verification successful.");
        } else {
            return ResponseEntity.badRequest().body("Invalid verification token.");
        }
    }

}
