import { Component, OnInit } from '@angular/core';
import { RestaurantService } from '../../../services/restaurant.service';
import { MenuService } from '../../../services/menu.service';
import { OrderService } from '../../../services/order.service';
import { Restaurant } from '../../../models/restaurant.model';
import { Menu } from '../../../models/menu.model';
import { Order } from '../../../models/order.model';

@Component({
  selector: 'app-restaurant-dashboard',
  templateUrl: './restaurant-dashboard.component.html',
  styleUrls: ['./restaurant-dashboard.component.css']
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
          this.menuService.getMenusByRestaurant(this.restaurant.id).subscribe(menus => this.menus = menus);
          this.orderService.getOrdersByRestaurant(this.restaurant.id).subscribe(orders => this.orders = orders);
        }
        this.loading = false;
      },
      error: () => { this.loading = false; }
    });
  }
}
