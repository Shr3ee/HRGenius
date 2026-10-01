package com.hr.project.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.hr.project.entity.Candidate;
import com.hr.project.service.CandidateService;

@RestController
@RequestMapping("/candidates")
public class CandidateController {

    @Autowired
    CandidateService service;

    @GetMapping
    public List<Candidate> getCandidates() {
        return service.getCandidates();
    }

    @GetMapping("/fetch/{id}")
    public Candidate getCandidate(@PathVariable long id) {
        return service.getCandidate(id);
    }

    @GetMapping("/search")
    public List<Candidate> searchCandidate(@RequestParam String fname) {
        return service.searchCandidate(fname);
    }

    @PostMapping
    public Candidate createCandidate(@RequestBody Candidate obj) {
        return service.registerCandidate(obj);
    }

    @PutMapping
    public Candidate updateCandidate(@RequestBody Candidate obj) {
        return service.updateCandidate(obj);
    }

    @DeleteMapping("/{id}")
    public void deleteCandidate(@PathVariable long id) {
        service.deleteCandidate(id);
    }
}
