import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-menu-create',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule, 
  ],
  template: `
    <h2>Criar Novo Menu</h2>
    <form (ngSubmit)="onSubmit()">
      <input [(ngModel)]="menu.name" name="name" placeholder="Nome" required />
      <input [(ngModel)]="menu.category" name="category" placeholder="Categoria" required />
      <textarea [(ngModel)]="menu.description" name="description" placeholder="Descrição"></textarea>
      <input [(ngModel)]="menu.image" name="image" placeholder="URL da Imagem" />
      <input [(ngModel)]="menu.price" name="price" type="number" placeholder="Preço" />
      <textarea [(ngModel)]="menu.nutritionInfo" name="nutritionInfo" placeholder="Informação Nutricional"></textarea>
      <button type="submit">Criar</button>
    </form>
  `
})
export class MenuCreateComponent {
  menu: any = {};

  constructor(private router: Router) {}

  onSubmit() {
    alert('Menu criado com sucesso (mock)!');
    this.router.navigate(['/menus']);
  }
}
