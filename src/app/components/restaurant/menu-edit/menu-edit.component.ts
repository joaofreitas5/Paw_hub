import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MenuService, Dish } from '../../../core/services/menus-service/menus.service';


@Component({
  selector: 'app-menu-edit',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './menu-edit.component.html',
  styleUrls: ['./menu-edit.component.css']
})
export class MenuEditComponent implements OnInit {
  private menuService = inject(MenuService);

  restaurantId = 'id_do_restaurante_logado'; // substituir pelo valor real do AuthService
  menuDishes: Dish[] = [];
  allDishes: Dish[] = [];
  maxDishes = 10;

  ngOnInit() {
    this.loadMenu();
    this.loadAllDishes();
  }

  loadMenu() {
    this.menuService.getMenuByRestaurant(this.restaurantId).subscribe(menu => {
      this.menuDishes = menu.dishes;
    });
  }

  loadAllDishes() {
    this.menuService.getDishes().subscribe(dishes => {
      this.allDishes = dishes;
    });
  }

  canAddDish(): boolean {
    return this.menuDishes.length < this.maxDishes;
  }

  addDish(dish: Dish) {
    if (!this.canAddDish()) {
      alert('Limite de 10 pratos atingido!');
      return;
    }
    this.menuService.addDishToMenu(this.restaurantId, dish._id).subscribe(() => {
      this.loadMenu();
    });
  }

  removeDish(dish: Dish) {
    this.menuService.removeDishFromMenu(this.restaurantId, dish._id).subscribe(() => {
      this.loadMenu();
    });
  }
}
