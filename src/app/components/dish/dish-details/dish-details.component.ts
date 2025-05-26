import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DishService } from '../../../services/dish.service';
import { Dish } from '../../../models/dish.model';

@Component({
  selector: 'app-dish-details',
  templateUrl: './dish-details.component.html',
  styleUrls: ['./dish-details.component.css']
})
export class DishDetailsComponent implements OnInit {
  dish?: Dish;
  loading = true;
  error?: string;

  constructor(
    private route: ActivatedRoute,
    private dishService: DishService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.dishService.getDish(id).subscribe({
        next: (dish) => {
          this.dish = dish;
          this.loading = false;
        },
        error: () => {
          this.error = 'Não foi possível carregar o prato';
          this.loading = false;
        }
      });
    }
  }
}
