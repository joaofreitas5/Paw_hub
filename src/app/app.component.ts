import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthService } from './services/auth/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  template: `
    <h1>HOOOME is working!!</h1>

    <nav *ngIf="authService.isLoggedIn()">
      <a routerLink="/menus">Menus</a>
      <a (click)="logout()">Logout</a>
    </nav>
    <nav *ngIf="!authService.isLoggedIn()">
      <a routerLink="/login">Login</a>
      <a routerLink="/register">Register</a>
    </nav>

    <router-outlet></router-outlet>
  `,
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'restaurante-app';
  constructor(public authService: AuthService, private router: Router) {}

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
