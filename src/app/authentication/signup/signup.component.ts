import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { ValidatorFn, AbstractControl, FormGroup, FormBuilder, Validators, } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from 'src/app/modal/modal/modal.component';

// Custom validator function for mobile number
function mobileNumberValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const isValid = /^\d{10}$/.test(control.value);
    return isValid ? null : { invalidMobile: { value: control.value } };
  };
}

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})

export class SignupComponent implements OnInit {
  registrationForm!: FormGroup; // Form group for registration form

  constructor(
    private fb: FormBuilder, // FormBuilder for creating form controls
    private authService: AuthService, // Service for authentication
    private modalService:NgbModal
  ) { }

  ngOnInit() {
    // Initialize the registration form with fields and validators
    this.registrationForm = this.fb.group({
      name: ['', Validators.required], // Name field with required validation
      email: ['', [Validators.required, Validators.email]], // Email field with required and email format validation
      mobile: ['', [Validators.required, mobileNumberValidator()]], // Mobile field with required and custom validator
      username: ['', Validators.required], // Username field with required validation
      password: ['', [Validators.required, Validators.minLength(6)]], // Password field with required and min length (6) validation
    });
  }

  onSubmit() {
    if (this.registrationForm.valid) {
      // Check if the form is valid
      const user = this.registrationForm.value; // Get user data from form

      // Check if the user already exists by username or email
      this.authService.checkUserExists(user.username, user.email).subscribe(
        (exists) => {
          if (exists) {
            console.log('User already exists');
            this.modalService.open(ModalComponent).componentInstance.message='User already exists';
            
          } else {
            // User doesn't exist, proceed with registration
            this.authService.registerUser(user).subscribe(
              (response) => {
                console.log('Registration successful:', response);
                this.modalService.open(ModalComponent).componentInstance.message='Congratulations, Registration successful..!✌️';
                this.registrationForm.reset(); // Reset the form after successful registration
              },
              
              (error) => {
                console.error('Registration error:', error);
                this.modalService.open(ModalComponent).componentInstance.message='Registration failed...!';
              }
            );
          }
        },

        (error) => {
          console.error('Error checking user existence:', error);
          this.modalService.open(ModalComponent).componentInstance.message='Error checking user existence';
        }
      );
    }
  }
}
