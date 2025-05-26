import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { Menu } from '../../../models/menu.model';

export interface CartItem {
  menuItem: string; // menu id
  name: string;
  price: number;
  quantity: number;
}

@Injectable({ providedIn: 'root' })
export class CartService {
  private api = '/api/cart';
  private itemsSubject = new BehaviorSubject<CartItem[]>([]);
  items$ = this.itemsSubject.asObservable();

  constructor(private http: HttpClient) {
    this.load();
  }

  load() {
    this.http.get<{ items: CartItem[] }>(this.api).subscribe(cart => {
      this.itemsSubject.next(cart.items || []);
    });
  }

  addItem(menu: Menu, quantity: number = 1): Observable<any> {
    return this.http.post(this.api + '/add', {
      menuItem: menu.id,
      name: menu.name,
      price: menu.price,
      quantity
    });
  }

  removeItem(menu: Menu): Observable<any> {
    return this.http.post(this.api + '/remove', { menuItem: menu.id });
  }

  clear(): Observable<any> {
    return this.http.post(this.api + '/clear', {});
  }

  total(): number {
    const items = this.itemsSubject.value;
    return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }
}