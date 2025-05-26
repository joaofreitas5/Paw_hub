import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Menu } from '../../../models/menu.model';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  private baseUrl = '/api/menus';

  constructor(private http: HttpClient) {}

  getMenusByRestaurant(restaurantId: string): Observable<Menu[]> {
    return this.http.get<Menu[]>(`${this.baseUrl}/restaurant/${restaurantId}`);
  }

  getMenuById(id: string): Observable<Menu> {
    return this.http.get<Menu>(`${this.baseUrl}/${id}`);
  }

  createMenu(data: Partial<Menu>): Observable<Menu> {
    return this.http.post<Menu>(this.baseUrl, data);
  }

  updateMenu(id: string, data: Partial<Menu>): Observable<Menu> {
    return this.http.put<Menu>(`${this.baseUrl}/${id}`, data);
  }

  deleteMenu(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}