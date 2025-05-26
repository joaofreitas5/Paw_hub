import { Component, OnInit } from '@angular/core';
import { MenuService } from '../../../services/menu.service';
import { DishService } from '../../../services/dish.service';
import { Menu } from '../../../models/menu.model';
import { Dish } from '../../../models/dish.model';

@Component({
  selector: 'app-availability-management',
  templateUrl: './availability-management.component.html',
  styleUrls: ['./availability-management.component.css']
})
export class AvailabilityManagementComponent implements OnInit {
  menus: Menu[] = [];
  dishes: Dish[] = [];
  loading = true;
  error?: string;

  constructor(
    private menuService: MenuService,
    private dishService: DishService
  ) {}

  ngOnInit(): void {
    this.menuService.getMenus().subscribe({
      next: menus => {
        this.menus = menus;
        this.loading = false;
      },
      error: () => {
        this.error = 'Erro ao carregar menus';
        this.loading = false;
      }
    });
    this.dishService.getDishes().subscribe({
      next: dishes => this.dishes = dishes
    });
  }

  toggleMenuAvailability(menu: Menu) {
    const newAvailable = !menu['available'];
    this.menuService.patchMenuAvailability(menu.id, newAvailable).subscribe(updated => menu['available'] = updated.available);
  }

  toggleDishAvailability(dish: Dish) {
    const newAvailable = !dish['available'];
    this.dishService.patchDishAvailability(dish.id, newAvailable).subscribe(updated => dish['available'] = updated.available);
  }
}
