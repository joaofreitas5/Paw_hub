import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {
  credentials = { email: '', password: '' };
  error = '';
  hidePassword = true;  // Added for password visibility toggle

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    this.authService.login(this.credentials.email, this.credentials.password).subscribe({
      next: _ => {
        const user = this.authService.getUser && this.authService.getUser();
        const role = user?.role;
        if (role === 'admin') {
          this.router.navigate(['/admin']);
        } else if (role === 'restaurant' && user?.isValidated) {
          this.router.navigate(['/restaurant-profile']);
        } else {
          this.router.navigate(['/profile']);
        }
      },
      error: err => this.error = err.error?.message || 'Erro ao autenticar'
    });
  }
}