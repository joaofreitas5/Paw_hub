import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Order {
  id: number;
  clientName: string;
  restaurantId: number;
  items: { name: string; quantity: number; price: number }[];
  status: 'pending' | 'accepted' | 'dispatched' | 'delivered';
  address: string;
  payment: string;
  createdAt: string;
}

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './order.component.html'
})
export class OrderComponent {
  // Exemplo: obter do "carrinho" ou seleção anterior
  cart = JSON.parse(localStorage.getItem('cart') || '[]');
  address = '';
  payment = '';
  clientName = 'João Silva'; // Exemplo; idealmente viria do login
  restaurantId = 1; // Exemplo; normalmente viria do contexto da seleção

  placeOrder() {
    const allOrders: Order[] = JSON.parse(localStorage.getItem('orders') || '[]');
    const newOrder: Order = {
      id: Date.now(),
      clientName: this.clientName,
      restaurantId: this.restaurantId,
      items: this.cart,
      status: 'pending',
      address: this.address,
      payment: this.payment,
      createdAt: new Date().toISOString()
    };
    allOrders.push(newOrder);
    localStorage.setItem('orders', JSON.stringify(allOrders));
    localStorage.removeItem('cart');
    // Redirecionar ou avisar o utilizador
    alert('Encomenda efetuada com sucesso!');
  }
}