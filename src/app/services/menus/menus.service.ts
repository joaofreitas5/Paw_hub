// src/app/services/menus/menus.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface MenuItem {
  id: string;
  name: string;
  category: string;
  description: string;
  image: string;
  price: number;
  nutritionInfo?: string;
}

@Injectable({ providedIn: 'root' })
export class MenuService {
  private baseUrl = 'http://localhost:3000/api/menus';

  constructor(private http: HttpClient) {}

  getMenusByRestaurant(restaurantId: string): Observable<MenuItem[]> {
    return this.http.get<MenuItem[]>(
      `${this.baseUrl}/restaurant/${restaurantId}`
    );
  }

  getMenuById(id: string): Observable<MenuItem> {
    return this.http.get<MenuItem>(`${this.baseUrl}/${id}`);
  }

  createMenu(menuData: Partial<MenuItem>): Observable<MenuItem> {
    return this.http.post<MenuItem>(this.baseUrl, menuData);
  }

  deleteMenu(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  updateMenu(id: string, updatedData: Partial<MenuItem>): Observable<MenuItem> {
    return this.http.put<MenuItem>(`${this.baseUrl}/${id}`, updatedData);
  }
}
