package com.example.server.service;

import java.util.List;
import java.util.Optional;
import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.server.repo.UserRepo;

import com.example.server.dto.LoginDTO;
import com.example.server.dto.UserDTO;
import com.example.server.dto.VerifyDTO;
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
			return new Response("Associate Id Not found",false);
		}
		String encodedPassword = passwordEncoder.encode(userDTO.getPassword());
		user1.setPassword(encodedPassword);

		userRepo.save(user1);
		return new Response("Registered Successfully",true);
	}
	
	public UserEntity getUserById(String id) {
		return userRepo.findByAssociateId(id);
	}


	@Override
	public Response loginUser(LoginDTO loginDTO) {
		
		
		UserEntity user1 = getUserById(loginDTO.getAssociateId());
		
		if(user1 != null) {
			String password = loginDTO.getPassword();
			String encodedPassword = user1.getPassword();
			
			Boolean isPwdRight = passwordEncoder.matches(password, encodedPassword);
			if(isPwdRight) {
				Optional<UserEntity> user = userRepo.findOneByAssociateIdAndPassword(loginDTO.getAssociateId(), encodedPassword);
				
				if(user.isPresent()) {
					if(user1.getIsRegistered() != 0) {
						return new Response("You haven't Registered yet. please register.",false);
					}
					
					
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

	@Autowired
    private JavaMailSender javaMailSender;

    public void sendEmail(String to, String subject, String body) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(to);
        message.setSubject(subject);
        message.setText(body);
        javaMailSender.send(message);
    }

	@Override
	public Response generateOtpAndSend(String associateId) {
		associateId = associateId.replace("{", "");
		associateId = associateId.replace("}", "");
		associateId = associateId.replace(":", "");
		associateId = associateId.replace("\"", "");
		associateId = associateId.substring(11, associateId.length());
	
		System.out.println(associateId);
		
		
    	UserEntity user1 = userRepo.findByAssociateId(associateId);
    	System.out.println(user1.toString());
    	String email = user1.getEmail();
    	

		
		if(user1 != null) {
			Random random = new Random();

	     
	        int randomNumber = 100000 + random.nextInt(900000); 

	        user1.setForgotPassword(randomNumber);

	        userRepo.save(user1);
	        sendEmail(email, "Forgot Password-Verification","Dear Associate,\n\n"+ "The OTP to reset your Password : " + randomNumber);
	        return new Response("Mail Sent",true);
		}
		return new Response("Error Happened",true);

		
	}

	@Override
	public Response confirmOtp(VerifyDTO verifyDTO) {
		System.out.println("Hello");
		UserEntity user1 = userRepo.findByEmail(verifyDTO.getEmail());
		if(user1 == null) {
			return new Response("email Not found",false);
		}
		String otp = "" + user1.getForgotPassword();
		String confirmOtp = "" + verifyDTO.getOtp();
		System.out.println(otp);
		System.out.println(verifyDTO.getOtp());
		if(otp.equals(confirmOtp)) {
			user1.setPassword(passwordEncoder.encode(verifyDTO.getPassword()));
			user1.setForgotPassword(null);
			userRepo.save(user1);
			return new Response("change success",true);
		}
		else {  
			return new Response("OTP Doesn't match", false);
		}      
		      
		
	
	}


}
