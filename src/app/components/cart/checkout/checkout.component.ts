import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  cart: CartItem[] = [];
  address: string = '';
  paymentMethod: string = 'mbway';

  ngOnInit() {
    this.cart = JSON.parse(localStorage.getItem('cart') || '[]');
  }

  getTotal() {
    return this.cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  }

  checkout() {
    if (!this.address || this.cart.length === 0) return;
    const orders = JSON.parse(localStorage.getItem('orders') || '[]');
    const newOrder = {
      id: Date.now(),
      clientName: 'Utilizador', // Podes adaptar para buscar do perfil se tiveres
      items: this.cart,
      status: 'pending',
      address: this.address,
      payment: this.paymentMethod
    };
    orders.push(newOrder);
    localStorage.setItem('orders', JSON.stringify(orders));
    localStorage.removeItem('cart');
    alert('Encomenda finalizada com sucesso!');
    // Opcional: window.location.href = '/';
  }
}