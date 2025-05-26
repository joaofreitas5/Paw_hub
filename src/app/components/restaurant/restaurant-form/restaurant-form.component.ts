import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RestaurantService } from '../../../core/services/restaurant-service/restaurant.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-restaurant-form',
  templateUrl: './restaurant-form.component.html',
  styleUrls: ['./restaurant-form.component.css']
})
export class RestaurantFormComponent implements OnInit {
  restaurantForm!: FormGroup;
  loading = false;
  error?: string;

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

    // Pré-carregar dados se estiver em modo edição
    this.restaurantService.getMyRestaurant().subscribe({
      next: (res) => {
        this.restaurantForm.patchValue(res);
      },
      error: () => {
        // Se não existe, provavelmente é criação
      }
    });
  }

  onSubmit() {
    if (this.restaurantForm.invalid) return;
    this.loading = true;
    this.restaurantService.updateRestaurant('my', this.restaurantForm.value).subscribe({
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