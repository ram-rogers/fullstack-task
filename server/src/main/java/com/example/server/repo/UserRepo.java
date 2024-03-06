package com.example.server.repo;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

import com.example.server.entity.UserEntity;

@EnableJpaRepositories
public interface UserRepo extends JpaRepository<UserEntity, Integer> {
	

	
	UserEntity findByEmail(String email);

	UserEntity findByAssociateId(String associateId);

	Optional<UserEntity> findOneByAssociateIdAndPassword(String associateId, String encodedPassword);

    UserEntity findByToken(String token);

}
