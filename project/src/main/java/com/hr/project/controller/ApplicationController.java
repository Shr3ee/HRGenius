package com.hr.project.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.hr.project.entity.Application;
import com.hr.project.service.ApplicationService;

@RestController
@RequestMapping("/applications")
public class ApplicationController {

    @Autowired
    ApplicationService service;

    @GetMapping
    public List<Application> getApplications() {
        return service.getApplications();
    }

    @GetMapping("/fetch/{id}")
    public Application getApplication(@PathVariable long id) {
        return service.getApplication(id);
    }

    @PostMapping
    public Application createApplication(@RequestBody Application obj) {
        return service.registerApplication(obj);
    }

    @PutMapping
    public Application updateApplication(@RequestBody Application obj) {
        return service.updateApplication(obj);
    }

    @DeleteMapping("/{id}")
    public void deleteApplication(@PathVariable long id) {
        service.deleteApplication(id);
    }
}
