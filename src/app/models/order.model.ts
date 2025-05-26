import { Menu } from './menu.model';

export interface CartItem {
  menu: Menu;
  quantity: number;
}

export interface Order {
  id?: string;
  userId: string;
  restaurantId: string;
  address: string;
  phone: string;
  notes?: string;
  items: CartItem[];
  total: number;
  status: 'pendente' | 'em preparação' | 'enviado' | 'entregue' | 'cancelado';
  createdAt?: Date | string;
}