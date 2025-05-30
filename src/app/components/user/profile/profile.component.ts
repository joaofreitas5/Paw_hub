import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { OrderService } from '../../../services/order.service';
import { RestaurantService } from '../../../services/restaurant.service';
import { User } from '../../../models/user.model';
import { Order } from '../../../models/order.model';
import { Restaurant } from '../../../models/restaurant.model';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
    FormsModule
  ]
})
export class ProfileComponent implements OnInit {
  user: User | null = null;
  orders: Order[] = [];
  feedback: string = '';
  restaurants: Restaurant[] = [];
  selectedRestaurantId: string = '';

  constructor(
    private userService: UserService,
    private orderService: OrderService,
    private restaurantService: RestaurantService
  ) {}

  ngOnInit() {
    this.userService.getProfile().subscribe({
      next: (user: User) => {
        this.user = user;
        if (user?.id) {
          this.orderService.getOrdersByUser(user.id).subscribe({
            next: orders => this.orders = orders,
            error: () => this.feedback = 'Erro ao carregar encomendas.'
          });
        }
      },
      error: () => this.feedback = 'Erro ao carregar perfil.'
    });

    this.restaurantService.getValidatedRestaurants().subscribe({
      next: (restaurants: Restaurant[]) => this.restaurants = restaurants,
      error: () => this.feedback = 'Erro ao carregar restaurantes.'
    });
  }

  applyForRestaurant() {
    if (!this.user) return;
    this.userService.applyForRestaurant(this.user.id).subscribe({
      next: () => {
        this.feedback = 'Pedido enviado! Aguarde aprovação do admin.';
        if (this.user) this.user.pendingRestaurantApproval = true;
      },
      error: () => this.feedback = 'Erro ao enviar pedido.'
    });
  }

  makeOrder() {
    if (!this.selectedRestaurantId) return;
    this.orderService.createOrder({ restaurant: this.selectedRestaurantId }).subscribe({
      next: (order: Order) => {
        this.feedback = 'Encomenda criada com sucesso!';
        this.orders.push(order);
      },
      error: () => this.feedback = 'Erro ao criar encomenda.'
    });
  }
}