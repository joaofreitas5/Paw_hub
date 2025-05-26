import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../../core/services/category-service/category-service.service';
import { Category } from '../../../models/category.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {
  categories: Category[] = [];
  loading = false;
  error?: string;
  categoryForm!: FormGroup;
  editingCategory: Category | null = null;

  constructor(
    private categoryService: CategoryService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.categoryForm = this.fb.group({
      name: ['', Validators.required],
      description: ['']
    });
    this.loadCategories();
  }

  loadCategories() {
    this.loading = true;
    // Aqui deves obter o restauranteId do utilizador autenticado
    const restaurantId = this.getRestaurantId();
    this.categoryService.getCategoriesByRestaurant(restaurantId).subscribe({
      next: (cats) => {
        this.categories = cats;
        this.loading = false;
      },
      error: () => {
        this.error = 'Erro ao carregar categorias';
        this.loading = false;
      }
    });
  }

  onSubmit() {
    if (this.categoryForm.invalid) return;
    const restaurantId = this.getRestaurantId();
    const data = { ...this.categoryForm.value, restaurantId };
    if (this.editingCategory) {
      this.categoryService.updateCategory(this.editingCategory.id, data).subscribe({
        next: () => {
          this.loadCategories();
          this.cancelEdit();
        }
      });
    } else {
      this.categoryService.createCategory(data).subscribe({
        next: () => {
          this.loadCategories();
          this.categoryForm.reset();
        }
      });
    }
  }

  editCategory(cat: Category) {
    this.editingCategory = cat;
    this.categoryForm.patchValue(cat);
  }

  deleteCategory(cat: Category) {
    if (confirm(`Eliminar categoria "${cat.name}"?`)) {
      this.categoryService.deleteCategory(cat.id).subscribe({
        next: () => this.loadCategories()
      });
    }
  }

  cancelEdit() {
    this.editingCategory = null;
    this.categoryForm.reset();
  }

  getRestaurantId(): string {
    // Exemplo: usar o AuthService para obter o restaurante do user autenticado
    // Ajusta conforme a tua estrutura real
    const user = JSON.parse(localStorage.getItem('user_data') || '{}');
    return user.restaurantId || '';
  }
}