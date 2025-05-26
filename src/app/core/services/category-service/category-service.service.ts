import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from '../../../models/category.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private baseUrl = '/api/categories';

  constructor(private http: HttpClient) {}

  getCategoriesByRestaurant(restaurantId: string): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.baseUrl}/restaurant/${restaurantId}`);
  }

  createCategory(data: Partial<Category>): Observable<Category> {
    return this.http.post<Category>(this.baseUrl, data);
  }

  updateCategory(id: string, data: Partial<Category>): Observable<Category> {
    return this.http.put<Category>(`${this.baseUrl}/${id}`, data);
  }

  deleteCategory(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}