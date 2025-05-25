import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category?: string;
}

@Component({
  selector: 'app-menu-list',
  templateUrl: './menu-list.component.html',
  imports: [CommonModule, FormsModule]
})
export class MenuListComponent implements OnInit {
  menu: MenuItem[] = [
    { id: 1, name: 'Pizza Margherita', description: 'Clássica pizza italiana', price: 8.5, imageUrl: 'https://static.image/pizza.jpg', category: 'Italiana' },
    { id: 2, name: 'Sushi', description: 'Combo de sushi variado', price: 14, imageUrl: 'https://static.image/sushi.jpg', category: 'Japonesa' }
  ];

  filters = {
    category: '',
    minPrice: null as number | null,
    maxPrice: null as number | null,
    sort: ''
  };

  categories: string[] = ['Italiana', 'Japonesa', 'Portuguesa', 'Vegetariana'];

  constructor(private router: Router) {}

  ngOnInit() {
    this.loadMenu();
  }

  onFilterChange() {
    this.loadMenu();
  }

  loadMenu() {
    let filtered = [...this.menu];
    if (this.filters.category) {
      filtered = filtered.filter(item => item.category === this.filters.category);
    }
    if (this.filters.minPrice != null) {
      filtered = filtered.filter(item => item.price >= (this.filters.minPrice ?? 0));
    }
    if (this.filters.maxPrice != null) {
      filtered = filtered.filter(item => item.price <= (this.filters.maxPrice ?? Infinity));
    }
    if (this.filters.sort === 'asc') {
      filtered = filtered.sort((a, b) => a.price - b.price);
    }
    if (this.filters.sort === 'desc') {
      filtered = filtered.sort((a, b) => b.price - a.price);
    }
    this.menu = filtered;
  }

  goToEdit(item: MenuItem) {
    this.router.navigate(['/menus/edit', item.id]);
  }

  goToDetails(item: MenuItem) {
    this.router.navigate(['/menus/details', item.id]);
  }
}