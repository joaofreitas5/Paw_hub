import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { OrderService } from '../../../services/order.service';
import { User } from '../../../models/user.model';
import { Order } from '../../../models/order.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class UserProfileComponent implements OnInit {
  user: User | null = null;
  orders: Order[] = [];
  error?: string;

  constructor(
    private userService: UserService,
    private orderService: OrderService
  ) {}

  ngOnInit() {
    this.userService.getProfile().subscribe({
      next: (user: User) => {
        this.user = user;
        if (user?.id) {
          this.orderService.getOrdersByUser(user.id).subscribe({
            next: orders => this.orders = orders,
            error: () => this.error = 'Erro ao carregar encomendas.'
          });
        }
      },
      error: () => this.error = 'Erro ao carregar perfil.'
    });
  }
}