import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JobApplication } from '../job-application.model';
import { JobApplicationService } from 'src/app/service/job-application.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  applications!: JobApplication[]; // Array to store job applications

  constructor(
    private router: Router, 
    private applicationService: JobApplicationService
    ) { }

  ngOnInit() {
    this.applicationService.getApplications().subscribe(data => {
      this.applications = data; // Fetch and store job applications
    });
  }

  navigateToAdd() {
    this.router.navigate(['/add']); // Navigate to the add application page
  }

  navigateToDetails(id: number) {
    this.router.navigate(['/applications', id]); // Navigate to the details page of a specific application
  }
}
