export interface User {
  id: string;
  matricNumber: string;
  firstName: string;
  lastName: string;
  email: string;
  balance: number;
  loyaltyPoints: number;
  level: string;
  createdAt: string;
}

export interface Transaction {
  id: string;
  type: 'payment' | 'transfer' | 'received' | 'reward';
  amount: number;
  description: string;
  recipient?: string;
  sender?: string;
  date: string;
  status: 'completed' | 'pending' | 'failed';
  pointsEarned?: number;
}

export interface LoyaltyReward {
  id: string;
  title: string;
  description: string;
  pointsRequired: number;
  icon: string;
  unlocked: boolean;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}
