package com.hr.project.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hr.project.entity.Department;
import com.hr.project.repository.DepartmentRepository;

@Service
public class DepartmentService {

    @Autowired
    DepartmentRepository repository;

    public Department registerDepartment(Department obj) {
        return repository.save(obj);
    }

    public List<Department> getDepartments() {
        return repository.findAll();
    }

    public Department getDepartment(long id) {
        return repository.findById(id).orElse(null);
    }

    public void deleteDepartment(long id) {
        repository.deleteById(id);
    }

    public Department updateDepartment(Department obj) {
        return repository.save(obj);
    }
    public List<Department> searchDepartment(String name) {
        return repository.findByNameContainingIgnoreCase(name);
    }
}