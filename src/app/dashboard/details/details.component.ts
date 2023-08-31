import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { JobApplicationService } from 'src/app/service/job-application.service';
import { JobApplication } from '../job-application.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from 'src/app/modal/modal/modal.component';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  application!: JobApplication; // Holds the details of the job application

  constructor(
    private router: Router, // Router for navigating between routes
    private route: ActivatedRoute, // Route for accessing route parameters
    private applicationService: JobApplicationService, // Service for managing job applications
    private modalService:NgbModal
    
  ) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id'); // Get the 'id' parameter from the route
    if (id !== null) {
      const applicationId = +id; // Convert the 'id' parameter to a number
      this.applicationService.getApplication(applicationId).subscribe(data => {
        this.application = data; // Fetch the application details based on the 'id'
      });
    } else {
      console.log("Application not found", console.error());
      this.modalService.open(ModalComponent).componentInstance.message='Application not found'; // Display an alert for application not found
      this.router.navigate(['/dashboard']); // Navigate back to the dashboard
    }
  }

  cancelView() {
    this.router.navigate(['/dashboard']); // Navigate back to the dashboard
  }
}