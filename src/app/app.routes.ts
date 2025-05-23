// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { MenuListComponent } from './components/menus/menu-list/menu-list.component';
import { MenuCreateComponent } from './components/menus/menu-create/menu-create.component';
import { MenuDetailsComponent } from './components/menus/menu-details/menu-details.component';
import { MenuEditComponent } from './components/menus/menu-edit/menu-edit.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'menus', component: MenuListComponent },
  { path: 'menus/new', component: MenuCreateComponent },
  { path: 'menus/:id', component: MenuDetailsComponent },
  { path: 'menus/:id/edit', component: MenuEditComponent },
];
