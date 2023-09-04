import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { JobApplication } from '../job-application.model';
import { JobApplicationService } from 'src/app/service/job-application.service';
import { AuthService } from 'src/app/service/auth.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from 'src/app/modal/modal/modal.component';
import { DeleteModalComponent } from 'src/app/modal/delete-modal/delete-modal.component';
import { MatPaginator, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  applications: JobApplication[] = []; // Array to store job applications
  serialCounter: number = 1;
  searchTerm: string = ''; // Property to store the search term
  currentPage = 0;
  pageSize = 10;
  totalItems = 0;
  
  @ViewChild(MatPaginator) paginator: MatPaginator;

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
    this.authservice.isLoggedIn = false;
    localStorage.clear();
    console.log('logged out');
    this.modalService.open(ModalComponent).componentInstance.message =
      'Successfully Logged out';
    this.router.navigate(['/home']);
  }

  applyJob() {
    this.router.navigate(['/dashboard/addApplications']); // Navigate to the add application page
  }

  fetchApplications() {
    this.applicationService
      .getPaginatedApplications(this.currentPage, this.pageSize)
      .subscribe(
        (data: any) => {
          this.applications = data.content; // Extract the 'content' property from the response
          this.totalItems = data.totalElements; // Extract the 'totalElements' property from the response
        },
        (error) => {
          console.error('Error fetching applications:', error);
        }
      );
  }

  onPageChange(event: PageEvent) {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.fetchApplications();
  }

  /*
  fetchApplications() {
    this.applicationService.getApplications().subscribe((data) => {
      this.applications = data; // Fetch and store job applications
    });
  }
  */

  // Function to filter applications based on search term
  filterApplications() {
    if (this.searchTerm) {
      this.applications = this.applications.filter(
        (application) =>
          application.company
            .toLowerCase()
            .includes(this.searchTerm.toLowerCase()) ||
          application.position
            .toLowerCase()
            .includes(this.searchTerm.toLowerCase()) ||
          application.status
            .toLowerCase()
            .includes(this.searchTerm.toLowerCase())
      );
    } else {
      // If the search term is empty, reset the application list to show all applications
      this.fetchApplications();
    }
  }

  addApplication(application: JobApplication) {
    this.applicationService.addApplication(application).subscribe(() => {
      this.fetchApplications(); // Add and fetch updated job applications
    });
  }

  deleteApplication(id: number) {
    this.applicationService.deleteApplication(id).subscribe(() => {
      this.applications = this.applications.filter((app) => app.id !== id); // Remove the deleted application from the list
      this.fetchApplications();
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
