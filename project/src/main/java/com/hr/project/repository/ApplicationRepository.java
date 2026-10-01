package com.hr.project.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hr.project.entity.Application;

public interface ApplicationRepository extends JpaRepository<Application, Long> {

}
