import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { OrderService } from '../../../services//order.service';
import { AuthService } from '../../../services/auth.service';
import { Order } from '../../../models/order.model';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css'],
  standalone: true,
  imports: [CommonModule, RouterModule, MatCardModule, MatIconModule]
})
export class OrderListComponent implements OnInit {
  @Input() restaurantView?: boolean = false;
  orders: Order[] = [];
  loading = false;

  constructor(
    private orderService: OrderService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loading = true;
    const user = this.authService.getUser();
    if (!user) {
      this.loading = false;
      return;
    }

    const userId = user.id ?? user._id ?? '';
    if (this.restaurantView) {
      // Para restaurante, carrega todas as encomendas recebidas
      this.orderService.getOrdersByRestaurant(userId).subscribe(res => {
        this.orders = res;
        this.loading = false;
      });
    } else {
      // Para cliente, carrega as suas encomendas
      this.orderService.getOrdersByUser(userId).subscribe(res => {
        this.orders = res;
        this.loading = false;
      });
    }
  }
}