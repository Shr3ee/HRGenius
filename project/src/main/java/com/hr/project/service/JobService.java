package com.hr.project.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hr.project.entity.Job;
import com.hr.project.repository.JobRepository;

@Service
public class JobService {

    @Autowired
    JobRepository repository;

    public Job registerJob(Job obj) {
        return repository.save(obj);
    }

    public List<Job> getJobs() {
        return repository.findAll();
    }

    public Job getJob(long id) {
        return repository.findById(id).orElse(null);
    }

    public void deleteJob(long id) {
        repository.deleteById(id);
    }

    public Job updateJob(Job obj) {
        return repository.save(obj);
    }

    public List<Job> searchJob(String title) {
        return repository.findByTitleContainingIgnoreCase(title);
    }
}
