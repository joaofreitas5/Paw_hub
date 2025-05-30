import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RestaurantService } from '../../../services/restaurant.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-restaurant-validation',
  templateUrl: './restaurant-validation.component.html',
  styleUrls: ['./restaurant-validation.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class RestaurantValidationComponent implements OnInit {
  pendingUsers: any[] = [];
  error?: string;

  constructor(
    private restaurantService: RestaurantService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    if (this.authService.isLoggedIn() && this.authService.getUserRole() === 'admin') {
      this.loadPendingUsers();
    } else {
      this.error = 'Acesso restrito a administradores.';
    }
  }

  loadPendingUsers() {
    this.restaurantService.getPendingRestaurantUsers().subscribe({
      next: (users) => this.pendingUsers = users,
      error: (err) => { this.error = 'Erro ao carregar utilizadores pendentes'; }
    });
  }

  approveUser(id: string) {
    this.restaurantService.approveRestaurantUser(id).subscribe({
      next: () => this.loadPendingUsers(),
      error: (err) => {
        this.error = 'Erro ao aprovar utilizador';
        console.error(err);
      }
    });
  }

  rejectUser(id: string) {
    this.restaurantService.rejectRestaurantUser(id).subscribe({
      next: () => this.loadPendingUsers(),
      error: (err) => {
        this.error = 'Erro ao rejeitar utilizador';
        console.error(err);
      }
    });
  }
}