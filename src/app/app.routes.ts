import { Routes } from '@angular/router';
import { AuthGuard } from './core/guard/auth.guard';

// Auth & user
import { RegisterComponent } from './components/auth/register/register.component';
import { LoginComponent } from './components/auth/login/login.component';
import { UserProfileComponent } from './components/user/user-profile/user-profile.component';

// Admin
import { AdminDashboardComponent } from './components/admin/admin-dashboard/admin-dashboard.component';
import { RestaurantValidationComponent } from './components/admin/restaurant-validation/restaurant-validation.component';
import { UserListComponent } from './components/admin/user-list/user-list.component';

// Restaurante
import { RestaurantProfileComponent } from './components/restaurant/restaurant-profile/restaurant-profile.component';
import { RestaurantFormComponent } from './components/restaurant/restaurant-form/restaurant-form.component';

// Menus
import { MenuListComponent } from './components/restaurant/menu-list/menu-list.component';
import { MenuFormComponent } from './components/restaurant/menu-form/menu-form.component';
import { MenuDetailsComponent } from './components/restaurant/menu-details/menu-details.component';

// Encomendas/Checkout
import { CartComponent } from './components/cart/cart/cart.component';
import { CheckoutComponent } from './components/cart/checkout/checkout.component';
import { OrderFormComponent } from './components/orders/order-form/order-form.component';
import { OrderListComponent } from './components/orders/order-list/order-list.component';
import { OrderDetailsComponent } from './components/orders/order-details/order-details.component';

export const routes: Routes = [
  // Auth & user
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'profile', component: UserProfileComponent, canActivate: [AuthGuard] },

  // Restaurante (perfil e edição)
  { path: 'restaurant-profile', component: RestaurantProfileComponent, canActivate: [AuthGuard] },
  { path: 'edit-restaurant', component: RestaurantFormComponent, canActivate: [AuthGuard] },

  // Menus
  { path: 'menus', component: MenuListComponent, canActivate: [AuthGuard] },
  { path: 'add-menu', component: MenuFormComponent, canActivate: [AuthGuard] },
  { path: 'edit-menu/:id', component: MenuFormComponent, canActivate: [AuthGuard] },
  { path: 'menus/:id', component: MenuDetailsComponent, canActivate: [AuthGuard] },

  // Admin
  {
    path: 'admin',
    component: AdminDashboardComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'validate-restaurants', component: RestaurantValidationComponent, canActivate: [AuthGuard] },
      { path: 'users', component: UserListComponent, canActivate: [AuthGuard] }
    ]
  },

  // Encomendas e checkout
  { path: 'cart', component: CartComponent, canActivate: [AuthGuard] },
  { path: 'checkout', component: CheckoutComponent, canActivate: [AuthGuard] },
  { path: 'order-form', component: OrderFormComponent, canActivate: [AuthGuard] },
  { path: 'orders', component: OrderListComponent, canActivate: [AuthGuard] },
  { path: 'orders/:id', component: OrderDetailsComponent, canActivate: [AuthGuard] },

  // Default
  { path: '', redirectTo: 'login', pathMatch: 'full' }
];