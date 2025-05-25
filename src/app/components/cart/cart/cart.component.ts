import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cart: CartItem[] = [];

  ngOnInit() {
    this.loadCart();
  }

  loadCart() {
    this.cart = JSON.parse(localStorage.getItem('cart') || '[]');
  }

  saveCart() {
    localStorage.setItem('cart', JSON.stringify(this.cart));
    this.loadCart();
  }

  removeItem(item: CartItem) {
    this.cart = this.cart.filter(i => i.id !== item.id);
    this.saveCart();
  }

  updateQuantity(item: CartItem, event: Event) {
    const input = event.target as HTMLInputElement;
    const quantity = Number(input.value);
    const idx = this.cart.findIndex(i => i.id === item.id);
    if (idx > -1 && quantity > 0) {
      this.cart[idx].quantity = quantity;
      this.saveCart();
    }
  }

  getTotal() {
    return this.cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  }
}