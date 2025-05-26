import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DishService } from '../../../services/dish.service';
import { Dish } from '../../../models/dish.model';

@Component({
  selector: 'app-dish-form',
  templateUrl: './dish-form.component.html',
  styleUrls: ['./dish-form.component.css']
})
export class DishFormComponent implements OnInit {
  dishForm!: FormGroup;
  loading = false;
  editing = false;
  dishId?: string;

  constructor(
    private fb: FormBuilder,
    private dishService: DishService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.dishForm = this.fb.group({
      name: ['', Validators.required],
      description: [''],
      price: [0, [Validators.required, Validators.min(0)]],
      image: [''],
      nutritionalInfo: this.fb.group({
        calories: [null],
        protein: [null],
        fat: [null],
        carbs: [null],
        sodium: [null]
      }),
      doseType: [''],
      category: ['']
    });

    this.dishId = this.route.snapshot.paramMap.get('id') || undefined;
    if (this.dishId) {
      this.editing = true;
      this.dishService.getDish(this.dishId).subscribe(dish => {
        this.dishForm.patchValue(dish);
      });
    }
  }

  onSubmit() {
    if (this.dishForm.invalid) return;
    this.loading = true;
    const data: Dish = this.dishForm.value;

    const obs = this.editing && this.dishId
      ? this.dishService.updateDish(this.dishId, data)
      : this.dishService.createDish(data);

    obs.subscribe({
      next: () => {
        this.router.navigate(['/dishes']);
      },
      error: () => {
        this.loading = false;
      }
    });
  }
}
