package com.ems.api.repository;

import com.ems.api.model.*;
import jakarta.persistence.EntityManager;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.ArrayList;

@Repository
public class AdminRepository {
    @Autowired
    private EntityManager entityManager;
    @Transactional
    public ArrayList<EMSUser> getAllUsers() {
        return (ArrayList<EMSUser>) entityManager.createQuery("SELECT u FROM EMSUser u", EMSUser.class).getResultList();
//
    }

    @Transactional
    public String updateUser(EMSUser user) {

        entityManager.createQuery("UPDATE EMSUser u SET  u.role = :role, u.status = :status WHERE u.id = :id")
                .setParameter("role", user.getRole())
                .setParameter("status", user.getStatus())
                .setParameter("id", user.getId())
                .executeUpdate();

        return "User Updated Successfully";

    }
    @Transactional

    public ArrayList<EMSUser> getInactiveUsers() {
        return (ArrayList<EMSUser>) entityManager.createQuery("SELECT u FROM EMSUser u WHERE u.status = :status", EMSUser.class)
                .setParameter("status", Status.INACTIVE).getResultList();


    }
    @Transactional
    public ArrayList<EMSUser> getAllUsersByRole(Role role) {
        return (ArrayList<EMSUser>) entityManager.createQuery("SELECT u FROM EMSUser u WHERE u.role = :role", EMSUser.class)
                .setParameter("role", role)
                .getResultList();
    }
    @Transactional
    public ArrayList<Department> getAllDepartments() {
        return (ArrayList<Department>) entityManager.createQuery("SELECT d FROM Department d", Department.class).getResultList();
    }
    @Transactional
    public ArrayList<Faculty> getAllFaculty() {
        return (ArrayList<Faculty>) entityManager.createQuery("SELECT f FROM Faculty f", Faculty.class).getResultList();
    }

    @Transactional
    public void saveFaculty(Faculty faculty) {

        entityManager.createQuery("INSERT INTO Faculty (name, description) VALUES (:name, :description)")
                .setParameter("name", faculty.getName())
                .setParameter("description", faculty.getDescription())
                .executeUpdate();
    }
    @Transactional
    public String updateFaculty(Faculty faculty) {
        entityManager.createQuery("UPDATE Faculty f SET f.name = :name, f.description = :description WHERE f.id = :id")
                .setParameter("name", faculty.getName())
                .setParameter("description", faculty.getDescription())
                .setParameter("id", faculty.getId())
                .executeUpdate();
        return "Faculty Updated Successfully";
    }

    @Transactional
    public String addDepartment(Department department) {
        entityManager.persist(department);
        return "Department Added Successfully";
        }
    @Transactional
    public String updateDepartment(Department department) {
        entityManager.merge(department);
        return "Department Updated Successfully";
    }
}
