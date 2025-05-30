import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Restaurant } from '../models/restaurant.model';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {

  constructor(private http: HttpClient) { }

  // ...existing methods...

  getPendingRestaurants(): Observable<Restaurant[]> {
    return this.http.get<Restaurant[]>('/restaurants/pending');
  }

  // ...existing methods...
}