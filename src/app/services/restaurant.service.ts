import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Restaurant } from '../models/restaurant.model';

@Injectable({ providedIn: 'root' })
export class RestaurantService {
  private api = '/restaurants';

  constructor(private http: HttpClient) {}

  getRestaurants(): Observable<Restaurant[]> {
    return this.http.get<Restaurant[]>(this.api);
  }

  getRestaurant(id: string): Observable<Restaurant> {
    return this.http.get<Restaurant>(`${this.api}/${id}`);
  }

  createRestaurant(data: Partial<Restaurant>): Observable<Restaurant> {
    return this.http.post<Restaurant>(this.api, data);
  }

  updateRestaurant(id: string, data: Partial<Restaurant>): Observable<Restaurant> {
    return this.http.put<Restaurant>(`${this.api}/${id}`, data);
  }

  deleteRestaurant(id: string): Observable<any> {
    return this.http.delete(`${this.api}/${id}`);
  }

  getValidatedRestaurants(): Observable<Restaurant[]> {
    return this.http.get<Restaurant[]>(`${this.api}?validated=true`);
  }

  getPendingRestaurants(): Observable<Restaurant[]> {
    return this.http.get<Restaurant[]>('/restaurants/pending');
  }
}
