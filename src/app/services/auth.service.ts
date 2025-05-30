import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { User } from '../models/user.model';

interface AuthResponse {
  token: string;
  user: User;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private api = '/api/auth'; // Atualizado para usar /api
  private tokenKey = 'paw_token';
  private userKey = 'paw_user';

  constructor(private http: HttpClient) {}

  private getHttpOptions() {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      withCredentials: true // Important for CORS with credentials
    };
  }

  login(email: string, password: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.api}/login`, { email, password }, this.getHttpOptions()).pipe(
      tap((res: AuthResponse) => {
        localStorage.setItem(this.tokenKey, res.token);
        localStorage.setItem(this.userKey, JSON.stringify(res.user));
      })
    );
  }

  register(user: Partial<User>): Observable<any> {
    // Ensure role is included
    const userData = {
      ...user,
      role: user.role || 'user'
    };
    return this.http.post(`${this.api}/register`, userData, this.getHttpOptions());
  }

  logout() {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.userKey);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  getUser(): User | null {
    const user = localStorage.getItem(this.userKey);
    return user ? JSON.parse(user) : null;
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  getUserRole(): string | null {
    const user = this.getUser();
    return user && user.role ? user.role : null;
  }
}
