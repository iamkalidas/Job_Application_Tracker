import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JobApplication } from '../job-application.model';
import { JobApplicationService } from 'src/app/service/job-application.service';
import { AuthService } from 'src/app/service/auth.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from 'src/app/modal/modal/modal.component';
import { DeleteModalComponent } from 'src/app/modal/delete-modal/delete-modal.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  applications: JobApplication[] = []; // Array to store job applications
  serialCounter: number = 1;

  constructor(
    private router: Router, // Router for navigating between routes
    private applicationService: JobApplicationService, // Service for managing job applications
    private authservice: AuthService, // Service for authentication
    private modalService: NgbModal
  ) {}

  // Function called when component loads and gets all the job applications
  ngOnInit() {
    this.fetchApplications(); // Fetch and load job applications
  }

  onSubmit(form: any) {
    if (form.valid) {
      const newApplication: JobApplication = form.value; // Get the form values
      this.addApplication(newApplication); // Add the application
      form.resetForm(); // Reset the form
    }
  }

  logout() {
    // this.authservice.logout();
    this.authservice.isLoggedIn = false;
    localStorage.clear();
    console.log('logged out');
    this.modalService.open(ModalComponent).componentInstance.message ='Successfully Logged out';
    this.router.navigate(['/home']);
  }

  applyJob() {
    this.router.navigate(['/dashboard/addApplications']); // Navigate to the add application page
  }

  fetchApplications() {
    this.applicationService.getApplications().subscribe((data) => {
      this.applications = data; // Fetch and store job applications
    });
  }

  addApplication(application: JobApplication) {
    this.applicationService.addApplication(application).subscribe(() => {
      this.fetchApplications(); // Add and fetch updated job applications
    });
  }

  deleteApplication(id: number) {
    this.applicationService.deleteApplication(id).subscribe(() => {
      this.applications = this.applications.filter((app) => app.id !== id); // Remove the deleted application from the list
    });
  }

  openDeleteModal(application: JobApplication) {
    const modalRef = this.modalService.open(DeleteModalComponent);
    modalRef.componentInstance.application = application;

    modalRef.result.then((result) => {
      if (result === 'delete') {
        this.deleteApplication(application.id);
      }
    });
  }

  openDetailsModal(content: any) {
    // Open the modal using NgbModal
    this.modalService.open(content, { centered: true });
  }
}
