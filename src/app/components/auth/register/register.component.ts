import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <h2>Registo</h2>
    <form (ngSubmit)="onRegister()">
      <input [(ngModel)]="username" name="username" placeholder="Username" required />
      <input [(ngModel)]="email" name="email" type="email" placeholder="Email" required />
      <input [(ngModel)]="password" name="password" type="password" placeholder="Password" required />
      <button type="submit">Criar Conta</button>
    </form>
  `
})
export class RegisterComponent {
  username = '';
  email = '';
  password = '';

  constructor(private authService: AuthService, private router: Router) {}

  onRegister() {
    this.authService.register({ username: this.username, email: this.email, password: this.password }).subscribe({
      next: () => this.router.navigate(['/login']),
      error: err => console.error('Registo falhou', err)
    });
  }
}
