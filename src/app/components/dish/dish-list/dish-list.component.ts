import { Component, OnInit } from '@angular/core';
import { DishService } from '../../../services/dish.service';
import { Dish } from '../../../models/dish.model';

@Component({
  selector: 'app-dish-list',
  templateUrl: './dish-list.component.html',
  styleUrls: ['./dish-list.component.css']
})
export class DishListComponent implements OnInit {
  dishes: Dish[] = [];
  loading = false;
  error?: string;

  constructor(private dishService: DishService) {}

  ngOnInit() {
    this.loading = true;
    this.dishService.getDishes().subscribe({
      next: dishes => {
        this.dishes = dishes;
        this.loading = false;
      },
      error: () => {
        this.error = 'Erro ao carregar pratos';
        this.loading = false;
      }
    });
  }
}
