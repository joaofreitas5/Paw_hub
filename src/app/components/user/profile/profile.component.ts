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
import { MatListModule } from '@angular/material/list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
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
    MatListModule,
    MatProgressSpinnerModule,
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
        const userId = user?._id ?? user?.id ?? '';
        if (userId) {
          this.orderService.getOrdersByUser(userId).subscribe({
            next: orders => {
              this.orders = orders;
            },
            error: err => {
              this.feedback = 'Erro ao carregar encomendas.';
            }
          });
        }
      },
      error: err => {
        this.feedback = 'Erro ao carregar perfil.';
      }
    });

    this.restaurantService.getValidatedRestaurants().subscribe({
      next: (restaurants: Restaurant[]) => {
        this.restaurants = restaurants;
      },
      error: err => {
        this.feedback = 'Erro ao carregar restaurantes.';
      }
    });
  }

  applyForRestaurant() {
    if (!this.user) return;
    const userId = this.user._id ?? '';
    if (!userId) return;
    this.userService.applyForRestaurant(userId).subscribe({
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