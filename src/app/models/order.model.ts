import { Menu } from './menu.model';

export interface OrderItem {
  menuItem: string;
  name: string;
  quantity: number;
  price: number;
}

export interface Order {
  id: string;
  customer: string;
  restaurant: string;
  items: OrderItem[];
  total: number;
  status: 'pending' | 'preparing' | 'delivered' | 'completed' | 'cancelled';
  paymentMethod?: string;
  notes?: string;
  deliveryAddress?: string;
  createdAt?: string;
}