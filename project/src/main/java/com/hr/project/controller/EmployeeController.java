package com.hr.project.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.hr.project.entity.Employee;
import com.hr.project.service.EmployeeService;

@RestController
@RequestMapping("/employees")
public class EmployeeController {

    @Autowired
    EmployeeService service;

    @GetMapping
    public List<Employee> getEmployees() {
        return service.getEmployees();
    }

    @GetMapping("/fetch/{id}")
    public Employee getEmployee(@PathVariable long id) {
        return service.getEmployee(id);
    }

    @GetMapping("/search")
    public List<Employee> searchEmployee(@RequestParam String fname) {
        return service.searchEmployee(fname);
    }
    
    @PostMapping
    public Employee createEmployee(@RequestBody Employee obj) {
        System.out.println(obj.getId());
        System.out.println(obj.getFname());
        return service.registerEmployee(obj);
    }

    @PutMapping
    public Employee updateEmployee(@RequestBody Employee obj) {
        return service.updateEmployee(obj);
    }

    @DeleteMapping("/{id}")
    public void deleteEmployee(@PathVariable long id) {
        service.deleteEmployee(id);
    }

    
}