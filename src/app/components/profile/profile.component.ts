import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../core/auth-service/auth.service';

@Component({
  standalone: true,
  selector: 'app-profile',
  imports: [CommonModule],
  template: `<p>A redirecionar para o seu perfil...</p>`,
})
export class ProfileComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    const role = this.authService.getRole();

    if (!role) {
      this.router.navigate(['/login']);
      return;
    }

    switch (role) {
      case 'client':
        this.router.navigate(['/orders']); // ou '/profile/client'
        break;
      case 'restaurant':
        this.router.navigate(['/restaurant/menus']); // ou '/profile/restaurant'
        break;
      case 'admin':
        this.router.navigate(['/admin']);
        break;
      default:
        this.router.navigate(['/']);
    }
  }
}
