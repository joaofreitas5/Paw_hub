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
  pendingRestaurants: any[] = [];

  constructor(
    private authService: AuthService,
    private router: Router,
    private restaurantService: RestaurantService // Adiciona o serviço
  ) {}

  ngOnInit() {
    this.restaurantService.getPendingRestaurants().subscribe({
      next: (restaurants) => this.pendingRestaurants = restaurants,
      error: () => this.pendingRestaurants = []
    });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/homepage']);
  }
}