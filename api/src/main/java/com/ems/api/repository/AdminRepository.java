package com.ems.api.repository;

import com.ems.api.model.EMSUser;
import jakarta.persistence.EntityManager;
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
}
