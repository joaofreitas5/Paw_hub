import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';


@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [CommonModule, MatToolbarModule, MatButtonModule, MatCardModule],
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent {
  pratos = [
    {
      nome: 'Frango Grelhado',
      descricao: 'Suculento frango grelhado com ervas finas.',
      imagem: 'https://source.unsplash.com/400x200/?grilled,chicken'
    },
    {
      nome: 'Salmão ao Limão',
      descricao: 'Salmão fresco com molho de limão e ervas.',
      imagem: 'https://source.unsplash.com/400x200/?salmon,lemon'
    },
    {
      nome: 'Massa Carbonara',
      descricao: 'Massa italiana com molho cremoso e bacon.',
      imagem: 'https://source.unsplash.com/400x200/?pasta,carbonara'
    }
  ];
}

