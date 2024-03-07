package com.example.server.service;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.example.server.dto.LoginDTO;
import com.example.server.entity.AdminUser;
import com.example.server.entity.UserEntity;
import com.example.server.repo.AdminRepo;
import com.example.server.repo.UserRepo;
import com.example.server.response.Response;

@Service
public class AdminService {
	
	@Autowired
	private AdminRepo adminRepo;
	
	
	@Autowired
	private PasswordEncoder passwordEncoder; 
	
	public AdminUser getUserById(String id) {
		return adminRepo.findByAssociateId(id);
	}
	

	@SuppressWarnings("unused")
	public Response adminLogin(LoginDTO loginDTO) {
		
		AdminUser admin1 = getUserById(loginDTO.getAssociateId());
		  
		
		if(admin1 != null) {  
			String password = loginDTO.getPassword();
			String encodedPassword = admin1.getPassword();
			
			Boolean isPwdRight = passwordEncoder.matches(password, encodedPassword);
			if(isPwdRight) {
				Optional<AdminUser> admin = adminRepo.findOneByAssociateIdAndPassword(loginDTO.getAssociateId(), encodedPassword);
				
				if(admin.isPresent()) {
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
	
	

	@Autowired
	private UserRepo userRepo;

    public void saveAssociatesToDatabase(MultipartFile file){
        if(ExcelUploadService.isValidExcelFile(file)){
            try {
                List<UserEntity> associates = ExcelUploadService.getAssociatesDataFromExcel(file.getInputStream());
                userRepo.saveAll(associates);
            } catch (IOException e) {
                throw new IllegalArgumentException("The file is not a valid excel file");
            }
        }
    }

    

}
