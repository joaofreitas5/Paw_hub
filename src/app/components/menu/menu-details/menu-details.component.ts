import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MenuService } from '../../../services/menu.service';
import { DishService } from '../../../services/dish.service';
import { Menu } from '../../../models/menu.model';
import { Dish } from '../../../models/dish.model';

@Component({
  selector: 'app-menu-details',
  templateUrl: './menu-details.component.html',
  styleUrls: ['./menu-details.component.css']
})
export class MenuDetailsComponent implements OnInit {
  menu?: Menu;
  dishes: Dish[] = [];
  loading = true;
  error?: string;

  constructor(
    private route: ActivatedRoute,
    private menuService: MenuService,
    private dishService: DishService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.menuService.getMenu(id).subscribe({
        next: (menu) => {
          this.menu = menu;
          if (menu.items && menu.items.length > 0) {
            this.dishService.getDishes({ ids: menu.items.join(',') }).subscribe({
              next: dishes => {
                this.dishes = dishes;
                this.loading = false;
              },
              error: () => {
                this.error = 'Erro ao carregar pratos do menu';
                this.loading = false;
              }
            });
          } else {
            this.loading = false;
          }
        },
        error: () => {
          this.error = 'Não foi possível carregar o menu';
          this.loading = false;
        }
      });
    }
  }
}