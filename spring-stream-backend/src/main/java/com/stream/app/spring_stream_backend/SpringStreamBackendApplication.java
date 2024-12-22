package com.stream.app.spring_stream_backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@EnableJpaRepositories(basePackages = "com.stream.app.spring_stream_backend.repositories")
public class SpringStreamBackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(SpringStreamBackendApplication.class, args);
	}

}
