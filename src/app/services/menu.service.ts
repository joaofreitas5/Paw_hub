import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Menu } from '../models/menu.model';

@Injectable({ providedIn: 'root' })
export class MenuService {
  private api = '/api/menu';

  constructor(private http: HttpClient) {}

  getMenus(): Observable<Menu[]> {
    return this.http.get<Menu[]>(this.api);
  }

  getMenu(id: string): Observable<Menu> {
    return this.http.get<Menu>(`${this.api}/${id}`);
  }

  createMenu(data: Partial<Menu>): Observable<Menu> {
    return this.http.post<Menu>(this.api, data);
  }

  updateMenu(id: string, data: Partial<Menu>): Observable<Menu> {
    return this.http.put<Menu>(`${this.api}/${id}`, data);
  }

  deleteMenu(id: string): Observable<any> {
    return this.http.delete(`${this.api}/${id}`);
  }
}
