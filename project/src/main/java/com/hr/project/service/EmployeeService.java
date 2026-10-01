package com.hr.project.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hr.project.entity.Employee;
import com.hr.project.repository.EmployeeRepository;

@Service
public class EmployeeService {

    @Autowired
    EmployeeRepository repository;

    public Employee registerEmployee(Employee obj) {
        return repository.save(obj);
    }

    public List<Employee> getEmployees() {
        return repository.findAll();
    }

    public Employee getEmployee(long id) {
        return repository.findById(id).orElse(null);
    }

    public void deleteEmployee(long id) {
        repository.deleteById(id);
    }

    public Employee updateEmployee(Employee obj) {
        return repository.save(obj);
    }
    public List<Employee> searchEmployee(String fname) {
        return repository.findByFnameContainingIgnoreCase(fname);
    }
}