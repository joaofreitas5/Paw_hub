import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private tokenKey = 'jwt_token';
  private userKey = 'user_data';

  constructor(private http: HttpClient) {}

  register(user: any): Observable<any> {
    return this.http.post('/api/users/register', user);
  }

  login(credentials: any): Observable<any> {
    return new Observable(observer => {
      this.http.post<any>('/api/login', credentials).subscribe({
        next: (res) => {
          if (res.token && res.user) {
            localStorage.setItem(this.tokenKey, res.token);
            localStorage.setItem(this.userKey, JSON.stringify(res.user));
          }
          observer.next(res);
          observer.complete();
        },
        error: (err) => observer.error(err)
      });
    });
  }

  logout() {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.userKey);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem(this.tokenKey);
  }

  getUser(): any {
    const userStr = localStorage.getItem(this.userKey);
    return userStr ? JSON.parse(userStr) : null;
  }

  // Opcional: para headers autenticados
  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }
}