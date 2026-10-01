package com.hr.project.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hr.project.entity.Candidate;

public interface CandidateRepository extends JpaRepository<Candidate, Long> {

    List<Candidate> findByFnameContainingIgnoreCase(String fname);

}
