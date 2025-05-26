import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Dish } from '../models/dish.model';

@Injectable({ providedIn: 'root' })
export class DishService {
  private api = '/dishes';

  constructor(private http: HttpClient) {}

  getDishes(params?: any): Observable<Dish[]> {
    return this.http.get<Dish[]>(this.api, { params });
  }

  getDish(id: string): Observable<Dish> {
    return this.http.get<Dish>(`${this.api}/${id}`);
  }

  createDish(data: Partial<Dish>): Observable<Dish> {
    return this.http.post<Dish>(this.api, data);
  }

  updateDish(id: string, data: Partial<Dish>): Observable<Dish> {
    return this.http.put<Dish>(`${this.api}/${id}`, data);
  }

  patchDishAvailability(id: string, available: boolean): Observable<Dish> {
    return this.http.patch<Dish>(`${this.api}/${id}/availability`, { available });
  }

  deleteDish(id: string): Observable<any> {
    return this.http.delete(`${this.api}/${id}`);
  }
}
