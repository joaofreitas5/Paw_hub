import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  template: `
    <mat-card>
      <h2>Registo</h2>
      <form (ngSubmit)="onRegister()">
        <mat-form-field>
          <input matInput [(ngModel)]="username" name="username" placeholder="Username" required />
        </mat-form-field>
        <mat-form-field>
          <input matInput [(ngModel)]="email" name="email" type="email" placeholder="Email" required />
        </mat-form-field>
        <mat-form-field>
          <input matInput [(ngModel)]="password" name="password" type="password" placeholder="Password" required />
        </mat-form-field>
        <button mat-raised-button type="submit">Criar Conta</button>
      </form>
    </mat-card>
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
