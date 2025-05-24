// src/app/services/menu.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Dish {
  _id: string;
  name: string;
  price: number;
  category: string;
  image?: string;
  description?: string;
}

@Injectable({ providedIn: 'root' })
export class MenuService {
  private baseUrl = 'http://localhost:3000/api/menus';

  constructor(private http: HttpClient) {}

  getCategories(): Observable<string[]> {
    return this.http.get<string[]>(`${this.baseUrl}/categories`);
  }

  getDishes(filters: any = {}): Observable<Dish[]> {
    let params = new HttpParams();
    Object.keys(filters).forEach(key => {
      if (filters[key]) {
        params = params.set(key, filters[key]);
      }
    });
    return this.http.get<Dish[]>(`${this.baseUrl}/dishes`, { params });
  }

  addDishToMenu(menuId: string, dishId: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/${menuId}/addDish`, { dishId });
  }

  removeDishFromMenu(menuId: string, dishId: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/${menuId}/removeDish`, { dishId });
  }

  getMenuByRestaurant(restaurantId: string): Observable<{ dishes: Dish[] }> {
    return this.http.get<{ dishes: Dish[] }>(`${this.baseUrl}/restaurant/${restaurantId}`);
  }
}
