package com.example.server.service;

import java.util.List;
import java.util.Optional;
import java.util.Random;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.server.repo.UserRepo;
import com.example.server.dto.ForgotPasswordDTO;
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
	
	
		
	 private String generateVerificationToken() {
	        return UUID.randomUUID().toString();
	    }
	 
	 public boolean verifyUser(String token) {
	        UserEntity user = userRepo.findByToken(token);
	        if (user != null) {
	            user.setEmailVerified("Yes");
	            user.setToken("");
	            userRepo.save(user);
	            return true;
	        }
	        return false;  
	    }
	
	 
	 private void sendVerificationEmail(String email, String token) {
	        SimpleMailMessage message = new SimpleMailMessage();
	        message.setTo(email);
	        message.setSubject("Email Verification");
	        message.setText("Please click on the link below to verify your email:\n\n"
	                + "http://localhost:8080/user/verify?token=" + token);
	        javaMailSender.send(message);
	    }
	
	 
	 
	 
	 
	@Override
	public Response addUser(UserDTO userDTO) {
		
		UserEntity user1 = getUserById(userDTO.getAssociateId());
		
		if(user1 == null) {
			return new Response("Associate Id Not found",false);
		}
		String encodedPassword = passwordEncoder.encode(userDTO.getPassword());
		user1.setPassword(encodedPassword);

		String token = generateVerificationToken();
        user1.setToken(token);
        user1.setIsRegistered("Yes");
  
        sendVerificationEmail(user1.getEmail(), token);
        userRepo.save(user1);
		return new Response("Registered Successfully. Check your mail to Verify your account",true);
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
					if(user1.getIsRegistered().equalsIgnoreCase("No")) {
						return new Response("You haven't Registered yet. please register.",false);
					}
					if(user1.getIsRegistered().equalsIgnoreCase("Yes") && user1.getEmailVerified().equalsIgnoreCase("No")) {
						String token = generateVerificationToken();
						sendVerificationEmail(user1.getEmail(), token);
						user1.setToken(token);
						return new Response("You haven't Verified your Email.please verify your Email",false);
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


	@SuppressWarnings("unused")
	@Override
	public Response generateOtpAndSend(ForgotPasswordDTO forgotPasswordDTO) {
		
    	UserEntity user1 = getUserById(forgotPasswordDTO.getAssociateId());
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

		UserEntity user1 = getUserById(verifyDTO.getAssociateId());
		if(user1 == null) {
			return new Response("User Not found",false);
		}  
		String otp = "" + user1.getForgotPassword();
		String confirmOtp = "" + verifyDTO.getOtp();

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
