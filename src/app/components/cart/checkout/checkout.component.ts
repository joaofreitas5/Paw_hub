import { Component } from '@angular/core';
import { CartService } from '../../../core/services/cart-service/cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent {
  paymentOption: string = 'card'; // ou 'mbway', etc
  processing = false;
  error?: string;

  constructor(
    public cartService: CartService,
    private router: Router
  ) {}

  onSubmit() {
    if (this.cartService.items.length === 0) {
      this.error = 'O carrinho está vazio!';
      return;
    }
    this.processing = true;
    // Simulação de processamento de pagamento
    setTimeout(() => {
      this.processing = false;
      this.cartService.clear();
      this.router.navigate(['/order-success']);
    }, 2000);
  }
}