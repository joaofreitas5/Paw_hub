import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


interface Order {
  id: number;
  clientName: string;
  items: any[];
  status: 'pending' | 'accepted' | 'dispatched' | 'delivered';
  address: string;
  payment: string;
}

@Component({
  selector: 'app-client-order-history',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './order-history.component.html'
})
export class ClientOrderHistoryComponent implements OnInit {
  orders: Order[] = [];
  currentUser = 'João Silva'; // Podes buscar do perfil/autenticação

  ngOnInit() {
    // Mock: substituir pelo método real de obter o nome/email/ID do cliente autenticado
    const clienteLogado = this.currentUser;
    const allOrders = JSON.parse(localStorage.getItem('orders') || '[]');
    this.orders = allOrders.filter((order: any) => order.clientName === clienteLogado);
  }

  confirmDelivered(order: Order) {
    const idx = this.orders.findIndex(o => o.id === order.id);
    if (idx !== -1) {
      this.orders[idx].status = 'delivered';
      // Atualizar no localStorage (atenção, atualiza todos!)
      const allOrders = JSON.parse(localStorage.getItem('orders') || '[]');
      const globalIdx = allOrders.findIndex((o: Order) => o.id === order.id);
      if (globalIdx !== -1) {
        allOrders[globalIdx].status = 'delivered';
        localStorage.setItem('orders', JSON.stringify(allOrders));
      }
    }
  }
}