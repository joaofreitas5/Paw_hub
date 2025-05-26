export interface User {
  id: string;
  username: string;
  email: string;
  role: 'user' | 'restaurant' | 'admin';
  isValidated: boolean;
  pendingRestaurantApproval: boolean;
  personalInfo?: {
    name: string;
    address?: string;
    phone?: string;
  };
  // outros campos que uses
}