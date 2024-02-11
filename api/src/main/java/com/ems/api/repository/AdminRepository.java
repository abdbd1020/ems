package com.ems.api.repository;

import com.ems.api.model.EMSUser;
import jakarta.persistence.EntityManager;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;

@Repository
public class AdminRepository {
    @Autowired
    private EntityManager entityManager;

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
}
