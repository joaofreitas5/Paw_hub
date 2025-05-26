import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RestaurantService } from '../../../services/restaurant.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-restaurant-form',
  templateUrl: './restaurant-form.component.html',
  styleUrls: ['./restaurant-form.component.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule]
})
export class RestaurantFormComponent implements OnInit {
  restaurantForm!: FormGroup;
  loading = false;
  error?: string;
  editing = false;
  restaurantId?: string;

  constructor(
    private fb: FormBuilder,
    private restaurantService: RestaurantService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.restaurantForm = this.fb.group({
      name: ['', Validators.required],
      description: [''],
      address: [''],
      phone: [''],
      email: ['', [Validators.email]],
      imageUrl: ['']
    });

    // Se estiveres a editar, carrega os dados
    // Ajusta para obter o restaurante do utilizador autenticado se necessário
    this.restaurantService.getRestaurants().subscribe({
      next: (restaurants) => {
        if (restaurants.length > 0) {
          this.editing = true;
          this.restaurantId = restaurants[0].id;
          this.restaurantForm.patchValue(restaurants[0]);
        }
      }
    });
  }

  onSubmit() {
    if (this.restaurantForm.invalid) return;
    this.loading = true;
    const data = this.restaurantForm.value;
    const obs = this.editing && this.restaurantId
      ? this.restaurantService.updateRestaurant(this.restaurantId, data)
      : this.restaurantService.createRestaurant(data);

    obs.subscribe({
      next: () => {
        this.loading = false;
        this.router.navigate(['/restaurant-profile']);
      },
      error: () => {
        this.error = 'Erro ao guardar restaurante';
        this.loading = false;
      }
    });
  }
}