export interface Dish {
  id: string;
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
  restaurant: string;
  category?: string;
  available?: boolean;
}
