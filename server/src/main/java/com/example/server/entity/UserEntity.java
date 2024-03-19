package com.example.server.entity;



import jakarta.persistence.Column;
import jakarta.persistence.Entity;

import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;



@Entity
@Getter
@Setter
@Data 
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class UserEntity {
	@Id
//	@GeneratedValue(strategy=GenerationType.AUTO)
    @Column(nullable = false)

	private Integer id;
	
    @Column(nullable = false)
	private String associateId;
    
	@Column(name="name", length = 255,nullable = false)
	private String name;
	
	@Column(name="email", length = 255, nullable = false)
	private String email;
	
	@Column(name="password", length = 255)
	private String password;    
	
	@Column(name="is_registered")
	private String isRegistered = "No";
	
	@Column(name="is_email_verified")
	private String emailVerified = "No";   
	
	@Column(name="forgot_password")
	private Integer forgotPassword;    
	
	private String token;     
	

}
