import { Component,OnInit } from '@angular/core';
import { RestaurantService, Restaurant } from '../../services/restaurant/restaurant.service';

@Component({
  selector: 'app-restaurant-list',
  templateUrl: './restaurant-list.component.html',
})
export class RestaurantListComponent implements OnInit {
    restaurants: Restaurant[] = [];

    constructor(private restaurantService: RestaurantService) {}

    ngOnInit(): void {
        this.restaurantService.getAllRestaurants().subscribe({
          next: (data) => this.restaurants = data,
          error: (error) => console.error('Error loading restaurants:', error)
        });
    }
}
