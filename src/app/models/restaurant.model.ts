import { Category } from './category.model';
import { Menu } from './menu.model';

export interface MenuItem {
  name: string;
  price: number;
  description?: string;
  image?: string;
  nutritionalInfo?: {
    calories?: number;
    protein?: number;
    fat?: number;
    carbs?: number;
    sodium?: number;
  };
  doseType?: string;
}

export interface Restaurant {
  id: string;
  name: string;
  owner: string; // user id
  deliveryTime?: number;
  deliveryRadius?: number;
  maxOrders?: number;
  isMenuReady?: boolean;
  menu?: MenuItem[];
  validated?: boolean;
  createdAt?: string;
  // Optional fields for registration
  email?: string;
  description?: string;
  address?: string;
  phone?: string;
  imageUrl?: string;
}