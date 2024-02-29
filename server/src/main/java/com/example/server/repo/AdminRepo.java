package com.example.server.repo;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

import com.example.server.entity.AdminUser;
import com.example.server.entity.UserEntity;


@EnableJpaRepositories
public interface AdminRepo extends JpaRepository<AdminUser, Integer> {

	AdminUser findByAssociateId(String associateId);

	Optional<AdminUser> findOneByAssociateIdAndPassword(String associateId, String encodedPassword);

}
