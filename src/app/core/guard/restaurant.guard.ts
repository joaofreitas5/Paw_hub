import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../auth-service/auth.service';

@Injectable({ providedIn: 'root' })
export class RestaurantGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}

  canActivate(): boolean {
    const user = this.auth['userSubject'].value;
    if (user?.role !== 'restaurant' || !user?.isValidated) {
      this.router.navigate(['/not-authorized']);
      return false;
    }
    return true;
  }
}