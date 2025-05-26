import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Restaurant } from '../models/restaurant.model';

@Injectable({ providedIn: 'root' })
export class AdminService {
  private baseUrl = '/api/admin';

  constructor(private http: HttpClient) {}

  getAllUsers(): Observable<any[]> {
    return this.http.get<any[]>('/admin/users');
  }

  promoteUser(id: string): Observable<any> {
    return this.http.post(`/admin/promote/${id}`, {});
  }

  demoteAdmin(id: string): Observable<any> {
    return this.http.post(`/admin/demote/${id}`, {});
  }

  validateRestaurant(id: string): Observable<any> {
    return this.http.post(`/admin/validate-restaurant/${id}`, {});
  }

  deleteUser(id: string): Observable<any> {
    return this.http.delete(`/admin/user/${id}`);
  }

  getPendingRestaurants(): Observable<Restaurant[]> {
    return this.http.get<Restaurant[]>(`${this.baseUrl}/pending-restaurants`);
  }

  approveRestaurant(id: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/approve-restaurant/${id}`, {});
  }

  rejectRestaurant(id: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/reject-restaurant/${id}`, {});
  }
}