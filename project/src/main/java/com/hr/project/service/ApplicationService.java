package com.hr.project.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hr.project.entity.Application;
import com.hr.project.repository.ApplicationRepository;

@Service
public class ApplicationService {

    @Autowired
    ApplicationRepository repository;

    public Application registerApplication(Application obj) {
        return repository.save(obj);
    }

    public List<Application> getApplications() {
        return repository.findAll();
    }

    public Application getApplication(long id) {
        return repository.findById(id).orElse(null);
    }

    public void deleteApplication(long id) {
        repository.deleteById(id);
    }

    public Application updateApplication(Application obj) {
        return repository.save(obj);
    }
}
