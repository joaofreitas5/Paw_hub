export interface MenuItem {
  name: string;
  description?: string;
  price: number;
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

export interface Menu {
  id: string;
  restaurant: string;
  category: string;
  items: string[]; // Array de Dish IDs
  maxItems?: number;
  available?: boolean;
}