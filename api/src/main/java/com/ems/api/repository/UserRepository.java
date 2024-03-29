package com.ems.api.repository;

import com.ems.api.model.EMSUser;
import com.ems.api.model.Role;
import com.ems.api.model.Status;
import jakarta.persistence.EntityManager;
import jakarta.transaction.Transactional;
import org.jetbrains.annotations.NotNull;
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
    public void saveUser(@NotNull EMSUser user) {
        entityManager.persist(user);
    }

    @Transactional
    public void updateUser(EMSUser user) {

        entityManager.merge(user);
    }
    public EMSUser getUserByEmail(String email) {
        return entityManager.createQuery("SELECT u FROM EMSUser u WHERE u.email = :email", EMSUser.class)
                .setParameter("email", email)
                .getSingleResult();
    }


    public EMSUser findByEmail(String email) {
        System.out.println(email);
        return entityManager.createQuery("SELECT u FROM EMSUser u WHERE u.email = :email", EMSUser.class)
                .setParameter("email", email)
                .getSingleResult();
    }
    public ArrayList<EMSUser> getAllInActiveAndGuestUsers() {
        return (ArrayList<EMSUser>) entityManager.createQuery("SELECT u FROM EMSUser u WHERE u.status = :status OR u.role = :role", EMSUser.class)
                .setParameter("status", Status.INACTIVE)
                .setParameter("role", Role.GUEST)
                .getResultList();
    }


    public ArrayList<EMSUser> getInactiveUsers() {
        return (ArrayList<EMSUser>) entityManager.createQuery("SELECT u FROM EMSUser u WHERE u.status = :status", EMSUser.class)
                .setParameter("status", Status.INACTIVE).getResultList();


    }
    public ArrayList<EMSUser> getAllUsersByRole(Role role) {
        return (ArrayList<EMSUser>) entityManager.createQuery("SELECT u FROM EMSUser u WHERE u.role = :role", EMSUser.class)
                .setParameter("role", role)
                .getResultList();
    }
    public ArrayList<EMSUser> getAllUsers() {
        return (ArrayList<EMSUser>) entityManager.createQuery("SELECT u FROM EMSUser u", EMSUser.class).getResultList();
//
    }
}
