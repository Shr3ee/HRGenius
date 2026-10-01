package com.hr.project.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hr.project.entity.Candidate;
import com.hr.project.repository.CandidateRepository;

@Service
public class CandidateService {

    @Autowired
    CandidateRepository repository;

    public Candidate registerCandidate(Candidate obj) {
        return repository.save(obj);
    }

    public List<Candidate> getCandidates() {
        return repository.findAll();
    }

    public Candidate getCandidate(long id) {
        return repository.findById(id).orElse(null);
    }

    public void deleteCandidate(long id) {
        repository.deleteById(id);
    }

    public Candidate updateCandidate(Candidate obj) {
        return repository.save(obj);
    }

    public List<Candidate> searchCandidate(String fname) {
        return repository.findByFnameContainingIgnoreCase(fname);
    }
}
