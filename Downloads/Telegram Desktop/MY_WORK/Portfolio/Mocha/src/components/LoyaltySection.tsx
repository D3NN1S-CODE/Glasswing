import React from 'react';
import { motion } from 'motion/react';
import {
  Award,
  Trophy,
  Crown,
  Sparkles,
  TrendingUp,
  Coffee,
  Lock,
  Check,
} from 'lucide-react';
import { User } from '../types';
import { loyaltyRewards } from '../lib/mockData';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';

interface LoyaltySectionProps {
  user: User;
}

const iconMap: Record<string, any> = {
  coffee: Coffee,
  award: Award,
  'trending-up': TrendingUp,
  crown: Crown,
  sparkles: Sparkles,
  trophy: Trophy,
};

export function LoyaltySection({ user }: LoyaltySectionProps) {
  const progressToNext = Math.min((user.loyaltyPoints % 500) / 500, 1) * 100;
  const nextMilestone = Math.ceil(user.loyaltyPoints / 500) * 500;

  const levels = [
    { name: 'Fresh Brew', min: 0, color: 'from-brown-400 to-brown-500' },
    { name: 'Steeping', min: 500, color: 'from-brown-600 to-brown-700' },
    { name: 'Gold Brew', min: 1000, color: 'from-tea-gold to-amber-600' },
    { name: 'Tea Master', min: 2000, color: 'from-purple-600 to-purple-800' },
    { name: 'Legend', min: 5000, color: 'from-pink-600 to-rose-800' },
  ];

  const currentLevelIndex = levels.findIndex(
    (level, i) =>
      user.loyaltyPoints >= level.min &&
      (i === levels.length - 1 || user.loyaltyPoints < levels[i + 1].min)
  );

  return (
    <div className="space-y-6">
      {/* Level Progress Card */}
      <Card className="border-2 border-brown-800/10 shadow-tea-lg bg-gradient-to-br from-cream-50 to-cream-100 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-tea-green/5 rounded-full blur-3xl" />
        <CardHeader className="relative z-10">
          <div className="flex items-start justify-between">
            <div>
              <CardTitle className="text-brown-900 flex items-center gap-2 mb-2">
                <Crown className="text-tea-gold" size={24} />
                Your Brew Level
              </CardTitle>
              <CardDescription className="text-brown-800/60">
                Keep brewing to unlock exclusive rewards
              </CardDescription>
            </div>
            <Badge
              className={`bg-gradient-to-r ${levels[currentLevelIndex].color} text-cream-50 border-0 px-4 py-2`}
            >
              {user.level}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="relative z-10">
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-brown-800/60">
                  {user.loyaltyPoints.toLocaleString()} points
                </span>
                <span className="text-sm text-tea-green">
                  {nextMilestone - user.loyaltyPoints} to next milestone
                </span>
              </div>
              <Progress value={progressToNext} className="h-3" />
            </div>

            {/* Level Milestones */}
            <div className="grid grid-cols-5 gap-2 pt-4">
              {levels.map((level, index) => (
                <motion.div
                  key={level.name}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center"
                >
                  <div
                    className={`w-12 h-12 mx-auto rounded-full flex items-center justify-center mb-2 ${
                      index <= currentLevelIndex
                        ? `bg-gradient-to-br ${level.color} shadow-md`
                        : 'bg-cream-200 text-brown-800/40'
                    } transition-all duration-300`}
                  >
                    {index <= currentLevelIndex ? (
                      <Check className="text-cream-50" size={20} />
                    ) : (
                      <Lock size={16} />
                    )}
                  </div>
                  <p
                    className={`text-xs ${
                      index <= currentLevelIndex ? 'text-brown-900' : 'text-brown-800/40'
                    }`}
                  >
                    {level.name}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Rewards Grid */}
      <Card className="border-2 border-brown-800/10 shadow-tea bg-cream-50/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-brown-900 flex items-center gap-2">
            <Trophy className="text-tea-gold" size={20} />
            Achievement Rewards
          </CardTitle>
          <CardDescription className="text-brown-800/60">
            Unlock badges by completing challenges
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {loyaltyRewards.map((reward, index) => {
              const Icon = iconMap[reward.icon] || Award;
              const isUnlocked = reward.unlocked;

              return (
                <motion.div
                  key={reward.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                    isUnlocked
                      ? 'bg-cream-100/50 border-tea-gold/30 hover:border-tea-gold/50 hover:shadow-md'
                      : 'bg-cream-100/20 border-brown-800/10 opacity-60'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className={`w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0 ${
                        isUnlocked
                          ? 'bg-gradient-to-br from-tea-gold to-amber-600 shadow-md'
                          : 'bg-cream-200'
                      }`}
                    >
                      <Icon
                        className={isUnlocked ? 'text-cream-50' : 'text-brown-800/40'}
                        size={24}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-1">
                        <h4
                          className={`${
                            isUnlocked ? 'text-brown-900' : 'text-brown-800/60'
                          }`}
                        >
                          {reward.title}
                        </h4>
                        {isUnlocked && (
                          <Check className="text-tea-green flex-shrink-0" size={20} />
                        )}
                      </div>
                      <p className="text-sm text-brown-800/60 mb-2">{reward.description}</p>
                      <Badge
                        variant="outline"
                        className={`text-xs ${
                          isUnlocked
                            ? 'border-tea-gold/30 text-tea-gold'
                            : 'border-brown-800/20 text-brown-800/40'
                        }`}
                      >
                        <Sparkles size={12} className="mr-1" />
                        {reward.pointsRequired.toLocaleString()} pts
                      </Badge>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Earning Tips */}
      <Card className="border-2 border-tea-green/20 shadow-tea bg-gradient-to-br from-tea-green/5 to-cream-50">
        <CardContent className="pt-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-tea-green/20 flex items-center justify-center flex-shrink-0">
              <Sparkles className="text-tea-green" size={24} />
            </div>
            <div>
              <h4 className="text-brown-900 mb-2">How to Earn Points</h4>
              <ul className="space-y-2 text-sm text-brown-800/70">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-tea-green" />
                  Earn 1 point for every ₦100 spent on campus
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-tea-green" />
                  Get bonus points for daily transactions
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-tea-green" />
                  Complete challenges for extra rewards
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
