import { Component, OnInit } from '@angular/core';
import { CartService, CartItem } from '../../../services/cart.service';
import { OrderService } from '../../../services/order.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  paymentOption: string = 'card';
  processing = false;
  error?: string;
  items: CartItem[] = [];

  constructor(
    public cartService: CartService,
    private orderService: OrderService,
    private router: Router
  ) {}

  ngOnInit() {
    this.cartService.items$.subscribe(items => this.items = items);
    this.cartService.load();
  }

  onSubmit() {
    if (this.items.length === 0) {
      this.error = 'O carrinho está vazio!';
      return;
    }
    this.processing = true;

    const order = {
      items: this.items,
      paymentMethod: this.paymentOption,
      total: this.cartService.total()
      // Adiciona outros campos necessários (morada, user, etc) conforme o teu modelo
    };

    this.orderService.createOrder(order).subscribe({
      next: () => {
        this.cartService.clear().subscribe(() => {
          this.processing = false;
          this.router.navigate(['/order-success']);
        });
      },
      error: () => {
        this.processing = false;
        this.error = 'Erro ao processar encomenda.';
      }
    });
  }
}