import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CartService, CartItem } from '../../../services/cart.service';
import { OrderService } from '../../../services/order.service';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule]
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
    
    this.cartService.items$.pipe(take(1)).subscribe(items => {
      if (items.length === 0) {
        this.error = 'O carrinho está vazio!';
        return;
      }

      const order = {
        ...this.orderForm.value,
        items: items,
        total: this.cartService.total()
      };

      this.orderService.createOrder(order).subscribe({
        next: () => {
          this.cartService.clear().subscribe(() => {
            this.router.navigate(['/order-success']);
          });
        },
        error: () => {
          this.error = 'Erro ao submeter encomenda.';
        }
      });
    });
  }
}