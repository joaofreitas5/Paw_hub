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
  selector: 'app-login',
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
      <h2>Login</h2>
      <form (ngSubmit)="onLogin()">
        <mat-form-field>
          <input matInput [(ngModel)]="username" name="username" placeholder="Username" required />
        </mat-form-field>
        <mat-form-field>
          <input matInput [(ngModel)]="password" name="password" type="password" placeholder="Password" required />
        </mat-form-field>
        <button mat-raised-button color="primary" type="submit">Entrar</button>
      </form>
    </mat-card>
  `
})
export class LoginComponent {
  username = '';
  password = '';

  constructor(private authService: AuthService, private router: Router) {}

  onLogin() {
    this.authService.login({ username: this.username, password: this.password }).subscribe({
      next: () => this.router.navigate(['/']),
      error: err => console.error('Login failed', err)
    });
  }
}
