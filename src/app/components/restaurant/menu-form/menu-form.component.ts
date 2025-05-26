import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuService } from '../../../core/services/menu-service/menu.service';
import { CategoryService } from '../../../core/services/category-service/category-service.service';
import { AuthService } from '../../../core/auth-service/auth.service';
import { Menu } from '../../../models/menu.model';
import { Category } from '../../../models/category.model';

@Component({
  selector: 'app-menu-form',
  templateUrl: './menu-form.component.html',
  styleUrls: ['./menu-form.component.css']
})
export class MenuFormComponent implements OnInit {
  menuForm!: FormGroup;
  loading = false;
  editing = false;
  menuId?: string;
  categories: Category[] = [];

  constructor(
    private fb: FormBuilder,
    private menuService: MenuService,
    private categoryService: CategoryService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.menuForm = this.fb.group({
      name: ['', Validators.required],
      description: [''],
      price: [0, [Validators.required, Validators.min(0)]],
      categoryId: ['', Validators.required],
      imageUrl: [''],
      available: [true]
    });

    this.loadCategories();

    this.menuId = this.route.snapshot.paramMap.get('id') || undefined;
    if (this.menuId) {
      this.editing = true;
      this.menuService.getMenuById(this.menuId).subscribe(menu => {
        this.menuForm.patchValue(menu);
      });
    }
  }

  loadCategories() {
    const restaurantId = this.getRestaurantId();
    this.categoryService.getCategoriesByRestaurant(restaurantId).subscribe(cats => this.categories = cats);
  }

  getRestaurantId(): string {
    const user = this.authService.getUser();
    return user.restaurantId || '';
  }

  onSubmit() {
    if (this.menuForm.invalid) return;
    this.loading = true;
    const restaurantId = this.getRestaurantId();
    const data = { ...this.menuForm.value, restaurantId };

    const obs = this.editing && this.menuId
      ? this.menuService.updateMenu(this.menuId, data)
      : this.menuService.createMenu(data);

    obs.subscribe({
      next: () => {
        this.router.navigate(['/menus']);
      },
      error: () => {
        this.loading = false;
      }
    });
  }
}