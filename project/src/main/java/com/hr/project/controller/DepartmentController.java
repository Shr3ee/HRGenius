package com.hr.project.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.hr.project.entity.Department;
import com.hr.project.service.DepartmentService;

@RestController
@RequestMapping("/departments")
public class DepartmentController {

    @Autowired
    DepartmentService service;

    @GetMapping
    public List<Department> getDepartments() {
        return service.getDepartments();
    }

    @GetMapping("/fetch/{id}")
    public Department getDepartment(@PathVariable long id) {
        return service.getDepartment(id);
    }

    @GetMapping("/search")
    public List<Department> searchDepartment(@RequestParam String name) {
        return service.searchDepartment(name);
    }

    @PostMapping
    public Department createDepartment(@RequestBody Department obj) {
        return service.registerDepartment(obj);
    }

    @PutMapping
    public Department updateDepartment(@RequestBody Department obj) {
        return service.updateDepartment(obj);
    }

    @DeleteMapping("/{id}")
    public void deleteDepartment(@PathVariable long id) {
        service.deleteDepartment(id);
    }
}