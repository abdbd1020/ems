package com.ems.api.repository;

import com.ems.api.model.EMSUser;
import com.ems.api.model.Role;
import com.ems.api.model.Status;
import jakarta.persistence.EntityManager;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

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
        System.out.println(user.getId());

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
}
