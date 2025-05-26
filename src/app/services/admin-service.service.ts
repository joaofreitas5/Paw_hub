import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AdminService {
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
}