package com.example.server.entity;



import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
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
	@GeneratedValue(strategy=GenerationType.AUTO)
	private Integer id;
	@Column(name="associate_id", length = 255)
	private String associateId;
	@Column(name="name", length = 255)
	private String name;
	@Column(name="email", length = 255)
	private String email;
	@Column(name="password", length = 255)
	private String password;
	@Column(name="is_registered", length = 255)
	private Integer isRegistered;
	@Column(name="is_email_verified", length = 255)
	private Integer emailVerified;
	@Column(name="forgot_password", length = 255)
	private Integer forgotPassword;
	

}
