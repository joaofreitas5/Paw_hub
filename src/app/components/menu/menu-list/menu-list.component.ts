import { Component, OnInit } from '@angular/core';
import { MenuService } from '../../../core/services/menu-service/menu.service';
import { Menu } from '../../../models/menu.model';
import { AuthService } from '../../../core/auth-service/auth.service';
import { Category } from '../../../models/category.model';
import { CategoryService } from '../../../core/services/category-service/category-service.service';

@Component({
  selector: 'app-menu-list',
  templateUrl: './menu-list.component.html',
  styleUrls: ['./menu-list.component.css']
})
export class MenuListComponent implements OnInit {
  menus: Menu[] = [];
  categories: Category[] = [];
  loading = false;
  error?: string;
  filters = {
    name: '',
    categoryId: '',
    available: ''
  };

  constructor(
    private menuService: MenuService,
    private categoryService: CategoryService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loadMenus();
    this.loadCategories();
  }

  loadMenus() {
    this.loading = true;
    const restaurantId = this.getRestaurantId();
    this.menuService.getMenusByRestaurant(restaurantId).subscribe({
      next: (menus) => {
        this.menus = menus;
        this.loading = false;
      },
      error: () => {
        this.error = 'Erro ao carregar menus';
        this.loading = false;
      }
    });
  }

  loadCategories() {
    const restaurantId = this.getRestaurantId();
    this.categoryService.getCategoriesByRestaurant(restaurantId).subscribe({
      next: (categories) => (this.categories = categories)
    });
  }

  onFiltersChanged(filters: any) {
    this.filters = filters;
  }

  filteredMenus(): Menu[] {
    return this.menus.filter(menu => {
      const nameMatch = !this.filters.name || menu.name.toLowerCase().includes(this.filters.name.toLowerCase());
      const categoryMatch = !this.filters.categoryId || menu.categoryId === this.filters.categoryId;
      const availableMatch =
        this.filters.available === '' ||
        menu.available === (this.filters.available === 'true');
      return nameMatch && categoryMatch && availableMatch;
    });
  }

  getRestaurantId(): string {
    const user = this.authService.getUser();
    return user.restaurantId || '';
  }
}