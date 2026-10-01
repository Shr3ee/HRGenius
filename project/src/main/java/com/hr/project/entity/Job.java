package com.hr.project.entity;

import java.time.LocalDate;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class Job {
	@Id
	long id;
	String title;
	String description;
	String department;
	String location;
	String employmentType;
	String experienceRequired;
	String salaryRange;
	int openings;
	LocalDate postedDate;
	String status;

	
}
