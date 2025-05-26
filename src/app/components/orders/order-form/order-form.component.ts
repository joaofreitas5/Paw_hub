import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CartService } from '../../../services/cart.service';
import { OrderService } from '../../../services/order.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.css']
})
export class OrderFormComponent {
  orderForm: FormGroup;
  submitted = false;
  error?: string;

  constructor(
    private fb: FormBuilder,
    private cartService: CartService,
    private orderService: OrderService,
    private router: Router
  ) {
    this.orderForm = this.fb.group({
      address: ['', Validators.required],
      phone: ['', Validators.required],
      notes: ['']
    });
  }

  onSubmit() {
    if (this.orderForm.invalid) return;
    if (this.cartService.items.length === 0) {
      this.error = 'O carrinho está vazio!';
      return;
    }

    const order = {
      ...this.orderForm.value,
      items: this.cartService.items,
      total: this.cartService.total()
    };

    this.orderService.createOrder(order).subscribe({
      next: () => {
        this.cartService.clear();
        this.router.navigate(['/order-success']);
      },
      error: () => {
        this.error = 'Erro ao submeter encomenda.';
      }
    });
  }
}