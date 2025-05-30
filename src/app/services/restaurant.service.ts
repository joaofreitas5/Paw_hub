import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Restaurant } from '../models/restaurant.model';

@Injectable({ providedIn: 'root' })
export class RestaurantService {
  private api = '/restaurants';

  constructor(private http: HttpClient) {}

  private getAuthHeaders() {
    const token = localStorage.getItem('paw_token');
    return token
      ? { headers: new HttpHeaders({ Authorization: `Bearer ${token}` }) }
      : {};
  }

  getRestaurants(): Observable<Restaurant[]> {
    return this.http.get<Restaurant[]>(this.api, this.getAuthHeaders());
  }

  getRestaurant(id: string): Observable<Restaurant> {
    return this.http.get<Restaurant>(`${this.api}/${id}`, this.getAuthHeaders());
  }

  createRestaurant(data: Partial<Restaurant>): Observable<Restaurant> {
    return this.http.post<Restaurant>(this.api, data, this.getAuthHeaders());
  }

  updateRestaurant(id: string, data: Partial<Restaurant>): Observable<Restaurant> {
    return this.http.put<Restaurant>(`${this.api}/${id}`, data, this.getAuthHeaders());
  }

  deleteRestaurant(id: string): Observable<any> {
    return this.http.delete(`${this.api}/${id}`, this.getAuthHeaders());
  }

  getValidatedRestaurants(): Observable<Restaurant[]> {
    return this.http.get<Restaurant[]>(`${this.api}?validated=true`, this.getAuthHeaders());
  }

  getPendingRestaurants() {
    return this.http.get<Restaurant[]>('/restaurants/pending', this.getAuthHeaders());
  }

  approveRestaurant(id: string) {
    return this.http.post(`/admin/validate-restaurant/${id}`, {}, this.getAuthHeaders());
  }

  rejectRestaurant(id: string) {
    return this.http.post(`/admin/reject-restaurant/${id}`, {}, this.getAuthHeaders());
  }

  // Listar utilizadores pendentes de aprovação para restaurante
  getPendingRestaurantUsers() {
    return this.http.get<any[]>('/admin/pending-restaurant-users', this.getAuthHeaders());
  }

  approveRestaurantUser(id: string) {
    return this.http.post(`/admin/approve-restaurant-user/${id}`, {}, this.getAuthHeaders());
  }

  rejectRestaurantUser(id: string) {
    return this.http.post(`/admin/reject-restaurant-user/${id}`, {}, this.getAuthHeaders());
  }

  getProtectedData() {
    return this.http.get('/admin/pending-restaurant-users', this.getAuthHeaders());
  }
}
