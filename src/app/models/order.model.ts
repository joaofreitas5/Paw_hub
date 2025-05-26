import { Menu } from './menu.model';

export interface CartItem {
  menu: Menu;
  quantity: number;
}

export interface Order {
  id: string;
  user: string; // user id
  restaurantId: string;
  items: any[];
  status: string;
  address: string;
  payment: string;
  createdAt: string;
}