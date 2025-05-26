import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Order } from '../../../models/order.model';
import { Observable, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class OrderService {
  constructor(private http: HttpClient) {}

  createOrder(order: Order): Observable<Order> {
    // Real: return this.http.post<Order>('/api/orders', order);
    // Mock:
    return of({ ...order, id: Date.now().toString(), status: 'pendente', createdAt: new Date() });
  }

  getOrdersByUser(userId: string): Observable<Order[]> {
    // Real: return this.http.get<Order[]>(`/api/orders?userId=${userId}`);
    return of([]);
  }

  getOrdersByRestaurant(restaurantId: string): Observable<Order[]> {
    // Real: return this.http.get<Order[]>(`/api/orders?restaurantId=${restaurantId}`);
    return of([]);
  }

  getOrderById(orderId: string): Observable<Order | undefined> {
    // Real: return this.http.get<Order>(`/api/orders/${orderId}`);
    return of(undefined);
  }
}