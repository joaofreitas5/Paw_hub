import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MenuService, Dish } from '../../../services/menus/menus.service';


@Component({
  selector: 'app-menu-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './menu-list.component.html',
  styleUrls: ['./menu-list.component.css']
})
export class MenuListComponent implements OnInit {
  private menuService = inject(MenuService);

  dishes: Dish[] = [];
  categories: string[] = [];
  
  filters = {
    category: '',
    minPrice: '',
    maxPrice: '',
    sort: 'name_asc'
  };

  ngOnInit() {
    this.menuService.getCategories().subscribe(cats => this.categories = cats);
    this.loadDishes();
  }

  loadDishes() {
    this.menuService.getDishes(this.filters).subscribe(data => {
      this.dishes = data;
    });
  }

  onFilterChange() {
    this.loadDishes();
  }
}
