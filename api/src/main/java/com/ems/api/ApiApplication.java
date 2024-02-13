package com.ems.api;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class ApiApplication {

	//csrf token disable
	/*

	INSERT INTO EMSUser (dType, id,name, email, password, role, status)
	VALUES ('EMSUser','7fd5020f-b16f-4fa3-9833-0b72612e28d5','admin', 'abdmasud1020@gmail.com', '123456', 'ADMIN', 'ACTIVE');

	 */

	public static void main(String[] args) {
		SpringApplication.run(ApiApplication.class, args);
	}

}
