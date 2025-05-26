import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Restaurant } from '../../../models/restaurant.model';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {
  private baseUrl = '/api/restaurants';

  constructor(private http: HttpClient) {}

  getMyRestaurant(): Observable<Restaurant> {
    return this.http.get<Restaurant>(`${this.baseUrl}/my`);
  }

  getRestaurantById(id: string): Observable<Restaurant> {
    return this.http.get<Restaurant>(`${this.baseUrl}/${id}`);
  }

  updateRestaurant(id: string, data: Partial<Restaurant>): Observable<Restaurant> {
    return this.http.put<Restaurant>(`${this.baseUrl}/${id}`, data);
  }

  createRestaurant(data: Partial<Restaurant>): Observable<Restaurant> {
    return this.http.post<Restaurant>(this.baseUrl, data);
  }
}