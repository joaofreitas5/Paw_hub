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
  id: string;
  username: string;
  email: string;
  role: 'user' | 'restaurant' | 'admin';
  isValidated?: boolean;
  pendingRestaurantApproval?: boolean;
  personalInfo?: PersonalInfo;
  orderHistory?: OrderHistory[];
}