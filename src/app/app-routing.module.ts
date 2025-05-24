import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { MenuListComponent } from './components/menu-management/menu-list/menu-list.component';
import { MenuCreateComponent } from './components/menu-management/menu-create/menu-create.component';
import { MenuDetailsComponent } from './components/menu-management/menu-details/menu-details.component';
import { MenuEditComponent } from './components/menu-management/menu-edit/menu-edit.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'menus', component: MenuListComponent },
  { path: 'menus/create', component: MenuCreateComponent },
  { path: 'menus/edit', component: MenuEditComponent },
  { path: 'menus/details', component: MenuDetailsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
