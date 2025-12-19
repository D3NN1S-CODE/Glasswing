import React from 'react';
import { motion } from 'motion/react';
import { Send, QrCode, Smartphone, Store, Plus, Gift } from 'lucide-react';
import { Card, CardContent } from './ui/card';

const actions = [
  {
    id: 'send',
    label: 'Send Money',
    icon: Send,
    description: 'Transfer to friends',
    color: 'from-brown-800 to-brown-900',
  },
  {
    id: 'scan',
    label: 'Scan QR',
    icon: QrCode,
    description: 'Pay vendors',
    color: 'from-tea-green to-green-700',
  },
  {
    id: 'topup',
    label: 'Top Up',
    icon: Plus,
    description: 'Add funds',
    color: 'from-tea-gold to-amber-600',
  },
  {
    id: 'rewards',
    label: 'Redeem',
    icon: Gift,
    description: 'Use points',
    color: 'from-purple-600 to-purple-800',
  },
];

interface QuickActionsProps {
  onActionClick: (actionId: string) => void;
}

export function QuickActions({ onActionClick }: QuickActionsProps) {
  return (
    <Card className="border-2 border-brown-800/10 shadow-tea bg-cream-50/80 backdrop-blur-sm">
      <CardContent className="pt-6">
        <h4 className="text-brown-900 mb-4">Quick Actions</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {actions.map((action, index) => (
            <motion.button
              key={action.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onActionClick(action.id)}
              className="flex flex-col items-center gap-3 p-4 rounded-xl bg-cream-100/50 hover:bg-cream-200/70 border border-brown-800/10 transition-all duration-300"
            >
              <div
                className={`w-14 h-14 rounded-xl bg-gradient-to-br ${action.color} flex items-center justify-center shadow-md`}
              >
                <action.icon className="text-cream-50" size={28} />
              </div>
              <div className="text-center">
                <p className="text-brown-900">{action.label}</p>
                <p className="text-xs text-brown-800/60">{action.description}</p>
              </div>
            </motion.button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}