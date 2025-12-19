import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Send, User, DollarSign, MessageSquare, ArrowRight } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { toast } from 'sonner';
import { apiService } from '../services/api.service';

interface SendMoneyProps {
  currentBalance: number;
  onSuccess?: () => void;
}

export function SendMoney({ currentBalance, onSuccess }: SendMoneyProps) {
  const [formData, setFormData] = useState({
    recipient: '',
    amount: '',
    note: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const amount = parseFloat(formData.amount);
    
    if (amount > currentBalance) {
      toast.error('Insufficient balance', {
        description: 'You do not have enough funds for this transfer.',
      });
      return;
    }

    if (amount < 100) {
      toast.error('Minimum amount is ₦100');
      return;
    }

    setIsLoading(true);

    try {
      const response = await apiService.sendMoney({
        recipientMatricNumber: formData.recipient,
        amount,
        note: formData.note || undefined
      });

      toast.success('Transfer successful! ✨', {
        description: `₦${amount.toLocaleString()} sent to ${formData.recipient}. You earned ${response.data.pointsEarned} loyalty points!`,
      });

      // Reset form
      setFormData({ recipient: '', amount: '', note: '' });

      // Refresh parent data
      if (onSuccess) {
        onSuccess();
      }
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Transfer failed';
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const quickAmounts = [500, 1000, 2000, 5000];

  return (
    <div className="space-y-6">
      <Card className="border-2 border-brown-800/10 shadow-tea-lg bg-gradient-to-br from-cream-50 to-cream-100">
        <CardHeader>
          <CardTitle className="text-brown-900 flex items-center gap-2">
            <Send className="text-brown-800" size={24} />
            Send Money
          </CardTitle>
          <CardDescription className="text-brown-800/60">
            Transfer funds to fellow Covenant University students
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Available Balance */}
            <div className="p-4 rounded-xl bg-tea-green/10 border border-tea-green/20">
              <p className="text-sm text-brown-800/60 mb-1">Available Balance</p>
              <p className="text-brown-900">
                ₦{currentBalance.toLocaleString()}
              </p>
            </div>

            {/* Recipient */}
            <div className="space-y-2">
              <Label htmlFor="recipient" className="text-brown-900">
                Recipient Matric Number
              </Label>
              <div className="relative">
                <User
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-brown-800/40"
                  size={18}
                />
                <Input
                  id="recipient"
                  type="text"
                  placeholder="e.g., 19CSC045"
                  value={formData.recipient}
                  onChange={(e) => setFormData({ ...formData, recipient: e.target.value })}
                  className="pl-10 bg-cream-100/50 border-brown-800/20 focus:border-tea-green"
                  required
                />
              </div>
            </div>

            {/* Amount */}
            <div className="space-y-2">
              <Label htmlFor="amount" className="text-brown-900">
                Amount (₦)
              </Label>
              <div className="relative">
                <DollarSign
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-brown-800/40"
                  size={18}
                />
                <Input
                  id="amount"
                  type="number"
                  placeholder="0.00"
                  value={formData.amount}
                  onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                  className="pl-10 bg-cream-100/50 border-brown-800/20 focus:border-tea-green"
                  required
                  min="100"
                  step="50"
                />
              </div>

              {/* Quick Amount Buttons */}
              <div className="grid grid-cols-4 gap-2 mt-3">
                {quickAmounts.map((amount) => (
                  <Button
                    key={amount}
                    type="button"
                    variant="outline"
                    onClick={() => setFormData({ ...formData, amount: amount.toString() })}
                    className="border-brown-800/20 hover:bg-tea-green/10 hover:border-tea-green text-brown-900"
                  >
                    ₦{amount}
                  </Button>
                ))}
              </div>
            </div>

            {/* Note */}
            <div className="space-y-2">
              <Label htmlFor="note" className="text-brown-900">
                Note (Optional)
              </Label>
              <div className="relative">
                <MessageSquare
                  className="absolute left-3 top-3 text-brown-800/40"
                  size={18}
                />
                <Textarea
                  id="note"
                  placeholder="Add a message..."
                  value={formData.note}
                  onChange={(e) => setFormData({ ...formData, note: e.target.value })}
                  className="pl-10 bg-cream-100/50 border-brown-800/20 focus:border-tea-green resize-none"
                  rows={3}
                />
              </div>
            </div>

            {/* Points Preview */}
            {formData.amount && parseFloat(formData.amount) >= 100 && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 rounded-xl bg-tea-gold/10 border border-tea-gold/20"
              >
                <p className="text-sm text-brown-800/70">
                  You'll earn{' '}
                  <span className="text-tea-gold">
                    {Math.floor(parseFloat(formData.amount) / 100)} loyalty points
                  </span>{' '}
                  from this transaction! ✨
                </p>
              </motion.div>
            )}

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-brown-800 to-brown-900 hover:from-brown-900 hover:to-brown-950 text-cream-50 shadow-tea disabled:opacity-50"
            >
              {isLoading ? 'Processing...' : 'Send Money'}
              <ArrowRight size={18} className="ml-2" />
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Recent Recipients */}
      <Card className="border-2 border-brown-800/10 shadow-tea bg-cream-50/80">
        <CardHeader>
          <CardTitle className="text-brown-900">Recent Recipients</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {['19CSC045', '20ENG032', '18BIO015'].map((matric) => (
              <button
                key={matric}
                type="button"
                onClick={() => setFormData({ ...formData, recipient: matric })}
                className="w-full p-3 rounded-xl bg-cream-100/50 hover:bg-cream-200/70 border border-brown-800/10 text-left transition-all duration-300 flex items-center justify-between group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-brown-800 to-brown-900 flex items-center justify-center">
                    <User className="text-cream-50" size={18} />
                  </div>
                  <span className="text-brown-900">{matric}</span>
                </div>
                <ArrowRight
                  size={18}
                  className="text-brown-800/40 group-hover:text-brown-800 group-hover:translate-x-1 transition-all"
                />
              </button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
