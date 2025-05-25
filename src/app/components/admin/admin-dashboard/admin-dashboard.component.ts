import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  totalRestaurants = 0;
  pendingOrders = 0;
  activeMenus = 0;

  ngOnInit() {
    // Mock: buscar stats do localStorage (usar nomes iguais aos usados nas outras páginas)
    const restaurants = JSON.parse(localStorage.getItem('restaurants') || '[]');
    const orders = JSON.parse(localStorage.getItem('orders') || '[]');
    const menus = JSON.parse(localStorage.getItem('menus') || '[]');
    this.totalRestaurants = restaurants.length;
    this.pendingOrders = orders.filter((o: any) => o.status === 'pending').length;
    this.activeMenus = menus.length;
  }
}