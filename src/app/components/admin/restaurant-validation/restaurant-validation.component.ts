import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminService } from '../../../services/admin-service.service';
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

  constructor(private adminService: AdminService) {}

  ngOnInit() {
    this.loadPending();
  }

  loadPending() {
    this.adminService.getPendingRestaurants().subscribe((restaurants: Restaurant[]) => {
      this.pendingRestaurants = restaurants;
    });
  }

  approve(id: string) {
    this.adminService.approveRestaurant(id).subscribe(() => this.loadPending());
  }

  reject(id: string) {
    this.adminService.rejectRestaurant(id).subscribe(() => this.loadPending());
  }
}