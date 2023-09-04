import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JobApplication } from '../dashboard/job-application.model';

@Injectable({
  providedIn: 'root'
})
export class JobApplicationService {

  private baseUrl = 'http://localhost:8080/api/applications';

  constructor(private http: HttpClient) { }

  // Fetch all job applications
  getApplications(): Observable<JobApplication[]> {
    return this.http.get<JobApplication[]>(`${this.baseUrl}/all`);
  }

  // Fetch a single job application by ID
  getApplication(id: number): Observable<JobApplication> {
    return this.http.get<JobApplication>(`${this.baseUrl}/${id}`);
  }

  // Update an existing job application
  updateApplication(application: JobApplication): Observable<JobApplication> {
    return this.http.put<JobApplication>(`${this.baseUrl}/${application.id}`, application);
  }

  // Add a new job application
  addApplication(application: JobApplication): Observable<JobApplication> {
    return this.http.post<JobApplication>(this.baseUrl, application);
  }

  // Delete a job application by ID
  deleteApplication(id: number): Observable<void> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.delete<void>(url);
  }

  // Add a new method to fetch paginated applications
  getPaginatedApplications(page: number, size: number): Observable<JobApplication[]> {
    const params = new HttpParams().set('page', page.toString()).set('size', size.toString());
    return this.http.get<JobApplication[]>(`${this.baseUrl}/paged`, { params });
  }
}
