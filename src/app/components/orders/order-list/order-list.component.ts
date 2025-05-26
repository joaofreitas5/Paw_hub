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
    const user = this.authService.getUser();
    if (!user) {
      this.loading = false;
      return;
    }

    if (this.restaurantView) {
      // Para restaurante, carrega todas as encomendas recebidas
      this.orderService.getOrdersByRestaurant(user.id).subscribe(res => {
        this.orders = res;
        this.loading = false;
      });
    } else {
      // Para cliente, carrega as suas encomendas
      this.orderService.getOrdersByUser(user.id).subscribe(res => {
        this.orders = res;
        this.loading = false;
      });
    }
  }
}