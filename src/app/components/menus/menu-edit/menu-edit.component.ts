import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MenuService, MenuItem } from '../../../services/menus/menus.service';


@Component({
  selector: 'app-menu-edit',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <h2>Editar Menu</h2>
    <form *ngIf="menu" (ngSubmit)="onSubmit()">
      <input [(ngModel)]="menu.name" name="name" />
      <input [(ngModel)]="menu.category" name="category" />
      <textarea [(ngModel)]="menu.description" name="description"></textarea>
      <input [(ngModel)]="menu.image" name="image" />
      <input [(ngModel)]="menu.price" name="price" type="number" />
      <textarea [(ngModel)]="menu.nutritionInfo" name="nutritionInfo"></textarea>
      <button type="submit">Guardar</button>
    </form>
  `
})
export class MenuEditComponent implements OnInit {
  menu?: MenuItem;

  constructor(
    private route: ActivatedRoute,
    private menuService: MenuService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')!;
    this.menuService.getMenuById(id).subscribe((menu: MenuItem) => (this.menu = menu));
  }

  onSubmit() {
    if (!this.menu?.id) return;
    this.menuService.updateMenu(this.menu.id, this.menu).subscribe(() => {
      this.router.navigate(['/menus', this.menu!.id]);
    });
  }
}
