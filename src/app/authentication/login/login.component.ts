import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../service/auth.service';
import { Subscription } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from 'src/app/modal/modal/modal.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit, OnDestroy {

  loginForm!: FormGroup; // Form group for login form
  userName: string = ''; // User's entered username
  private subscription: Subscription = new Subscription(); // Subscription for managing observable subscriptions

  constructor(
    private fb: FormBuilder, // FormBuilder for creating form controls
    private authService: AuthService, // Service for authentication
    private router: Router, // Router for navigating between routes
    private modalService: NgbModal
  ) {}

  ngOnInit() {
    this.initLoginForm(); // Initialize the login form
  }

  ngOnDestroy() {
    this.subscription.unsubscribe(); // Unsubscribe from all observables when component is destroyed
  }

  private initLoginForm() {
    // Initialize the login form with username and password fields, along with validators
    this.loginForm = this.fb.group({
      username: ['', Validators.required], // Username field with required validation
      password: ['', Validators.required], // Password field with required validation
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;
      this.subscription.add(
        this.authService.login(username, password).subscribe(
          () => {
            console.log('Login successful');
            this.modalService.open(ModalComponent).componentInstance.message ='Login successful...';
            this.router.navigate(['/dashboard']);
          },
          
          (error) => {
            console.error('Login error:', error);
            this.modalService.open(ModalComponent).componentInstance.message ='Login failed...';
            this.loginForm.reset();
          }
        )
      );
    }
  }
}
