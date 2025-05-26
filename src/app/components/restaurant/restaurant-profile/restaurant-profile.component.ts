import { Component, OnInit } from '@angular/core';
import { RestaurantService } from '../../../core/services/restaurant-service/restaurant.service';
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
    this.restaurantService.getMyRestaurant().subscribe({
      next: (res) => {
        this.restaurant = res;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Erro ao carregar restaurante';
        this.loading = false;
      }
    });
  }
}