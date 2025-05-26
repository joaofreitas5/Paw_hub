import { Routes } from '@angular/router';
import { AuthGuard } from './core/guard/auth.guard';
import { AdminGuard } from './core/guard/admin.guard';
import { RestaurantGuard } from './core/guard/restaurant.guard';

// Auth & user
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { UserProfileComponent } from './components/user/user-profile/user-profile.component';
import { ProfileComponent } from './components/user/profile/profile.component';

// Admin
import { AdminDashboardComponent } from './components/admin/admin-dashboard/admin-dashboard.component';
import { RestaurantValidationComponent } from './components/admin/restaurant-validation/restaurant-validation.component';
import { UserListComponent } from './components/admin/user-list/user-list.component';

// Restaurante
import { RestaurantProfileComponent } from './components/restaurant/restaurant-profile/restaurant-profile.component';
import { RestaurantFormComponent } from './components/restaurant/restaurant-form/restaurant-form.component';
import { RestaurantDashboardComponent } from './components/restaurant/restaurant-dashboard/restaurant-dashboard.component';
import { CategoryListComponent } from './components/restaurant/category-list/category-list.component';
import { AvailabilityManagementComponent } from './components/restaurant/availability-management/availability-management.component';

// Menus
import { MenuListComponent } from './components/menu/menu-list/menu-list.component';
import { MenuFormComponent } from './components/menu/menu-form/menu-form.component';
import { MenuDetailsComponent } from './components/menu/menu-details/menu-details.component';

// Dishes
import { DishListComponent } from './components/dish/dish-list/dish-list.component';
import { DishFormComponent } from './components/dish/dish-form/dish-form.component';
import { DishDetailsComponent } from './components/dish/dish-details/dish-details.component';

// Encomendas/Checkout
import { CartComponent } from './components/cart/cart/cart.component';
import { CheckoutComponent } from './components/cart/checkout/checkout.component';
import { OrderFormComponent } from './components/orders/order-form/order-form.component';
import { OrderListComponent } from './components/orders/order-list/order-list.component';
import { OrderDetailsComponent } from './components/orders/order-details/order-details.component';

// Notificações (opcional)
import { NotificationListComponent } from './components/notifications/notification-list/notification-list.component';

export const routes: Routes = [
  // Auth & user
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'user-profile', component: UserProfileComponent, canActivate: [AuthGuard] },

  // Restaurante (perfil, dashboard, edição)
  { path: 'restaurant-profile', component: RestaurantProfileComponent, canActivate: [RestaurantGuard] },
  { path: 'edit-restaurant', component: RestaurantFormComponent, canActivate: [RestaurantGuard] },
  { path: 'restaurant-dashboard', component: RestaurantDashboardComponent, canActivate: [RestaurantGuard] },
  { path: 'categories', component: CategoryListComponent, canActivate: [RestaurantGuard] },
  { path: 'availability', component: AvailabilityManagementComponent, canActivate: [RestaurantGuard] },

  // Menus
  { path: 'menus', component: MenuListComponent, canActivate: [RestaurantGuard] },
  { path: 'add-menu', component: MenuFormComponent, canActivate: [RestaurantGuard] },
  { path: 'edit-menu/:id', component: MenuFormComponent, canActivate: [RestaurantGuard] },
  { path: 'menus/:id', component: MenuDetailsComponent, canActivate: [RestaurantGuard] },

  // Dishes
  { path: 'dishes', component: DishListComponent, canActivate: [RestaurantGuard] },
  { path: 'add-dish', component: DishFormComponent, canActivate: [RestaurantGuard] },
  { path: 'edit-dish/:id', component: DishFormComponent, canActivate: [RestaurantGuard] },
  { path: 'dishes/:id', component: DishDetailsComponent, canActivate: [RestaurantGuard] },

  // Admin
  {
    path: 'admin',
    component: AdminDashboardComponent,
    canActivate: [AdminGuard],
    children: [
      { path: 'validate-restaurants', component: RestaurantValidationComponent, canActivate: [AdminGuard] },
      { path: 'users', component: UserListComponent, canActivate: [AdminGuard] }
    ]
  },

  // Encomendas e checkout
  { path: 'cart', component: CartComponent, canActivate: [AuthGuard] },
  { path: 'checkout', component: CheckoutComponent, canActivate: [AuthGuard] },
  { path: 'order-form', component: OrderFormComponent, canActivate: [AuthGuard] },
  { path: 'orders', component: OrderListComponent, canActivate: [AuthGuard] },
  { path: 'orders/:id', component: OrderDetailsComponent, canActivate: [AuthGuard] },

  // Notificações (opcional)
  { path: 'notifications', component: NotificationListComponent, canActivate: [AuthGuard] },

  // Default
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'login' }
];