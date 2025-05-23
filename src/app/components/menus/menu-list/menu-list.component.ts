import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MenuService, MenuItem } from '../../../services/menus/menus.service';


@Component({
  selector: 'app-menu-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <h2>Menus do Restaurante</h2>
    <a routerLink="/menus/new">Criar novo menu</a>
    <ul>
      <li *ngFor="let menu of menus">
        <a [routerLink]="['/menus', menu.id]">{{ menu.name }}</a> - {{ menu.category }}
      </li>
    </ul>
  `
})
export class MenuListComponent implements OnInit {
  menus: MenuItem[] = [];

  constructor(private menuService: MenuService) {}

  ngOnInit() {
    const restaurantId = 'restaurante123'; // substituir depois por auth context
    this.menuService.getMenusByRestaurant(restaurantId).subscribe((data: MenuItem[]) => {
      this.menus = data;
    });
  }
}
