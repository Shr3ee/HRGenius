package com.hr.project.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class Employee {
    @Id
    long id;
    String fname,lname,contactno,email;
    String gender,dob,address,designation;
    double salary;
    String joiningDate,status,department;
}