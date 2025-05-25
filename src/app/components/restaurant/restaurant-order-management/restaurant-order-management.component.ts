import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Order {
  id: number;
  clientName: string;
  items: any[];
  status: 'pending' | 'accepted' | 'dispatched' | 'delivered';
  address: string;
  payment: string;
}

@Component({
  selector: 'app-restaurant-order-management',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './restaurant-order-management.component.html'
})
export class RestaurantOrderManagementComponent implements OnInit {
  orders: Order[] = [];

  ngOnInit() {
    // Mock: substituir pelo método real de obter o ID do restaurante autenticado
    const restauranteIdDoPainel = 1; // Exemplo fixo
    const allOrders = JSON.parse(localStorage.getItem('orders') || '[]');
    this.orders = allOrders.filter((order: any) => order.restaurantId === restauranteIdDoPainel);
  }

  updateStatus(order: Order, status: 'accepted' | 'dispatched') {
    // Atualiza o status localmente
    const idx = this.orders.findIndex(o => o.id === order.id);
    if (idx !== -1) {
      this.orders[idx].status = status;
    }
    // Atualiza no localStorage global
    const allOrders = JSON.parse(localStorage.getItem('orders') || '[]');
    const globalIdx = allOrders.findIndex((o: any) => o.id === order.id);
    if (globalIdx !== -1) {
      allOrders[globalIdx].status = status;
      localStorage.setItem('orders', JSON.stringify(allOrders));
    }
  }
}