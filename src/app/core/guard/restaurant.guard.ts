import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../auth-service/auth.service';
import { inject } from '@angular/core';


export const RestaurantGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);
  return authService.getRole() === 'restaurant' || router.parseUrl('/');
};
