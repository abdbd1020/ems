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

}
