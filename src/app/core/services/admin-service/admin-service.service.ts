import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AdminService {
  constructor(private http: HttpClient) {}

  getPendingRestaurants(): Observable<any[]> {
    return this.http.get<any[]>('/api/admin/pendingRestaurants');
  }

  approveRestaurant(id: string) {
    return this.http.post(`/api/admin/validateRestaurant`, { id, action: 'approve' });
  }

  rejectRestaurant(id: string) {
    return this.http.post(`/api/admin/validateRestaurant`, { id, action: 'reject' });
  }

  getAllUsers(): Observable<any[]> {
    return this.http.get<any[]>('/api/admin/users');
  }
}