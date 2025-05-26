import { Component } from '@angular/core';
import { CartService } from '../../../core/services/cart-service/cart.service';
import { Menu } from '../../../models/menu.model';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
  constructor(public cartService: CartService) {}

  removeItem(menu: Menu) {
    this.cartService.removeItem(menu);
  }

  clearCart() {
    this.cartService.clear();
  }
}