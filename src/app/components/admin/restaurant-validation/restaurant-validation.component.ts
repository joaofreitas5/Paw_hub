import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '../../../core/services/user-service/user.service';
import { User } from '../../../models/user.model';
import { AdminService } from '../../../core/services/admin-service/admin-service.service';


@Component({
  selector: 'app-restaurant-validation',
  templateUrl: './restaurant-validation.component.html',
  styleUrls: ['./restaurant-validation.component.css'],
  standalone: true,
  imports: [CommonModule]
})

export class RestaurantValidationComponent implements OnInit {
  pendingRestaurants: any[] = [];

  constructor(private adminService: AdminService) {}

  ngOnInit() {
    this.loadPending();
  }

  loadPending() {
    this.adminService.getPendingRestaurants().subscribe(data => this.pendingRestaurants = data);
  }

  approve(id: string) {
    this.adminService.approveRestaurant(id).subscribe(() => this.loadPending());
  }

  reject(id: string) {
    this.adminService.rejectRestaurant(id).subscribe(() => this.loadPending());
  }
}