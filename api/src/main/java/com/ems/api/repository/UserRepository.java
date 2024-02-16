package com.ems.api.repository;

import com.ems.api.model.EMSUser;
import com.ems.api.model.Role;
import com.ems.api.model.Student;
import jakarta.persistence.EntityManager;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;

@Repository
public class UserRepository {



    @Autowired
    private EntityManager entityManager;

    public EMSUser findByRole(Role role) {
        return entityManager.createQuery("SELECT u FROM EMSUser u WHERE u.role = :role", EMSUser.class)
                .setParameter("role", role)
                .getSingleResult();
    }
    public EMSUser findByName(String name) {
        return entityManager.createQuery("SELECT u FROM EMSUser u WHERE u.name = :name", EMSUser.class)
                .setParameter("name", name)
                .getSingleResult();
    }

    @Transactional
    public void saveUser(EMSUser user) {
        entityManager.persist(user);
    }

    @Transactional
    public void updateUser(EMSUser user) {

        entityManager.merge(user);
    }
    @Transactional

    public EMSUser getUserByEmail(String email) {

        return entityManager.createQuery("SELECT u FROM EMSUser u WHERE u.email = :email", EMSUser.class)
                .setParameter("email", email)
                .getSingleResult();
    }


    @Transactional
    public EMSUser findByEmail(String email) {
        return entityManager.createQuery("SELECT u FROM EMSUser u WHERE u.email = :email", EMSUser.class)
                .setParameter("email", email)
                .getSingleResult();
    }
}
