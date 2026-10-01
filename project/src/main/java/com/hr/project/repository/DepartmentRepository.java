package com.hr.project.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import com.hr.project.entity.Department;

public interface DepartmentRepository extends JpaRepository<Department, Long> {

    List<Department> findByNameContainingIgnoreCase(String name);

}