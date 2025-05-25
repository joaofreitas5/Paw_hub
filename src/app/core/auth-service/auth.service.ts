import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  register(email: string, password: string, role: string = 'client'): boolean {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    // Verifica se já existe
    if (users.some((u: any) => u.email === email)) return false;
    users.push({ email, password, role });
    localStorage.setItem('users', JSON.stringify(users));
    return true;
  }

  login(email: string, password: string): boolean {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const found = users.find((u: any) => u.email === email && u.password === password);
    if (found) {
      localStorage.setItem('token', 'loggedIn');
      localStorage.setItem('currentUser', email);
      localStorage.setItem('role', found.role || 'client');
      return true;
    }
    return false;
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('currentUser');
    localStorage.removeItem('role');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  getCurrentUser(): string | null {
    return localStorage.getItem('currentUser');
  }

  getRole(): string | null {
    return localStorage.getItem('role');
  }
}