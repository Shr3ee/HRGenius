package com.hr.project.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.hr.project.entity.Job;
import com.hr.project.service.JobService;

@RestController
@RequestMapping("/jobs")
public class JobController {

    @Autowired
    JobService service;

    @GetMapping
    public List<Job> getJobs() {
        return service.getJobs();
    }

    @GetMapping("/fetch/{id}")
    public Job getJob(@PathVariable long id) {
        return service.getJob(id);
    }

    @GetMapping("/search")
    public List<Job> searchJob(@RequestParam String title) {
        return service.searchJob(title);
    }

    @PostMapping
    public Job createJob(@RequestBody Job obj) {
        return service.registerJob(obj);
    }

    @PutMapping
    public Job updateJob(@RequestBody Job obj) {
        return service.updateJob(obj);
    }

    @DeleteMapping("/{id}")
    public void deleteJob(@PathVariable long id) {
        service.deleteJob(id);
    }
}
