import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { MenuItem } from '../models/menu.model'; // Corrigido para MenuItem

export interface CartItem {
  menuItem: string; // menu item id
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

  addItem(item: MenuItem, quantity: number = 1): Observable<any> {
    return this.http.post(this.api + '/add', {
      menuItem: item.name, // ou item.id se existir
      name: item.name,
      price: item.price,
      quantity
    });
  }

  removeItem(item: MenuItem): Observable<any> {
    return this.http.post(this.api + '/remove', { menuItem: item.name }); // ou item.id se existir
  }

  clear(): Observable<any> {
    return this.http.post(this.api + '/clear', {});
  }

  total(): number {
    const items = this.itemsSubject.value;
    return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }
}