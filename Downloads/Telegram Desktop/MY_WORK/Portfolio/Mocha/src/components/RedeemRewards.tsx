import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Gift, Coffee, ShoppingBag, Percent, Ticket, Sparkles, Award } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { toast } from 'sonner@2.0.3';

interface RedeemRewardsProps {
  currentPoints: number;
}

interface Reward {
  id: string;
  title: string;
  description: string;
  pointsCost: number;
  icon: any;
  category: 'food' | 'discount' | 'voucher';
  color: string;
  available: number;
}

export function RedeemRewards({ currentPoints }: RedeemRewardsProps) {
  const rewards: Reward[] = [
    {
      id: '1',
      title: 'Free Coffee',
      description: 'Complimentary coffee at Campus Coffee Shop',
      pointsCost: 200,
      icon: Coffee,
      category: 'food',
      color: 'from-brown-600 to-brown-800',
      available: 50,
    },
    {
      id: '2',
      title: '10% Off Cafeteria',
      description: 'Get 10% discount on your next cafeteria meal',
      pointsCost: 150,
      icon: Percent,
      category: 'discount',
      color: 'from-tea-green to-green-700',
      available: 100,
    },
    {
      id: '3',
      title: '₦500 Bookstore Voucher',
      description: 'Redeem for books and stationery',
      pointsCost: 400,
      icon: ShoppingBag,
      category: 'voucher',
      color: 'from-blue-600 to-blue-700',
      available: 30,
    },
    {
      id: '4',
      title: 'Free Lunch Ticket',
      description: 'One complimentary lunch at any campus vendor',
      pointsCost: 500,
      icon: Ticket,
      category: 'food',
      color: 'from-orange-600 to-orange-700',
      available: 25,
    },
    {
      id: '5',
      title: '20% Off Store',
      description: 'Save big on your next campus store purchase',
      pointsCost: 300,
      icon: Percent,
      category: 'discount',
      color: 'from-purple-600 to-purple-700',
      available: 75,
    },
    {
      id: '6',
      title: '₦1000 Wallet Credit',
      description: 'Direct credit to your Mocha wallet',
      pointsCost: 800,
      icon: Gift,
      category: 'voucher',
      color: 'from-tea-gold to-amber-600',
      available: 20,
    },
  ];

  const handleRedeem = (reward: Reward) => {
    if (currentPoints < reward.pointsCost) {
      toast.error('Insufficient points', {
        description: `You need ${reward.pointsCost - currentPoints} more points to redeem this reward.`,
      });
      return;
    }

    toast.success('Reward redeemed! 🎉', {
      description: `${reward.title} has been added to your rewards. Check your email for the voucher code.`,
    });
  };

  const categories = [
    { id: 'all', label: 'All Rewards', icon: Gift },
    { id: 'food', label: 'Food & Drinks', icon: Coffee },
    { id: 'discount', label: 'Discounts', icon: Percent },
    { id: 'voucher', label: 'Vouchers', icon: Ticket },
  ];

  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredRewards =
    selectedCategory === 'all'
      ? rewards
      : rewards.filter((r) => r.category === selectedCategory);

  return (
    <div className="space-y-6">
      {/* Points Overview */}
      <Card className="border-2 border-brown-800/10 shadow-tea-lg bg-gradient-to-br from-cream-50 to-cream-100 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-tea-gold/10 rounded-full blur-3xl" />
        <CardHeader className="relative z-10">
          <CardTitle className="text-brown-900 flex items-center gap-2">
            <Award className="text-tea-gold" size={24} />
            Redeem Your Rewards
          </CardTitle>
          <CardDescription className="text-brown-800/60">
            Use your loyalty points to unlock exclusive campus perks
          </CardDescription>
        </CardHeader>
        <CardContent className="relative z-10">
          <div className="p-6 rounded-xl bg-gradient-to-r from-tea-gold/20 to-tea-green/20 border border-tea-gold/30">
            <div className="flex items-center justify-between mb-3">
              <div>
                <p className="text-sm text-brown-800/60 mb-1">Available Points</p>
                <p className="text-brown-900">{currentPoints.toLocaleString()}</p>
              </div>
              <Sparkles className="text-tea-gold" size={40} />
            </div>
            <Progress value={(currentPoints % 1000) / 10} className="h-2" />
            <p className="text-sm text-brown-800/60 mt-2">
              {1000 - (currentPoints % 1000)} points to next level
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Category Filter */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {categories.map((category) => (
          <Button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            variant={selectedCategory === category.id ? 'default' : 'outline'}
            className={`flex-shrink-0 ${
              selectedCategory === category.id
                ? 'bg-gradient-to-r from-brown-800 to-brown-900 text-cream-50'
                : 'border-brown-800/20 hover:bg-cream-200 text-brown-900'
            }`}
          >
            <category.icon size={16} className="mr-2" />
            {category.label}
          </Button>
        ))}
      </div>

      {/* Rewards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredRewards.map((reward, index) => {
          const canAfford = currentPoints >= reward.pointsCost;
          const Icon = reward.icon;

          return (
            <motion.div
              key={reward.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card
                className={`border-2 transition-all duration-300 ${
                  canAfford
                    ? 'border-brown-800/10 hover:border-tea-green/50 hover:shadow-tea-lg bg-cream-50/80'
                    : 'border-brown-800/5 bg-cream-100/30 opacity-70'
                }`}
              >
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between mb-4">
                    <div
                      className={`w-14 h-14 rounded-xl bg-gradient-to-br ${reward.color} flex items-center justify-center shadow-md`}
                    >
                      <Icon className="text-cream-50" size={28} />
                    </div>
                    <Badge
                      variant="outline"
                      className={`${
                        canAfford
                          ? 'border-tea-gold/30 text-tea-gold bg-tea-gold/5'
                          : 'border-brown-800/20 text-brown-800/40'
                      }`}
                    >
                      <Sparkles size={12} className="mr-1" />
                      {reward.pointsCost} pts
                    </Badge>
                  </div>

                  <h4 className={`${canAfford ? 'text-brown-900' : 'text-brown-800/60'} mb-2`}>
                    {reward.title}
                  </h4>
                  <p className="text-sm text-brown-800/60 mb-4">{reward.description}</p>

                  <div className="flex items-center justify-between">
                    <span className="text-xs text-brown-800/50">
                      {reward.available} available
                    </span>
                    <Button
                      onClick={() => handleRedeem(reward)}
                      disabled={!canAfford}
                      size="sm"
                      className={`${
                        canAfford
                          ? 'bg-gradient-to-r from-brown-800 to-brown-900 hover:from-brown-900 hover:to-brown-950 text-cream-50'
                          : 'bg-brown-800/20 text-brown-800/40 cursor-not-allowed'
                      }`}
                    >
                      {canAfford ? 'Redeem' : 'Locked'}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Info Card */}
      <Card className="border-2 border-tea-green/20 shadow-tea bg-gradient-to-br from-tea-green/5 to-cream-50">
        <CardContent className="pt-6">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-tea-green/20 flex items-center justify-center flex-shrink-0">
              <Sparkles className="text-tea-green" size={20} />
            </div>
            <div>
              <h4 className="text-brown-900 mb-2">How to Earn More Points</h4>
              <ul className="space-y-1 text-sm text-brown-800/70">
                <li>• Make campus transactions (1 point per ₦100)</li>
                <li>• Complete daily challenges and missions</li>
                <li>• Refer friends to join Mocha</li>
                <li>• Maintain regular transaction activity</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
