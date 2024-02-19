package com.ems.api;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class ApiApplication {

	/*

	INSERT INTO EMSUser (id,name, email, password, role, status)
	VALUES ('7fd5020f-b16f-4fa3-9833-0b72612e28d5','admin', 'emsuser52@gmail.com', '$2a$10$242Iq5l3W4CG/H/1cCXsAuZ/OZKYkTX/0QryJsMZEr0SbnVUjrj6a', 'ADMIN', 'ACTIVE');

	 */

	public static void main(String[] args) {
		SpringApplication.run(ApiApplication.class, args);
	}

}
