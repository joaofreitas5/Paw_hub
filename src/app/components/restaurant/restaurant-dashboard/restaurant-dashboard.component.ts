import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { RestaurantService } from '../../../services/restaurant.service';
import { MenuService } from '../../../services/menu.service';
import { OrderService } from '../../../services/order.service';
import { Restaurant } from '../../../models/restaurant.model';
import { Menu } from '../../../models/menu.model';
import { Order } from '../../../models/order.model';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-restaurant-dashboard',
  templateUrl: './restaurant-dashboard.component.html',
  styleUrls: ['./restaurant-dashboard.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatListModule
  ]
})
export class RestaurantDashboardComponent implements OnInit {
  restaurant?: Restaurant;
  menus: Menu[] = [];
  orders: Order[] = [];
  loading = true;

  constructor(
    private restaurantService: RestaurantService,
    private menuService: MenuService,
    private orderService: OrderService
  ) {}

  ngOnInit(): void {
    this.restaurantService.getRestaurants().subscribe({
      next: (restaurants) => {
        this.restaurant = restaurants[0];
        if (this.restaurant) {
          // Corrigido: usa type assertion para _id ou id
          const restaurantId = (this.restaurant as any)._id ?? this.restaurant.id ?? '';
          this.menuService.getMenusByRestaurant(restaurantId).subscribe(menus => this.menus = menus);
          this.orderService.getOrdersByRestaurant(restaurantId).subscribe(orders => this.orders = orders);
        }
        this.loading = false;
      },
      error: () => { this.loading = false; }
    });
  }
}
