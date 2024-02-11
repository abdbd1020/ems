package com.ems.api.repository;

import com.ems.api.model.EMSUser;
import jakarta.persistence.EntityManager;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class UserRepository {
    @Autowired
    private EntityManager entityManager;

    @Transactional
    public EMSUser saveUser(EMSUser user) {
        entityManager.persist(user);
        return user;
    }
    public EMSUser getUserByName (String name) {

        return entityManager.createQuery("SELECT u FROM EMSUser u WHERE u.name = :name", EMSUser.class)
                .setParameter("name", name)
                .getSingleResult();
    }

    public void updateUser(EMSUser user) {

        entityManager.createQuery("UPDATE EMSUser u SET u.name = :name, u.email = :email, u.password = :password, u.phone = :phone WHERE u.id = :id")
                .setParameter("name", user.getName())
                .setParameter("email", user.getEmail())
                .setParameter("password", user.getPassword())
                .setParameter("phone", user.getPhone())
                .setParameter("id", user.getId())
                .executeUpdate();
    }
}
