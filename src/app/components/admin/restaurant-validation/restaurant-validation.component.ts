import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Restaurant {
  id: number;
  name: string;
  ownerEmail: string;
  address: string;
  description: string;
  validated: boolean;
}

@Component({
  selector: 'app-restaurant-validation',
  templateUrl: './restaurant-validation.component.html',
  styleUrls: ['./restaurant-validation.component.css'],
  imports: [CommonModule]
})
export class RestaurantValidationComponent implements OnInit {
  pendingRestaurants: Restaurant[] = [];

  ngOnInit() {
    this.loadRestaurants();
  }

  loadRestaurants() {
    const restaurants = JSON.parse(localStorage.getItem('restaurants') || '[]');
    this.pendingRestaurants = restaurants.filter((r: Restaurant) => !r.validated);
  }

  saveRestaurants(restaurants: Restaurant[]) {
    localStorage.setItem('restaurants', JSON.stringify(restaurants));
    this.loadRestaurants();
  }

  approveRestaurant(restaurant: Restaurant) {
    const restaurants = JSON.parse(localStorage.getItem('restaurants') || '[]');
    const idx = restaurants.findIndex((r: Restaurant) => r.id === restaurant.id);
    if (idx > -1) {
      restaurants[idx].validated = true;
      this.saveRestaurants(restaurants);
    }
  }

  rejectRestaurant(restaurant: Restaurant) {
    let restaurants = JSON.parse(localStorage.getItem('restaurants') || '[]');
    restaurants = restaurants.filter((r: Restaurant) => r.id !== restaurant.id);
    this.saveRestaurants(restaurants);
  }
}