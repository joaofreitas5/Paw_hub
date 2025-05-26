import { Component, OnInit } from '@angular/core';
import { CartService, CartItem } from '../../../services/cart.service';
import { Menu } from '../../../models/menu.model';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  items: CartItem[] = [];

  constructor(public cartService: CartService) {}

  ngOnInit() {
    this.cartService.items$.subscribe(items => this.items = items);
    this.cartService.load();
  }

  removeItem(menu: Menu) {
    this.cartService.removeItem(menu).subscribe(() => this.cartService.load());
  }

  clearCart() {
    this.cartService.clear().subscribe(() => this.cartService.load());
  }

  total() {
    return this.cartService.total();
  }
}