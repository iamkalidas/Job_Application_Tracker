import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/api/users';

  public isLoggedIn: boolean = false;

  constructor(private http: HttpClient) {}

  // Check if a user with the given username or email exists
  checkUserExists(username: string, email: string): Observable<boolean> {
    const url = `${this.apiUrl}/exists?username=${username}&email=${email}`;
    return this.http.get<boolean>(url);
  }

  // Register a new user
  registerUser(user: any): Observable<any> {
    const url = `${this.apiUrl}/register`;
    return this.http.post(url, user);
  }

  // Log in the user and store the token in a cookie
  login(username: string, password: string): Observable<any> {
    this.isLoggedIn = true;
    localStorage.setItem('isLoggedIn', JSON.stringify(this.isLoggedIn));
    const url = `${this.apiUrl}/login`;
    const body = { username, password };
    return this.http.post(url, body);
  }
}
