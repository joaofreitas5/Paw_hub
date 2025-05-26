import { Component, Input, OnInit } from '@angular/core';
import { OrderService } from '../../../services//order.service';
import { AuthService } from '../../../services/auth.service';
import { Order } from '../../../models/order.model';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
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
    if (this.restaurantView) {
      // Para restaurante, carrega todas as encomendas recebidas
      const restaurantId = this.authService.getUser().restaurantId;
      this.orderService.getOrdersByRestaurant(restaurantId).subscribe(res => {
        this.orders = res;
        this.loading = false;
      });
    } else {
      // Para cliente, carrega as suas encomendas
      const userId = this.authService.getUser().id;
      this.orderService.getOrdersByUser(userId).subscribe(res => {
        this.orders = res;
        this.loading = false;
      });
    }
  }
}