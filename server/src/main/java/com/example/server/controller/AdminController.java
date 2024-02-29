package com.example.server.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.example.server.entity.AdminUser;
import com.example.server.entity.UserEntity;
import com.example.server.repo.AdminRepo;
import com.example.server.response.Response;
import com.example.server.service.AdminService;

@RestController  
@CrossOrigin
@RequestMapping("admin")
public class AdminController {
	
	@Autowired
	private AdminRepo adminRepo;
	
	@Autowired
	private AdminService adminService;
	
	@Autowired
	private PasswordEncoder passwordEncoder;
	
	@PostMapping("/register")
	public String addUser(@RequestBody AdminUser userDTO) {
		AdminUser user = new AdminUser(
				userDTO.getId(),
				userDTO.getAssociateId(),
				this.passwordEncoder.encode(userDTO.getPassword())
		);
		
		adminRepo.save(user);
		return "admin added";
	}

	
	
	@PostMapping(path="/login")
	public ResponseEntity<?> loginUser(@RequestBody AdminUser adminUser){
		Response response = adminService.adminLogin(adminUser);
		return ResponseEntity.ok(response);
	}  
	
	
	@PostMapping("/upload-customers-data")
    public ResponseEntity<?> uploadCustomersData(@RequestParam("file")MultipartFile file){
		adminService.saveCustomersToDatabase(file);
        return ResponseEntity
                .ok(Map.of("Message" , " Users data uploaded and saved to database successfully"));
    }
  
    @GetMapping     
    public ResponseEntity<List<UserEntity>> getCustomers(){
        return new ResponseEntity<>(adminService.getCustomers(), HttpStatus.FOUND);
    }

}
