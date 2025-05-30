import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RestaurantService } from '../../../services/restaurant.service'; // Corrigido
import { Restaurant } from '../../../models/restaurant.model';

@Component({
  selector: 'app-restaurant-validation',
  templateUrl: './restaurant-validation.component.html',
  styleUrls: ['./restaurant-validation.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class RestaurantValidationComponent implements OnInit {
  pendingRestaurants: Restaurant[] = [];
  error?: string;

  constructor(private restaurantService: RestaurantService) {} // Corrigido

  ngOnInit() {
    this.loadPending();
  }

  loadPending() {
    this.restaurantService.getPendingRestaurants().subscribe({
      next: (restaurants) => this.pendingRestaurants = restaurants,
      error: (err) => {
        this.error = 'Erro ao carregar restaurantes pendentes';
        console.error(err);
      }
    });
  }

  approve(id: string) {
    // Implementa a lógica de aprovação conforme o teu backend
  }

  reject(id: string) {
    // Implementa a lógica de rejeição conforme o teu backend
  }
}