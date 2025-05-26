export interface Menu {
  id: string;
  name: string;
  description?: string;
  price: number;
  categoryId: string;
  imageUrl?: string;
  available: boolean;
  restaurantId: string;
}