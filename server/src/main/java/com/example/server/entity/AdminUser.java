package com.example.server.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@AllArgsConstructor 
@NoArgsConstructor
@Table(name = "admin")
public class AdminUser {
	   
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	private Integer id;
	 @Column(name="associate_id", length = 255)
	private String associateId;
	 @Column(name="password", length = 255)
	private String password;
	
	

}
