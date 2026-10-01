package com.hr.project.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class Application {
    @Id
    long id;
    long candidateId, jobId;
    String applicationDate, status, interviewDate, interviewStatus, remarks;
}
