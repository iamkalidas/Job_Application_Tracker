import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { JobApplicationService } from 'src/app/service/job-application.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from 'src/app/modal/modal/modal.component';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css'],
})
export class AddComponent implements OnInit {
  
  addForm: FormGroup; // Form group for adding a job application

  constructor(
    private router: Router, // Router for navigating between routes
    private formBuilder: FormBuilder, // FormBuilder for creating form controls
    private applicationService: JobApplicationService, // Service for managing job applications
    private modalService: NgbModal
  ) {
    // Initialize the form group with fields and validators
    this.addForm = this.formBuilder.group({
      dateApplied: ['', Validators.required], // Date applied field with required validation
      company: ['', Validators.required], // Company field with required validation
      position: ['', Validators.required], // Position field with required validation
      applicationMethod: [''], // Application method field
      contactInfo: [''], // Contact information field
      status: [''], // Status field
      notes: [''], // Notes field
    });
  }

  ngOnInit() {
    // Initialize the form group with fields and validators
    this.addForm = this.formBuilder.group({
      dateApplied: ['', Validators.required], // Date applied field with required validation
      company: ['', Validators.required], // Company field with required validation
      position: ['', Validators.required], // Position field with required validation
      applicationMethod: ['', Validators.required], // Application method field with required validation
      contactInfo: ['', Validators.required], // Contact information field with required validation
      status: ['', Validators.required], // Status field with required validation
      notes: [''], // Notes field
    });
  }

  onSubmit() {
    if (this.addForm.valid) {
      this.modalService.open(ModalComponent).componentInstance.message = 'Application added successfully...!';

      // Check if the form is valid
      this.applicationService.addApplication(this.addForm.value).subscribe(() => {
          this.router.navigate(['/dashboard']); // Navigate to the dashboard after adding the application
        });
    }
  }

  cancelAddApp() {
    this.router.navigate(['/dashboard']);
  }
}
