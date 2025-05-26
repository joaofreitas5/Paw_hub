import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuService } from '../../../services/menu.service';
import { DishService } from '../../../services/dish.service';
import { CategoryService } from '../../../services/category-service.service';
import { AuthService } from '../../../services/auth.service';
import { Menu, MenuItem } from '../../../models/menu.model';
import { Category } from '../../../models/category.model';
import { Dish } from '../../../models/dish.model';

@Component({
  selector: 'app-menu-form',
  templateUrl: './menu-form.component.html',
  styleUrls: ['./menu-form.component.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule]
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
    private dishService: DishService,
    private categoryService: CategoryService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.menuForm = this.fb.group({
      category: ['', Validators.required],
      items: this.fb.array([])
    });

    this.loadCategories();

    this.menuId = this.route.snapshot.paramMap.get('id') || undefined;
    if (this.menuId) {
      this.editing = true;
      this.menuService.getMenu(this.menuId).subscribe(menu => {
        this.menuForm.patchValue({ category: menu.category });
        if (menu.items?.length > 0) {
          this.dishService.getDishes({ ids: menu.items.join(',') }).subscribe({
            next: (dishes: Dish[]) => {
              const itemsArray = this.menuForm.get('items') as FormArray;
              dishes.forEach((dish: Dish) => {
                itemsArray.push(this.createDishFormGroup(dish));
              });
            }
          });
        }
      });
    } else {
      this.addMenuItem();
    }
  }

  private createDishFormGroup(dish?: Dish): FormGroup {
    return this.fb.group({
      name: [dish?.name || '', Validators.required],
      description: [dish?.description || ''],
      price: [dish?.price || 0, [Validators.required, Validators.min(0)]],
      image: [dish?.image || ''],
      nutritionalInfo: this.fb.group({
        calories: [dish?.nutritionalInfo?.calories || null],
        protein: [dish?.nutritionalInfo?.protein || null],
        fat: [dish?.nutritionalInfo?.fat || null],
        carbs: [dish?.nutritionalInfo?.carbs || null],
        sodium: [dish?.nutritionalInfo?.sodium || null]
      }),
      doseType: [dish?.doseType || '']
    });
  }

  get items() {
    return this.menuForm.get('items') as FormArray;
  }

  addMenuItem() {
    this.items.push(this.fb.group({
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
      doseType: ['']
    }));
  }

  removeMenuItem(index: number) {
    this.items.removeAt(index);
  }

  loadCategories() {
    const restaurantId = this.getRestaurantId();
    this.categoryService.getCategoriesByRestaurant(restaurantId).subscribe(cats => this.categories = cats);
  }

  getRestaurantId(): string {
    const user = this.authService.getUser();
    if (!user) return '';
    return user.restaurantId || user.id || '';
  }

  onSubmit() {
    if (this.menuForm.invalid) return;
    
    const formValue = this.menuForm.value;
    const restaurantId = this.getRestaurantId();
    
    const menuData = {
      restaurant: restaurantId,
      category: formValue.category,
      items: formValue.items.map((item: MenuItem) => ({
        name: item.name,
        description: item.description,
        price: item.price,
        image: item.image,
        nutritionalInfo: item.nutritionalInfo,
        doseType: item.doseType
      }))
    };

    const obs = this.editing && this.menuId
      ? this.menuService.updateMenu(this.menuId, menuData)
      : this.menuService.createMenu(menuData);

    obs.subscribe({
      next: () => this.router.navigate(['/menus']),
      error: () => this.loading = false
    });
  }
}