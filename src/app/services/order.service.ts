import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Order } from '../models/order.model';

@Injectable({ providedIn: 'root' })
export class OrderService {
  private api = '/orders';

  constructor(private http: HttpClient) {}

  getOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(this.api);
  }

  getOrder(id: string): Observable<Order> {
    return this.http.get<Order>(`${this.api}/${id}`);
  }

  createOrder(data: Partial<Order>): Observable<Order> {
    return this.http.post<Order>(this.api, data);
  }

  updateOrder(id: string, data: Partial<Order>): Observable<Order> {
    return this.http.put<Order>(`${this.api}/${id}`, data);
  }

  deleteOrder(id: string): Observable<any> {
    return this.http.delete(`${this.api}/${id}`);
  }

  getOrdersByUser(userId: string): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.api}?user=${userId}`);
  }

  getOrdersByRestaurant(restaurantId: string): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.api}?restaurant=${restaurantId}`);
  }
}
