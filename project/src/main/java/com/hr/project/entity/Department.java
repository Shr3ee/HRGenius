package com.hr.project.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class Department {
    @Id
    long id;
    String name,location,managerName,contactNo,email;
    double budget;
    int employeeCount;
}