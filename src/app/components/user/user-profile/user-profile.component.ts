import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../core/services/user-service/user.service';
import { OrderService } from '../../../services/order.service';
import { User } from '../../../models/user.model';
import { Order } from '../../../models/order.model';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
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
      next: user => {
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