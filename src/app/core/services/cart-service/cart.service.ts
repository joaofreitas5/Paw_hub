import { Injectable } from '@angular/core';
import { CartItem } from '../../../models/order.model';
import { Menu } from '../../../models/menu.model';

@Injectable({ providedIn: 'root' })
export class CartService {
  items: CartItem[] = [];

  constructor() {
    this.load();
  }

  addItem(menu: Menu, quantity: number = 1): void {
    const existing = this.items.find(i => i.menu.id === menu.id);
    if (existing) {
      existing.quantity += quantity;
    } else {
      this.items.push({ menu, quantity });
    }
    this.save();
  }

  removeItem(menu: Menu): void {
    this.items = this.items.filter(i => i.menu.id !== menu.id);
    this.save();
  }

  clear(): void {
    this.items = [];
    this.save();
  }

  total(): number {
    return this.items.reduce((sum, item) => sum + item.menu.price * item.quantity, 0);
  }

  private save() {
    localStorage.setItem('cart', JSON.stringify(this.items));
  }

  private load() {
    const data = localStorage.getItem('cart');
    if (data) {
      this.items = JSON.parse(data);
    }
  }
}