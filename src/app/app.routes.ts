import { Routes } from '@angular/router';
import { CanActivate } from '@angular/router';
import { AuthGuard } from './core/guard/auth.guard';
import { AdminGuard } from './core/guard/admin.guard';
import { RestaurantGuard } from './core/guard/restaurant.guard';
import { ClientGuard } from './core/guard/client.guard';

export const routes: Routes = [
  { path: '', loadComponent: () => import('./components/catalog/dish-catalog/dish-catalog.component').then(m => m.DishCatalogComponent) },
  { path: 'login', loadComponent: () => import('./components/auth/login/login.component').then(m => m.LoginComponent) },
  { path: 'register', loadComponent: () => import('./components/auth/register/register.component').then(m => m.RegisterComponent) },
  { path: 'profile', loadComponent: () => import('./components/profile/profile.component').then(m => m.ProfileComponent), canActivate: [AuthGuard]},
  { path: 'cart', loadComponent: () => import('./components/cart/cart/cart.component').then(m => m.CartComponent), canActivate: [ClientGuard] },
  { path: 'checkout', loadComponent: () => import('./components/cart/checkout/checkout.component').then(m => m.CheckoutComponent), canActivate: [ClientGuard] },
  { path: 'orders', loadComponent: () => import('./components/orders/user-orders/user-orders.component').then(m => m.UserOrdersComponent), canActivate: [ClientGuard] },
  { path: 'restaurant/menus', loadComponent: () => import('./components/restaurant/menu-list/menu-list.component').then(m => m.MenuListComponent), canActivate: [RestaurantGuard] },
  { path: 'admin', loadComponent: () => import('./components/admin/admin-dashboard/admin-dashboard.component').then(m => m.AdminDashboardComponent), canActivate: [AdminGuard] },
];
