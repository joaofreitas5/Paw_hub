import { CanActivateFn } from '@angular/router';
import { AuthService } from '../auth-service/auth.service';
import { Router } from '@angular/router';
import { inject } from '@angular/core';

export const UserGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const user = authService.getUser();
  return user && user.role === 'user' ? true : router.parseUrl('/');
};
