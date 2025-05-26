import { Component } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { User } from '../../../models/user.model';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  user: Partial<User> = {
    username: '',
    email: '',
    password: '',
    role: 'user' // Setting default role
  };
  error = '';

  constructor(private authService: AuthService, private router: Router) {}

  register() {
    if (!this.user.role) {
      this.user.role = 'user'; // Ensure role is set
    }
    
    this.authService.register(this.user).subscribe({
      next: () => this.router.navigate(['/login']),
      error: err => this.error = err.error?.message || 'Erro ao registar'
    });
  }
}