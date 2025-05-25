import { Component, OnInit } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';

interface Dish {
  name: string;
  category: string;
  price: number;
}

interface Menu {
  id: number;
  name: string;
  dishes: Dish[];
}

@Component({
  selector: 'app-menu-managment',
  templateUrl: './menu-management.component.html',
  styleUrls: ['./menu-management.component.css'],
  imports: [CommonModule, CurrencyPipe]
})
export class MenuManagementComponent implements OnInit {
  menus: Menu[] = [];

  ngOnInit() {
    this.loadMenus();
  }

  loadMenus() {
    this.menus = JSON.parse(localStorage.getItem('menus') || '[]');
  }

  saveMenus() {
    localStorage.setItem('menus', JSON.stringify(this.menus));
  }

  addMenu() {
    const name = prompt('Nome do menu?');
    if (name) {
      const newMenu: Menu = {
        id: Date.now(),
        name,
        dishes: []
      };
      this.menus.push(newMenu);
      this.saveMenus();
    }
  }

  editMenu(menu: Menu) {
    const name = prompt('Novo nome do menu:', menu.name);
    if (name) {
      menu.name = name;
      this.saveMenus();
    }
  }

  addDish(menu: Menu) {
    if (menu.dishes.length >= 10) return;
    const name = prompt('Nome do prato?');
    const category = prompt('Categoria do prato? (carne, peixe, vegetariano, sobremesa)');
    const price = Number(prompt('Preço do prato?'));
    if (name && category && price) {
      menu.dishes.push({ name, category, price });
      this.saveMenus();
    }
  }

  editDish(menu: Menu, dish: Dish) {
    const name = prompt('Novo nome do prato:', dish.name);
    const category = prompt('Nova categoria:', dish.category);
    const priceStr = prompt('Novo preço:', dish.price.toString());
    const price = priceStr !== null && priceStr.trim() !== '' ? Number(priceStr) : dish.price;
    if (name && category && price) {
      dish.name = name;
      dish.category = category;
      dish.price = price;
      this.saveMenus();
    }
  }

  removeDish(menu: Menu, dish: Dish) {
    menu.dishes = menu.dishes.filter(d => d !== dish);
    this.saveMenus();
  }
}