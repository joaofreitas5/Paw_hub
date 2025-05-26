import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CartService, CartItem } from '../../../services/cart.service';
import { MenuItem } from '../../../models/menu.model';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
  standalone: true,
  imports: [CommonModule, RouterModule]
})
export class CartComponent implements OnInit {
  items: CartItem[] = [];

  constructor(public cartService: CartService) {}

  ngOnInit() {
    this.cartService.items$.subscribe(items => this.items = items);
    this.cartService.load();
  }

  removeItem(item: MenuItem) {
    this.cartService.removeItem(item).subscribe(() => this.cartService.load());
  }

  clearCart() {
    this.cartService.clear().subscribe(() => this.cartService.load());
  }

  total() {
    return this.cartService.total();
  }
}