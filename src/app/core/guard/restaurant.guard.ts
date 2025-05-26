import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UserService } from '../services/user-service/user.service';


@Injectable({ providedIn: 'root' })
export class RestaurantGuard implements CanActivate {
  constructor(private userService: UserService, private router: Router) {}

  canActivate(): boolean {
    const user = this.userService.getCurrentUser();
    if (user && user.role === 'restaurant' && user.isValidated) {
      return true;
    }
    this.router.navigate(['/profile']);
    return false;
  }
}