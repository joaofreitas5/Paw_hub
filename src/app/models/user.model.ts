export interface PersonalInfo {
  name: string;
  address?: string;
  phone?: string;
}

export interface OrderHistory {
  orderId: string;
  date: string;
}

export interface User {
  _id?: string;
  id?: string;
  username: string;
  email: string;
  password?: string;
  role: 'user' | 'restaurant' | 'admin';
  userID?: string;
  isValidated?: boolean;
  pendingRestaurantApproval?: boolean;
  personalInfo?: PersonalInfo;
  orderHistory?: OrderHistory[];
  restaurantValidation?: boolean;
  restaurantId?: string; // Add this for restaurant users
}