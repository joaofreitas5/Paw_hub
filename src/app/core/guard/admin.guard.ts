import { Injectable } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../auth-service/auth.service';


export const AdminGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  // Exemplo: supõe-se que AuthService tem método isLoggedIn() e getUser()
  if (authService.isLoggedIn() && authService.getUser()?.role === 'admin') {
    return true;
  } else {
    router.navigate(['/login']);
    return false;
  }
};