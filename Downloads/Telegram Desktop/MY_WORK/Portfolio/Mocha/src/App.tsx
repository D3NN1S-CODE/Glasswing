import React, { useState, useEffect } from 'react';
import { AuthPage } from './components/AuthPage';
import { Dashboard } from './components/Dashboard';
import { User, Transaction } from './types';
import { Toaster } from './components/ui/sonner';
import { apiService } from './services/api.service';
import { toast } from 'sonner';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Check for existing auth on mount
  useEffect(() => {
    const checkAuth = async () => {
      // Create a mock user automatically on load
      const mockUser: User = {
        id: '1',
        matricNumber: 'STU2024001',
        firstName: 'Welcome',
        lastName: 'User',
        email: 'user@example.com',
        balance: 50000,
        loyaltyPoints: 1250,
        level: 'Gold',
        createdAt: new Date().toISOString()
      };

      try {
        // Try to fetch real data if token exists
        const token = localStorage.getItem('token');
        if (token) {
          const response = await apiService.getMe();
          const userData = response.data.user;
          
          setCurrentUser({
            id: userData.id,
            matricNumber: userData.matricNumber,
            firstName: userData.firstName,
            lastName: userData.lastName,
            email: userData.email,
            balance: userData.balance,
            loyaltyPoints: userData.loyaltyPoints,
            level: userData.level,
            createdAt: userData.createdAt
          });

          // Fetch transactions
          const txResponse = await apiService.getTransactions({ limit: 50 });
          setTransactions(txResponse.data.transactions);
          
          setIsAuthenticated(true);
        } else {
          // No token? Just use mock user for bypass
          setCurrentUser(mockUser);
          setIsAuthenticated(true);
          
          // Try to fetch mock transactions
          try {
            const txResponse = await apiService.getTransactions({ limit: 50 });
            setTransactions(txResponse.data.transactions);
          } catch (error) {
            // Use empty transactions if API fails
            setTransactions([]);
          }
        }
      } catch (error) {
        // On any error, still authenticate with mock user
        setCurrentUser(mockUser);
        setIsAuthenticated(true);
        setTransactions([]);
      }
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  const handleLogin = async (user: User) => {
    setCurrentUser(user);
    
    try {
      // Fetch fresh transactions after login
      const txResponse = await apiService.getTransactions({ limit: 50 });
      setTransactions(txResponse.data.transactions);
    } catch (error) {
      console.error('Failed to fetch transactions:', error);
    }
    
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    apiService.logout();
    setCurrentUser(null);
    setTransactions([]);
    setIsAuthenticated(false);
    toast.success('Logged out successfully');
  };

  // Refresh user data and transactions
  const refreshData = async () => {
    try {
      const [userResponse, txResponse] = await Promise.all([
        apiService.getMe(),
        apiService.getTransactions({ limit: 50 })
      ]);

      const userData = userResponse.data.user;
      setCurrentUser({
        id: userData.id,
        matricNumber: userData.matricNumber,
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email,
        balance: userData.balance,
        loyaltyPoints: userData.loyaltyPoints,
        level: userData.level,
        createdAt: userData.createdAt
      });

      setTransactions(txResponse.data.transactions);
    } catch (error) {
      console.error('Failed to refresh data:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-cream-50 via-cream-100 to-cream-200 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-brown-800 border-t-transparent"></div>
          <p className="mt-4 text-brown-800">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated || !currentUser) {
    return (
      <>
        <AuthPage onLogin={handleLogin} />
        <Toaster position="top-right" />
      </>
    );
  }

  return (
    <>
      <Dashboard 
        user={currentUser} 
        transactions={transactions} 
        onLogout={handleLogout}
        onRefresh={refreshData}
      />
      <Toaster position="top-right" />
    </>
  );
}