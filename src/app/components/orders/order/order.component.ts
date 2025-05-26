import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OrderService } from '../../../services/order.service';
import { CartService, CartItem } from '../../../services/cart.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './order.component.html'
})
export class OrderComponent implements OnInit {
  cart: CartItem[] = [];
  address = '';
  payment = '';
  error?: string;

  constructor(
    private orderService: OrderService,
    private cartService: CartService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.cartService.items$.subscribe(items => this.cart = items);
    this.cartService.load();
  }

  placeOrder() {
    if (!this.address || !this.payment || this.cart.length === 0) {
      this.error = 'Preencha todos os campos e adicione itens ao carrinho.';
      return;
    }
    const order = {
      items: this.cart,
      deliveryAddress: this.address,
      paymentMethod: this.payment
    };
    this.orderService.createOrder(order).subscribe({
      next: () => {
        this.cartService.clear().subscribe(() => this.cartService.load());
        alert('Encomenda efetuada com sucesso!');
      },
      error: () => {
        this.error = 'Erro ao efetuar encomenda.';
      }
    });
  }
}