package com.ems.api;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class ApiApplication {

	//csrf token disable
	/*

	INSERT INTO EMSUser (id,name, email, password, role, status)
	VALUES ('7fd5020f-b16f-4fa3-9833-0b72612e28d5','admin', 'abdmasud1020@gmail.com', '$2a$10$242Iq5l3W4CG/H/1cCXsAuZ/OZKYkTX/0QryJsMZEr0SbnVUjrj6a', 'ADMIN', 'ACTIVE');

	 */
	/*
	spring.security.oauth2.resourceserver.jwt.issuer-uri=http://localhost:8080/auth/issuer
	spring.security.oauth2.resourceserver.jwt.public-key-location=classpath:certs/publicKey.pem
	spring.security.oauth2.client.registration.my-combined-client.provider: my-auth-server
	spring.security.oauth2.client.registration.my-combined-client.client-id: 915230421827-m7d6lm7ckch672s8dep5qu5dq3lkaiuk.apps.googleusercontent.com
	spring.security.oauth2.client.registration.my-combined-client.client-secret: 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
	spring.security.oauth2.client.registration.my-combined-client.authorization-grant-type: authorization_code
	spring.security.oauth2.client.registration.my-combined-client.scope: openid,profile,message.read,message.write
	spring.security.oauth2.client.provider.my-auth-server.issuer-uri: http://localhost:8080/auth/provider
*/
	public static void main(String[] args) {
		SpringApplication.run(ApiApplication.class, args);
	}

}
