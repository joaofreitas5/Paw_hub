import { CanActivateFn } from '@angular/router';
import { AuthService } from '../auth-service/auth.service';
import { Router } from '@angular/router';
import { inject } from '@angular/core';

export const ClientGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);
  return authService.getRole() === 'client' || router.parseUrl('/');
};
