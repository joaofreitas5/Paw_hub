import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (!this.auth.isLoggedIn()) {
      this.router.navigate(['/login']);
      return false;
    }

    const userRole = this.auth.getUserRole();
    const allowedRoles = this.getAllowedRolesForRoute(this.router.url);

    if (!allowedRoles.includes(userRole)) {
      this.router.navigate(['/unauthorized']);
      return false;
    }

    return true;
  }

  private getAllowedRolesForRoute(route: string): string[] {
    // Define role-based access control for routes here
    const roleBasedRoutes = {
      '/admin': ['admin'],
      '/user': ['admin', 'user'],
      // Add more routes and their allowed roles as needed
    };

    return roleBasedRoutes[route] || [];
  }
}
