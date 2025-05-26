import { Component, OnInit } from '@angular/core';
import { RestaurantService } from '../../../services/restaurant.service';
import { Restaurant } from '../../../models/restaurant.model';

@Component({
  selector: 'app-restaurant-profile',
  templateUrl: './restaurant-profile.component.html',
  styleUrls: ['./restaurant-profile.component.css']
})
export class RestaurantProfileComponent implements OnInit {
  restaurant?: Restaurant;
  loading = true;
  error?: string;

  constructor(private restaurantService: RestaurantService) {}

  ngOnInit(): void {
    // Ajusta para obter o restaurante do utilizador autenticado se necessário
    this.restaurantService.getRestaurants().subscribe({
      next: (restaurants) => {
        // Supondo que o utilizador só tem um restaurante, senão adapta para buscar pelo ID do utilizador autenticado
        this.restaurant = restaurants[0];
        this.loading = false;
      },
      error: () => {
        this.error = 'Erro ao carregar restaurante';
        this.loading = false;
      }
    });
  }
}