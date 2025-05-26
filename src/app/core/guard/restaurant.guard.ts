import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

export const RestaurantGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const user = authService.getUser();
  if (user && user.role === 'restaurant' && user.isValidated) {
    return true;
  }
  return router.parseUrl('/profile');
};