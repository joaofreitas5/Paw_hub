import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { RestaurantListComponent } from "./components/restaurant-list/restaurant-list.component";
import { MenuListComponent } from "./components/menu-list/menu-list.component";
import { OrderConfirmComponent } from "./components/order-confirm/order-confirm.component";
import { ProfileComponent } from "./components/profile/profile.component";
import { LoginComponent } from "./components/login/login.component";
import { RegisterComponent } from "./components/register/register.component";
import { OrderHistoryComponent } from "./components/order-history/order-history.component";

const routes: Routes = [
    {path: '', component: RestaurantListComponent},
    {path: 'restaurants', component: RestaurantListComponent},
    {path: 'order/confirm', component: OrderConfirmComponent },
    {path: 'orders/history', component: OrderHistoryComponent },
    {path: 'profile', component: ProfileComponent },
    {path: 'login', component: LoginComponent },
    {path: 'register', component: RegisterComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
