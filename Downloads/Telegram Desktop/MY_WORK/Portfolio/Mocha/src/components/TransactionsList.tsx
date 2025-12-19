import React from 'react';
import { motion } from 'motion/react';
import {
  ArrowUpRight,
  ArrowDownLeft,
  Gift,
  ShoppingBag,
  Sparkles,
  Clock,
  CheckCircle2,
  XCircle,
} from 'lucide-react';
import { Transaction } from '../types';
import { Badge } from './ui/badge';

interface TransactionsListProps {
  transactions: Transaction[];
}

export function TransactionsList({ transactions }: TransactionsListProps) {
  const getTransactionIcon = (type: Transaction['type']) => {
    switch (type) {
      case 'payment':
        return ShoppingBag;
      case 'transfer':
        return ArrowUpRight;
      case 'received':
        return ArrowDownLeft;
      case 'reward':
        return Gift;
      default:
        return ShoppingBag;
    }
  };

  const getTransactionColor = (type: Transaction['type']) => {
    switch (type) {
      case 'payment':
        return 'text-brown-800';
      case 'transfer':
        return 'text-orange-600';
      case 'received':
        return 'text-tea-green';
      case 'reward':
        return 'text-tea-gold';
      default:
        return 'text-brown-800';
    }
  };

  const getStatusIcon = (status: Transaction['status']) => {
    switch (status) {
      case 'completed':
        return <CheckCircle2 size={16} className="text-tea-green" />;
      case 'pending':
        return <Clock size={16} className="text-tea-gold" />;
      case 'failed':
        return <XCircle size={16} className="text-red-500" />;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));

    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    if (diffInHours < 48) return 'Yesterday';
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  if (transactions.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-20 h-20 rounded-full bg-cream-200 flex items-center justify-center mx-auto mb-4">
          <ShoppingBag className="text-brown-800/40" size={32} />
        </div>
        <p className="text-brown-800/60">No transactions yet</p>
        <p className="text-sm text-brown-800/40 mt-1">
          Start using Mocha to see your transaction history
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {transactions.map((transaction, index) => {
        const Icon = getTransactionIcon(transaction.type);
        const isNegative = transaction.type === 'payment' || transaction.type === 'transfer';

        return (
          <motion.div
            key={transaction.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            className="flex items-center justify-between p-4 rounded-xl bg-cream-100/30 hover:bg-cream-200/50 border border-brown-800/5 transition-all duration-300 group"
          >
            <div className="flex items-center gap-4 flex-1">
              <div
                className={`w-12 h-12 rounded-xl ${getTransactionColor(
                  transaction.type
                )} bg-current/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
              >
                <Icon className={getTransactionColor(transaction.type)} size={20} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <p className="text-brown-900 truncate">{transaction.description}</p>
                  {transaction.pointsEarned && transaction.pointsEarned > 0 && (
                    <Badge
                      variant="outline"
                      className="text-tea-gold border-tea-gold/30 bg-tea-gold/5"
                    >
                      <Sparkles size={12} className="mr-1" />
                      +{transaction.pointsEarned} pts
                    </Badge>
                  )}
                </div>
                <div className="flex items-center gap-2 text-sm text-brown-800/60">
                  {getStatusIcon(transaction.status)}
                  <span>{transaction.recipient || transaction.sender}</span>
                  <span>•</span>
                  <span>{formatDate(transaction.date)}</span>
                </div>
              </div>
            </div>
            <div className="text-right">
              <p
                className={`${
                  isNegative ? 'text-brown-900' : 'text-tea-green'
                }`}
              >
                {isNegative ? '-' : '+'}₦{transaction.amount.toLocaleString()}
              </p>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
