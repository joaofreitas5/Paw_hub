import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RestaurantService } from '../../../services/restaurant.service';
import { Restaurant } from '../../../models/restaurant.model';

@Component({
  selector: 'app-restaurant-validation',
  templateUrl: './restaurant-validation.component.html',
  styleUrls: ['./restaurant-validation.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class RestaurantValidationComponent implements OnInit {
  pendingRestaurants: any[] = [];
  pendingUsers: any[] = []; // Adiciona array para utilizadores pendentes
  error?: string;

  constructor(private restaurantService: RestaurantService) {}

  ngOnInit() {
    this.loadPending();
    this.loadPendingUsers(); // Carrega utilizadores pendentes
  }

  loadPending() {
    console.log('Calling getPendingRestaurants...');
    this.restaurantService.getPendingRestaurants().subscribe({
      next: (restaurants) => this.pendingRestaurants = restaurants,
      error: (err) => {
        this.error = 'Erro ao carregar restaurantes pendentes';
        console.error(err);
      }
    });
  }

  loadPendingUsers() {
    this.restaurantService.getPendingRestaurantUsers().subscribe({
      next: (users) => {
        this.pendingUsers = users;
        console.log('pendingUsers array após preenchimento:', this.pendingUsers); // Novo debug
        if (!Array.isArray(this.pendingUsers) || this.pendingUsers.length === 0) {
          console.warn('pendingUsers está vazio ou não é array!', this.pendingUsers);
        }
      },
      error: (err) => {
        this.error = 'Erro ao carregar utilizadores pendentes';
        console.error('Erro no loadPendingUsers:', err); // Debug de erro
      }
    });
  }

  approve(id: string) {
    this.restaurantService.approveRestaurant(id).subscribe({
      next: () => this.loadPending(),
      error: (err) => {
        this.error = 'Erro ao aprovar restaurante';
        console.error(err);
      }
    });
  }

  reject(id: string) {
    this.restaurantService.rejectRestaurant(id).subscribe({
      next: () => this.loadPending(),
      error: (err) => {
        this.error = 'Erro ao rejeitar restaurante';
        console.error(err);
      }
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