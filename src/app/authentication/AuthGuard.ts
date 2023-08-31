import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const isLoggedIn = localStorage.getItem('isLoggedIn'); // Get the value from local storage

    if (isLoggedIn === 'true') {
      return true; // Allow navigation to the requested route
    } else {
      this.router.navigate(['/home']);
      return false; // Prevent navigation to the requested route
    }
  }
}
