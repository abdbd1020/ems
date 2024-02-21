package com.ems.api.repository;

import com.ems.api.model.Department;
import jakarta.persistence.EntityManager;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;

@Repository
public class DepartmentRepository {
    @Autowired
    private EntityManager entityManager;

    public ArrayList<Department> getAllDepartments() {
        return (ArrayList<Department>) entityManager.createQuery("SELECT d FROM Department d", Department.class).getResultList();
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
