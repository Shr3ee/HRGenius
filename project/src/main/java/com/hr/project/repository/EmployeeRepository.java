package com.hr.project.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import com.hr.project.entity.Employee;

public interface EmployeeRepository extends JpaRepository<Employee, Long> {

    List<Employee> findByFnameContainingIgnoreCase(String fname);

}