import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from './auth-types';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:5000/api/auth';

  constructor(private http: HttpClient, private router: Router) {}

  login(user: User): void {
    this.http.post<{ token: string }>(`${this.apiUrl}/login`, user).subscribe({
      next: (response) => {
        localStorage.setItem('token', response.token);
        this.router.navigate(['/tasks']);
      },
    });
  }
  register(user: User): void {
    this.http
      .post<{ token: string }>(`${this.apiUrl}/register`, user)
      .subscribe({
        next: (response) => {
          this.router.navigate(['/login']);
        },
      });
  }
  logout(): void {
    localStorage.removeItem('token');
  }
}
