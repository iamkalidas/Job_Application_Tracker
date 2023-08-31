import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { JobApplicationService } from 'src/app/service/job-application.service';
import { JobApplication } from '../job-application.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from 'src/app/modal/modal/modal.component';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  editForm: FormGroup; // Form group for editing a job application
  application!: JobApplication; // Holds the details of the job application being edited

  constructor(
    private route: ActivatedRoute, // Route for accessing route parameters
    private router: Router, // Router for navigating between routes
    private formBuilder: FormBuilder, // FormBuilder for creating form controls
    private applicationService: JobApplicationService, // Service for managing job applications
    private modalService: NgbModal
  ) {

    // Initialize the edit form with fields and validators
    this.editForm = this.formBuilder.group({
      dateApplied: ['', Validators.required], // Date applied field with required validation
      company: ['', Validators.required], // Company field with required validation
      position: ['', Validators.required], // Position field with required validation
      applicationMethod: [''], // Application method field
      contactInfo: [''], // Contact information field
      status: [''], // Status field
      notes: [''] // Notes field
    });
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id'); // Get the 'id' parameter from the route
    if (id !== null) {
      const applicationId = +id; // Convert the 'id' parameter to a number
      this.applicationService.getApplication(applicationId).subscribe(
        data => {
          this.application = data; // Fetch the application details based on the 'id'
          this.editForm.patchValue(this.application); // Populate the form with application data
          
        });
    } else {
      console.error("Application ID is missing..!");
      this.modalService.open(ModalComponent).componentInstance.message='Application ID is missing..!';
      this.router.navigate(['/home']); // Navigate back to the home page if 'id' is missing
    }
  }

  onSubmit() {
    if (this.editForm.valid && this.application) { // Check if the form is valid and an application is available
      const updatedApplication = { ...this.application, ...this.editForm.value }; // Merge updated values with existing application data
      this.modalService.open(ModalComponent).componentInstance.message='Application updated successfully..!';
      this.applicationService.updateApplication(updatedApplication).subscribe(() => {
        this.router.navigate(['/dashboard']); // Navigate to the dashboard after updating the application
      });
    }
  }
  
  cancelEdit(){
    this.router.navigate(['/dashboard']); // Navigate to the dashboard after updating the application
  }
}
