# Project Name

Welcome to the Education Management System repository!

## Setting up Database Credentials

To run this project locally, you need to configure the database connection in the `application.properties` file. Follow the steps below to update the database credentials:

1. Navigate to the `src/main/resources` directory.

2. Locate the `application.properties` file.

3. Open the `application.properties` file in a text editor.

4. Update the following lines with your own database credentials:

    ```properties
    spring.datasource.url=jdbc:postgresql://localhost:5432/your_database_name
    spring.datasource.username=your_database_username
    spring.datasource.password=your_database_password
    ```

    Replace `your_database_name`, `your_database_username`, and `your_database_password` with your actual database details.

5. Save the `application.properties` file.

Now, your application is configured to use your local database. Make sure your PostgreSQL server is running before starting the application.

## Initializing Database with Admin User

To set up the initial data in your database, you can execute the following SQL command to insert an admin user into the `EMSUser` table:

```sql
INSERT INTO EMSUser (id, name, email, password, role, status)
VALUES (
  '7fd5020f-b16f-4fa3-9833-0b72612e28d5', -- user ID
  'admin',                                -- user name
  'abdmasud1020@gmail.com',               -- user email
  '$2a$10$242Iq5l3W4CG/H/1cCXsAuZ/OZKYkTX/0QryJsMZEr0SbnVUjrj6a', -- hashed password (original password : 123456)
  'ADMIN',                                -- user role
  'ACTIVE'                                -- user status
);
```
## Running the Application

### Frontend:

1. Navigate to the `frontend` directory:

    ```bash
    cd frontend
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Start the development server:

    ```bash
    npm start
    ```

4. Open your browser and go to [http://localhost:3000](http://localhost:3000) to view the application.

### Backend:

1. Navigate to the `api` directory:

    ```bash
    cd api
    ```

2. Build and run the Spring Boot application using Maven:

    ```bash
    mvn spring-boot:run
    ```

3. The backend server should start, and you can access it at [http://localhost:8080](http://localhost:8080).
4. Or just use intellij to run

Now, both the frontend and backend components of your application are up and running. Feel free to customize these instructions based on your project structure and requirements.


...

