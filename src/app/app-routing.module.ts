import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { MenuListComponent } from './components/restaurant/menu-list/menu-list.component';
import { MenuCreateComponent } from './components/restaurant/menu-create/menu-create.component';
import { DishDetailsComponent } from './components/restaurant/dish-details/dish-details.component';
import { MenuEditComponent } from './components/restaurant/menu-edit/menu-edit.component';
import { CartComponent } from './components/cart/cart/cart.component';
import { CheckoutComponent } from './components/cart/checkout/checkout.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'menus', component: MenuListComponent },
  { path: 'menus/create', component: MenuCreateComponent },
  { path: 'menus/edit', component: MenuEditComponent },
  { path: 'menus/details', component: DishDetailsComponent },
  { path: 'perfil', loadComponent: () => import('./components/profile/profile.component').then(m => m.ProfileComponent)},
  { path: 'cart', component: CartComponent },
  { path: 'cart/checkout', component: CheckoutComponent }, 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}