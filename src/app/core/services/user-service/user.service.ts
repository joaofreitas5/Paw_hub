import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { User } from '../../../models/user.model'; // Adjust the import path as necessary

@Injectable({ providedIn: 'root' })
export class UserService {
  private apiUrl = '/api/users';

  constructor(private http: HttpClient) {}

  getCurrentUser(): User | null {
    const userJson = localStorage.getItem('user');
    return userJson ? JSON.parse(userJson) : null;
  }

  applyForRestaurant(userId: string): Observable<any> {
    return this.http.patch(`${this.apiUrl}/${userId}`, { pendingRestaurantApproval: true });
  }

  getPendingRestaurantUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}?pendingRestaurantApproval=true`);
  }

  approveRestaurant(userId: string): Observable<any> {
    return this.http.patch(`${this.apiUrl}/${userId}`, { 
      isValidated: true, 
      pendingRestaurantApproval: false,
      role: 'restaurant'
    });
  }

  rejectRestaurant(userId: string): Observable<any> {
    return this.http.patch(`${this.apiUrl}/${userId}`, { 
      isValidated: false, 
      pendingRestaurantApproval: false,
      role: 'user'
    });
  }

   getProfile(): Observable<any> {
    return this.http.get('/api/users/profile');
  }

}