package com.hr.project.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hr.project.entity.Job;

public interface JobRepository extends JpaRepository<Job, Long> {

    List<Job> findByTitleContainingIgnoreCase(String title);

}
