import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { MenuService, Dish } from '../../../services/menus-service/menus.service';


@Component({
  selector: 'app-menu-details',
  standalone: true,
  imports: [CommonModule],
  template: `
    <h2>Detalhes do Prato</h2>
    <div *ngIf="menu">
      <img [src]="menu.image" alt="{{ menu.name }}" width="200" />
      <h3>{{ menu.name }}</h3>
      <p>{{ menu.description }}</p>
      <p><strong>Categoria:</strong> {{ menu.category }}</p>
      <p><strong>Preço:</strong> {{ menu.price }}€</p>
      <p><strong>Nutrição:</strong> {{ menu.nutritionInfo }}</p>
    </div>
  `
})
export class MenuDetailsComponent implements OnInit {
  menu?: Dish;

  constructor(
    private route: ActivatedRoute,
    private menuService: MenuService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id')!;
    this.menuService.getMenuById(id).subscribe((data: Dish) => {
      this.menu = data;
    });
  }
}
