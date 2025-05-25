import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


interface Dish {
  _id: string;
  name: string;
  price: number;
}

@Component({
  selector: 'app-menu-edit',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './menu-edit.component.html',
  styleUrls: ['./menu-edit.component.css']
})
export class MenuEditComponent implements OnInit {
  restaurantId = 'id_do_restaurante_logado';
  menuDishes: Dish[] = [];
  allDishes: Dish[] = [];
  maxDishes = 10;

  ngOnInit() {
    this.loadMenu();
    this.loadAllDishes();
  }

  loadMenu() {
    // Mock: pratos já no menu
    this.menuDishes = [
      { _id: '1', name: 'Pizza Margherita', price: 8.5 },
      { _id: '2', name: 'Sushi', price: 14 }
    ];
  }

  loadAllDishes() {
    // Mock: todos os pratos disponíveis
    this.allDishes = [
      { _id: '1', name: 'Pizza Margherita', price: 8.5 },
      { _id: '2', name: 'Sushi', price: 14 },
      { _id: '3', name: 'Salada', price: 6 }
    ];
  }

  canAddDish(): boolean {
    return this.menuDishes.length < this.maxDishes;
  }

  addDish(dish: Dish) {
    if (!this.canAddDish()) {
      alert('Limite de 10 pratos atingido!');
      return;
    }
    if (!this.menuDishes.find(d => d._id === dish._id)) {
      this.menuDishes.push(dish);
    }
  }

  removeDish(dish: Dish) {
    this.menuDishes = this.menuDishes.filter(d => d._id !== dish._id);
  }
}
