import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterOutlet, Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RestaurantService } from '../../../services/restaurant.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    RouterOutlet,
    MatButtonModule,
    MatToolbarModule
  ]
})
export class AdminDashboardComponent implements OnInit {
  pendingUsers: any[] = [];
  unvalidatedRestaurants: any[] = [];

  constructor(
    private authService: AuthService,
    private router: Router,
    private restaurantService: RestaurantService // Adiciona o serviço
  ) {}

  ngOnInit() {
    // Só carrega restaurantes pendentes se o utilizador estiver autenticado
    if (this.authService.isLoggedIn()) {
      // Utilizadores pendentes de aprovação para restaurante
      this.restaurantService.getPendingRestaurantUsers().subscribe({
        next: (users) => this.pendingUsers = users,
        error: () => this.pendingUsers = []
      });
      // Restaurantes (users) não validados
      this.restaurantService.getUnvalidatedRestaurantUsers().subscribe({
        next: (users) => this.unvalidatedRestaurants = users,
        error: () => this.unvalidatedRestaurants = []
      });
    }
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/homepage']);
  }

  approveRestaurantUser(id: string) {
    this.restaurantService.approveRestaurantUser(id).subscribe(() => {
      this.pendingUsers = this.pendingUsers.filter(u => u._id !== id && u.id !== id);
      // Opcional: também podes atualizar a lista de não validados
      this.ngOnInit();
    });
  }

  rejectRestaurantUser(id: string) {
    this.restaurantService.rejectRestaurantUser(id).subscribe(() => {
      this.pendingUsers = this.pendingUsers.filter(u => u._id !== id && u.id !== id);
    });
  }

  validateRestaurantUser(id: string) {
    this.restaurantService.approveRestaurantUser(id).subscribe(() => {
      this.unvalidatedRestaurants = this.unvalidatedRestaurants.filter(u => u._id !== id && u.id !== id);
    });
  }

  rejectUnvalidatedRestaurantUser(id: string) {
    this.restaurantService.rejectRestaurantUser(id).subscribe(() => {
      this.unvalidatedRestaurants = this.unvalidatedRestaurants.filter(u => u._id !== id && u.id !== id);
    });
  }
}