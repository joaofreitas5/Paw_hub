import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuService } from '../../../services/menu.service';
import { CategoryService } from '../../../services/category-service.service';
import { AuthService } from '../../../services/auth.service';
import { Menu, MenuItem } from '../../../models/menu.model';
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
      category: ['', Validators.required],
      items: this.fb.array([])
    });

    this.loadCategories();

    this.menuId = this.route.snapshot.paramMap.get('id') || undefined;
    if (this.menuId) {
      this.editing = true;
      this.menuService.getMenu(this.menuId).subscribe(menu => {
        this.menuForm.patchValue({ category: menu.category });
        // Preencher items
        const itemsArray = this.menuForm.get('items') as FormArray;
        menu.items.forEach(item => {
          itemsArray.push(this.fb.group({
            name: [item.name, Validators.required],
            description: [item.description],
            price: [item.price, [Validators.required, Validators.min(0)]],
            image: [item.image],
            nutritionalInfo: this.fb.group({
              calories: [item.nutritionalInfo?.calories],
              protein: [item.nutritionalInfo?.protein],
              fat: [item.nutritionalInfo?.fat],
              carbs: [item.nutritionalInfo?.carbs],
              sodium: [item.nutritionalInfo?.sodium]
            }),
            doseType: [item.doseType]
          }));
        });
      });
    } else {
      // Adiciona pelo menos um prato por defeito
      this.addMenuItem();
    }
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
    return user.restaurantId || '';
  }

  onSubmit() {
    if (this.menuForm.invalid) return;
    this.loading = true;
    const restaurantId = this.getRestaurantId();
    const data: Menu = {
      ...this.menuForm.value,
      restaurant: restaurantId
    };

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