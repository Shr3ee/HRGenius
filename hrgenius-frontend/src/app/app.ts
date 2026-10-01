import { Component, signal, computed, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
export interface NavItem {
  id: string;
  label: string;
  icon: string;
}

export interface ModuleStat {
  id: string;
  title: string;
  count: string;
  subtext: string;
  icon: string;
}

// Entity models matching com.hr.project.entity in Spring Boot backend
export interface Employee {
  id: number;
  fname: string;
  lname: string;
  contactno: string;
  email: string;
  gender: string;
  dob: string;
  address: string;
  designation: string;
  salary: number;
  joiningDate: string;
  status: string;
  department: string;
}

export interface Department {
  id: number;
  name: string;
  location: string;
  managerName: string;
  contactNo: string;
  email: string;
  budget: number;
  employeeCount: number;
}

export interface Job {
  id: number;
  title: string;
  description: string;
  department: string;
  location: string;
  employmentType: string;
  experienceRequired: string;
  salaryRange: string;
  openings: number;
  postedDate: string;
  status: string;
}

export interface Candidate {
  id: number;
  fname: string;
  lname: string;
  email: string;
  contactNo: string;
  resume: string;
  skills: string;
  experience: string;
  education: string;
  appliedDate: string;
  status: string;
}

export interface Application {
  id: number;
  candidateId: number;
  jobId: number;
  applicationDate: string;
  status: string;
  interviewDate: string;
  interviewStatus: string;
  remarks: string;
}

@Component({
  selector: 'app-root',
  imports: [],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit{
  // Navigation State
  constructor(private http: HttpClient) {}
  readonly activeNav = signal<string>('Dashboard');
  readonly isSidebarOpenMobile = signal<boolean>(false);
  readonly searchQuery = signal<string>('');

  // Navigation Items matching project modules
  readonly navItems: NavItem[] = [
    { id: 'Dashboard', label: 'Dashboard', icon: 'dashboard' },
    { id: 'Employees', label: 'Employees', icon: 'employees' },
    { id: 'Departments', label: 'Departments', icon: 'departments' },
    { id: 'Jobs', label: 'Jobs', icon: 'jobs' },
    { id: 'Candidates', label: 'Candidates', icon: 'candidates' },
    { id: 'Applications', label: 'Applications', icon: 'applications' },
  ];

  // Core Module Overview Cards (neutral values representing actual project modules)
  // Entity data stores populated from the configured REST endpoints.
  readonly employees = signal<Employee[]>([]);
  readonly editingEmployee = signal<Employee | null>(null);
  readonly departments = signal<Department[]>([]);
  readonly editingDepartment = signal<Department | null>(null);
  readonly jobs = signal<Job[]>([]);
  readonly editingJob = signal<Job | null>(null);
  readonly candidates = signal<Candidate[]>([]);
  readonly editingCandidate = signal<Candidate | null>(null);
  readonly applications = signal<Application[]>([]);
  readonly editingApplication = signal<Application | null>(null);

  readonly moduleStats = computed<ModuleStat[]>(() => [
    { id: 'Employees', title: 'Employees', count: String(this.employees().length), subtext: 'Registered employee records', icon: 'employees' },
    { id: 'Departments', title: 'Departments', count: String(this.departments().length), subtext: 'Active departments', icon: 'departments' },
    { id: 'Jobs', title: 'Jobs', count: String(this.jobs().length), subtext: 'Published job requisitions', icon: 'jobs' },
    { id: 'Candidates', title: 'Candidates', count: String(this.candidates().length), subtext: 'Candidate profiles', icon: 'candidates' },
    { id: 'Applications', title: 'Applications', count: String(this.applications().length), subtext: 'Submitted applications', icon: 'applications' },
  ]);

  // Filtered queries based on search input
  readonly filteredEmployees = computed(() => {
    const q = this.searchQuery().toLowerCase().trim();
    if (!q) return this.employees();
    return this.employees().filter(e => 
      e.fname?.toLowerCase().includes(q) || 
      e.lname?.toLowerCase().includes(q) || 
      e.email?.toLowerCase().includes(q) ||
      e.department?.toLowerCase().includes(q) ||
      e.designation?.toLowerCase().includes(q)
    );
  });

  readonly filteredDepartments = computed(() => {
    const q = this.searchQuery().toLowerCase().trim();
    if (!q) return this.departments();
    return this.departments().filter(d => 
      d.name?.toLowerCase().includes(q) || 
      d.location?.toLowerCase().includes(q) || 
      d.managerName?.toLowerCase().includes(q) ||
      d.email?.toLowerCase().includes(q) ||
      d.contactNo?.toLowerCase().includes(q)
    );
  });

  readonly filteredJobs = computed(() => {
    const q = this.searchQuery().toLowerCase().trim();
    if (!q) return this.jobs();
    return this.jobs().filter(j => 
      j.title?.toLowerCase().includes(q) || 
      j.department?.toLowerCase().includes(q) || 
      j.location?.toLowerCase().includes(q) ||
      j.status?.toLowerCase().includes(q)
    );
  });

  readonly filteredCandidates = computed(() => {
    const q = this.searchQuery().toLowerCase().trim();
    if (!q) return this.candidates();
    return this.candidates().filter(c => 
      c.fname?.toLowerCase().includes(q) || 
      c.lname?.toLowerCase().includes(q) || 
      c.email?.toLowerCase().includes(q) ||
      c.contactNo?.toLowerCase().includes(q) ||
      c.skills?.toLowerCase().includes(q)
    );
  });

  readonly filteredApplications = computed(() => {
    const q = this.searchQuery().toLowerCase().trim();
    if (!q) return this.applications();
    return this.applications().filter(a => 
      a.status?.toLowerCase().includes(q) || 
      a.interviewStatus?.toLowerCase().includes(q) ||
      a.remarks?.toLowerCase().includes(q) ||
      String(a.candidateId).includes(q) ||
      String(a.jobId).includes(q)
    );
  });

  // Navigation and UI Actions
  selectNav(navId: string): void {
    this.activeNav.set(navId);
    this.isSidebarOpenMobile.set(false);
    this.searchQuery.set('');
  }

  toggleMobileSidebar(): void {
    this.isSidebarOpenMobile.update(open => !open);
  }

  closeMobileSidebar(): void {
    this.isSidebarOpenMobile.set(false);
  }

  onSearch(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.searchQuery.set(target.value);
  }
  loadEmployees() {
    this.http.get<Employee[]>('/api/employees').subscribe(data => {
        this.employees.set(data);
    });
  }
  addEmployee(
  fname: string,
  lname: string,
  contactno: string,
  email: string,
  gender: string,
  dob: string,
  address: string,
  designation: string,
  salary: string,
  joiningDate: string,
  status: string,
  department: string
  ) {
  const employee = {
    fname,
    lname,
    contactno,
    email,
    gender,
    dob,
    address,
    designation,
    salary: Number(salary),
    joiningDate,
    status,
    department
  };
  

  this.http.post<Employee>('/api/employees', employee).subscribe(data => {
    this.employees.update(employees => [...employees, data]);
  });
}
  editEmployee(emp: Employee) {
  this.editingEmployee.set(emp);
}
  updateEmployee(
  id: number,
  fname: string,
  lname: string,
  contactno: string,
  email: string,
  gender: string,
  dob: string,
  address: string,
  designation: string,
  salary: string,
  joiningDate: string,
  status: string,
  department: string
) {
  const employee = {
    id,
    fname,
    lname,
    contactno,
    email,
    gender,
    dob,
    address,
    designation,
    salary: Number(salary),
    joiningDate,
    status,
    department
  };

  this.http.put<Employee>('/api/employees', employee).subscribe(data => {
    this.employees.update(employees =>
      employees.map(emp => emp.id === data.id ? data : emp)
    );
    this.editingEmployee.set(null);
  });
}
deleteEmployee(id: number) {
  this.http.delete(`/api/employees/${id}`).subscribe(() => {
    this.employees.update(employees =>
      employees.filter(emp => emp.id !== id)
    );
  });
}

  loadDepartments(): void {
    this.http.get<Department[]>('/api/departments').subscribe(data => this.departments.set(data));
  }

  saveDepartment(form: HTMLFormElement): void {
    const values = new FormData(form);
    const department: Department = {
      id: Number(values.get('id')),
      name: String(values.get('name') ?? ''),
      location: String(values.get('location') ?? ''),
      managerName: String(values.get('managerName') ?? ''),
      contactNo: String(values.get('contactNo') ?? ''),
      email: String(values.get('email') ?? ''),
      budget: Number(values.get('budget')),
      employeeCount: Number(values.get('employeeCount'))
    };
    const isEditing = this.editingDepartment() !== null;
    const request = isEditing
      ? this.http.put<Department>('/api/departments', department)
      : this.http.post<Department>('/api/departments', department);

    request.subscribe(saved => {
      this.departments.update(items => isEditing
        ? items.map(item => item.id === saved.id ? saved : item)
        : [...items, saved]);
      this.editingDepartment.set(null);
      form.reset();
    });
  }

  editDepartment(department: Department): void {
    this.editingDepartment.set(department);
  }

  cancelDepartmentEdit(form: HTMLFormElement): void {
    this.editingDepartment.set(null);
    form.reset();
  }

  deleteDepartment(id: number): void {
    this.http.delete(`/api/departments/${id}`).subscribe(() => {
      this.departments.update(items => items.filter(item => item.id !== id));
      if (this.editingDepartment()?.id === id) this.editingDepartment.set(null);
    });
  }

  loadJobs(): void {
    this.http.get<Job[]>('/api/jobs').subscribe(data => this.jobs.set(data));
  }

  saveJob(form: HTMLFormElement): void {
    const values = new FormData(form);
    const job: Job = {
      id: this.editingJob()?.id ?? Number(values.get('id')),
      title: String(values.get('title') ?? ''),
      description: String(values.get('description') ?? ''),
      department: String(values.get('department') ?? ''),
      location: String(values.get('location') ?? ''),
      employmentType: String(values.get('employmentType') ?? ''),
      experienceRequired: String(values.get('experienceRequired') ?? ''),
      salaryRange: String(values.get('salaryRange') ?? ''),
      openings: Number(values.get('openings')),
      postedDate: String(values.get('postedDate') ?? ''),
      status: String(values.get('status') ?? '')
    };
    const isEditing = this.editingJob() !== null;
    const request = isEditing
      ? this.http.put<Job>('/api/jobs', job)
      : this.http.post<Job>('/api/jobs', job);

    request.subscribe(saved => {
      this.jobs.update(items => isEditing
        ? items.map(item => item.id === saved.id ? saved : item)
        : [...items, saved]);
      this.editingJob.set(null);
      form.reset();
    });
  }

  editJob(job: Job): void {
  console.log('Editing job:', job);
  this.editingJob.set(job);
}

  cancelJobEdit(form: HTMLFormElement): void {
    this.editingJob.set(null);
    form.reset();
  }

  deleteJob(id: number): void {
    this.http.delete(`/api/jobs/${id}`).subscribe(() => {
      this.jobs.update(items => items.filter(item => item.id !== id));
      if (this.editingJob()?.id === id) this.editingJob.set(null);
    });
  }

  loadCandidates(): void {
    this.http.get<Candidate[]>('/api/candidates').subscribe(data => this.candidates.set(data));
  }

  saveCandidate(form: HTMLFormElement): void {
    const values = new FormData(form);
    const candidate: Candidate = {
      id: Number(values.get('id')),
      fname: String(values.get('fname') ?? ''),
      lname: String(values.get('lname') ?? ''),
      email: String(values.get('email') ?? ''),
      contactNo: String(values.get('contactNo') ?? ''),
      resume: String(values.get('resume') ?? ''),
      skills: String(values.get('skills') ?? ''),
      experience: String(values.get('experience') ?? ''),
      education: String(values.get('education') ?? ''),
      appliedDate: String(values.get('appliedDate') ?? ''),
      status: String(values.get('status') ?? '')
    };
    const isEditing = this.editingCandidate() !== null;
    const request = isEditing
      ? this.http.put<Candidate>('/api/candidates', candidate)
      : this.http.post<Candidate>('/api/candidates', candidate);

    request.subscribe(saved => {
      this.candidates.update(items => isEditing
        ? items.map(item => item.id === saved.id ? saved : item)
        : [...items, saved]);
      this.editingCandidate.set(null);
      form.reset();
    });
  }

  editCandidate(candidate: Candidate): void {
    this.editingCandidate.set(candidate);
  }

  cancelCandidateEdit(form: HTMLFormElement): void {
    this.editingCandidate.set(null);
    form.reset();
  }

  deleteCandidate(id: number): void {
    this.http.delete(`/api/candidates/${id}`).subscribe(() => {
      this.candidates.update(items => items.filter(item => item.id !== id));
      if (this.editingCandidate()?.id === id) this.editingCandidate.set(null);
    });
  }

  loadApplications(): void {
    this.http.get<Application[]>('/api/applications').subscribe(data => this.applications.set(data));
  }

  saveApplication(form: HTMLFormElement): void {
    const values = new FormData(form);
    const application: Application = {
      id: Number(values.get('id')),
      candidateId: Number(values.get('candidateId')),
      jobId: Number(values.get('jobId')),
      applicationDate: String(values.get('applicationDate') ?? ''),
      status: String(values.get('status') ?? ''),
      interviewDate: String(values.get('interviewDate') ?? ''),
      interviewStatus: String(values.get('interviewStatus') ?? ''),
      remarks: String(values.get('remarks') ?? '')
    };
    const isEditing = this.editingApplication() !== null;
    const request = isEditing
      ? this.http.put<Application>('/api/applications', application)
      : this.http.post<Application>('/api/applications', application);

    request.subscribe(saved => {
      this.applications.update(items => isEditing
        ? items.map(item => item.id === saved.id ? saved : item)
        : [...items, saved]);
      this.editingApplication.set(null);
      form.reset();
    });
  }

  editApplication(application: Application): void {
    this.editingApplication.set(application);
  }

  cancelApplicationEdit(form: HTMLFormElement): void {
    this.editingApplication.set(null);
    form.reset();
  }

  deleteApplication(id: number): void {
    this.http.delete(`/api/applications/${id}`).subscribe(() => {
      this.applications.update(items => items.filter(item => item.id !== id));
      if (this.editingApplication()?.id === id) this.editingApplication.set(null);
    });
  }

  ngOnInit() {
    this.loadEmployees();
    this.loadDepartments();
    this.loadJobs();
    this.loadCandidates();
    this.loadApplications();
  }
}
