import { Category } from './category.model';
import { Menu } from './menu.model';

export interface Restaurant {
  id: string;
  name: string;
  description?: string;
  address?: string;
  phone?: string;
  email: string;
  imageUrl?: string;
  owner?: string; // user id
  validated?: boolean;
}