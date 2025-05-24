import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);
  private router = inject(Router);
  private userRole: 'client' | 'restaurant' | 'admin' | null = null;

  login(credentials: { username: string; password: string }) {
    return this.http
      .post<{ role: string }>('/api/auth/login', credentials)
      .pipe(
        tap((res) => {
          this.userRole = res.role as any;
          localStorage.setItem('userRole', this.userRole);
        })
      );
  }

  register(data: any) {
    return this.http.post('/api/auth/register', data);
  }

  logout() {
    return this.http.post('/api/auth/logout', {}).subscribe(() => {
      this.userRole = null;
      localStorage.removeItem('userRole');
      this.router.navigate(['/login']);
    });
  }

  getRole() {
    if (!this.userRole) {
      this.userRole = localStorage.getItem('userRole') as any;
    }
    return this.userRole;
  }
  
  isLoggedIn() {
    if (!this.userRole) {
      this.userRole = localStorage.getItem('userRole') as any;
    }
    return !!this.userRole;
  }
}
