package com.stream.app.spring_stream_backend.repositories;

import java.util.Optional;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository; 
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;


import com.stream.app.spring_stream_backend.entities.User;

@EnableJpaRepositories
@Repository
public interface UserRepository extends JpaRepository<User, Integer> {
    @Query("SELECT u FROM User u WHERE u.username = :username AND u.password = :password")
    Optional<User> findByName(@Param("username") String username, @Param("password") String password);
    User findByEmail(String email);
    User findByUsername(String username);
}
