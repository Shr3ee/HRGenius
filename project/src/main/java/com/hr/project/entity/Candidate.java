package com.hr.project.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class Candidate {
    @Id
    long id;
    String fname,lname,email,contactNo,resume,skills,experience,education,appliedDate,status;
}
