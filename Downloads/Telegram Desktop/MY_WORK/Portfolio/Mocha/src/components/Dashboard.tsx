import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Leaf,
  ArrowUpRight,
  ArrowDownLeft,
  Gift,
  TrendingUp,
  Wallet,
  Award,
  LogOut,
  Send,
  QrCode,
  History,
  Sparkles,
  ArrowLeft,
} from 'lucide-react';
import { User, Transaction } from '../types';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { TransactionsList } from './TransactionsList';
import { LoyaltySection } from './LoyaltySection';
import { QuickActions } from './QuickActions';
import { SendMoney } from './SendMoney';
import { ScanQR } from './ScanQR';
import { TopUp } from './TopUp';
import { RedeemRewards } from './RedeemRewards';

interface DashboardProps {
  user: User;
  transactions: Transaction[];
  onLogout: () => void;
  onRefresh?: () => void;
}

export function Dashboard({ user, transactions, onLogout, onRefresh }: DashboardProps) {
  const [activeTab, setActiveTab] = useState<'home' | 'transactions' | 'rewards'>('home');
  const [activeAction, setActiveAction] = useState<string | null>(null);

  const handleActionClick = (actionId: string) => {
    setActiveAction(actionId);
  };

  const handleBackToHome = () => {
    setActiveAction(null);
  };

  const stats = [
    {
      label: 'Total Balance',
      value: `₦${user.balance.toLocaleString()}`,
      icon: Wallet,
      color: 'from-brown-800 to-brown-900',
      change: '+12% this week',
    },
    {
      label: 'Loyalty Points',
      value: user.loyaltyPoints.toLocaleString(),
      icon: Award,
      color: 'from-tea-gold to-amber-600',
      change: '+150 this week',
    },
    {
      label: 'Current Level',
      value: user.level,
      icon: TrendingUp,
      color: 'from-tea-green to-green-700',
      change: '250 pts to next',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-cream-50 via-cream-100 to-cream-200">
      {/* Header */}
      <header className="bg-cream-50/80 backdrop-blur-md border-b border-brown-800/10 sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
                className="w-12 h-12 rounded-full bg-gradient-to-br from-brown-800 to-brown-900 flex items-center justify-center shadow-tea"
              >
                <Leaf className="text-cream-100" size={24} />
              </motion.div>
              <div>
                <h2 className="text-brown-900">Mocha</h2>
                <p className="text-sm text-brown-800/60">Campus Wallet</p>
              </div>
            </div>
            <Button
              onClick={onLogout}
              variant="ghost"
              className="text-brown-800 hover:text-brown-900 hover:bg-cream-200"
            >
              <LogOut size={18} />
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h3 className="text-brown-900 mb-1">
            Welcome! ☕
          </h3>
          <p className="text-brown-800/60">
            Matric: {user.matricNumber} • Let's make today rewarding
          </p>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="border-2 border-brown-800/10 shadow-tea bg-cream-50/80 backdrop-blur-sm hover:shadow-tea-lg transition-all duration-300">
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between mb-4">
                    <div
                      className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center shadow-md`}
                    >
                      <stat.icon className="text-cream-50" size={24} />
                    </div>
                    <span className="text-xs text-tea-green flex items-center gap-1">
                      <TrendingUp size={12} />
                      {stat.change}
                    </span>
                  </div>
                  <p className="text-sm text-brown-800/60 mb-1">{stat.label}</p>
                  <p className="text-brown-900">{stat.value}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Navigation Tabs */}
        {!activeAction && (
          <div className="flex gap-2 mb-6 p-1 bg-cream-100/50 rounded-xl border border-brown-800/10 shadow-sm">
            {[
              { id: 'home', label: 'Home', icon: Wallet },
              { id: 'transactions', label: 'Transactions', icon: History },
              { id: 'rewards', label: 'Rewards', icon: Gift },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex-1 py-3 px-4 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-brown-800 to-brown-900 text-cream-50 shadow-tea'
                    : 'text-brown-800 hover:bg-cream-200'
                }`}
              >
                <tab.icon size={18} />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        )}

        {/* Content Based on Active Action or Tab */}
        {activeAction ? (
          <motion.div
            key={activeAction}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Button
              onClick={handleBackToHome}
              variant="ghost"
              className="text-brown-800 hover:text-brown-900 hover:bg-cream-200 mb-6"
            >
              <ArrowLeft size={18} className="mr-2" />
              Back to Home
            </Button>
            {activeAction === 'send' && <SendMoney currentBalance={user.balance} onSuccess={onRefresh} />}
            {activeAction === 'scan' && <ScanQR onSuccess={onRefresh} />}
            {activeAction === 'topup' && <TopUp onSuccess={onRefresh} />}
            {activeAction === 'rewards' && <RedeemRewards currentPoints={user.loyaltyPoints} />}
          </motion.div>
        ) : (
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            {activeTab === 'home' && (
              <div className="space-y-6">
                <QuickActions onActionClick={handleActionClick} />
                <Card className="border-2 border-brown-800/10 shadow-tea bg-cream-50/80 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-brown-900 flex items-center gap-2">
                      <History size={20} />
                      Recent Activity
                    </CardTitle>
                    <CardDescription className="text-brown-800/60">
                      Your latest campus transactions
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <TransactionsList transactions={transactions.slice(0, 5)} />
                  </CardContent>
                </Card>
              </div>
            )}

            {activeTab === 'transactions' && (
              <Card className="border-2 border-brown-800/10 shadow-tea bg-cream-50/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-brown-900 flex items-center gap-2">
                    <History size={20} />
                    All Transactions
                  </CardTitle>
                  <CardDescription className="text-brown-800/60">
                    Complete history of your campus wallet activity
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <TransactionsList transactions={transactions} />
                </CardContent>
              </Card>
            )}

            {activeTab === 'rewards' && <LoyaltySection user={user} />}
          </motion.div>
        )}
      </div>

      {/* Floating Tea Leaf */}
      <motion.div
        className="fixed bottom-8 right-8 text-tea-green/20 pointer-events-none"
        animate={{
          y: [0, -20, 0],
          rotate: [0, 10, -10, 0],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        <Leaf size={100} />
      </motion.div>
    </div>
  );
}