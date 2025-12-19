import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Plus, CreditCard, Smartphone, Building2, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { toast } from 'sonner';
import { apiService } from '../services/api.service';

interface TopUpProps {
  onSuccess?: () => void;
}

export function TopUp({ onSuccess }: TopUpProps) {
  const [amount, setAmount] = useState('');
  const [selectedMethod, setSelectedMethod] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  const quickAmounts = [1000, 2000, 5000, 10000];

  const paymentMethods = [
    {
      id: 'card',
      name: 'Debit/Credit Card',
      icon: CreditCard,
      description: 'Instant top-up',
      color: 'from-blue-600 to-blue-700',
    },
    {
      id: 'transfer',
      name: 'Bank Transfer',
      icon: Building2,
      description: '10-30 mins',
      color: 'from-tea-green to-green-700',
    },
    {
      id: 'ussd',
      name: 'USSD Code',
      icon: Smartphone,
      description: 'Dial code to pay',
      color: 'from-purple-600 to-purple-700',
    },
  ];

  const handleTopUp = async () => {
    if (!amount || parseFloat(amount) < 500) {
      toast.error('Minimum top-up is ₦500');
      return;
    }

    if (!selectedMethod) {
      toast.error('Please select a payment method');
      return;
    }

    setIsLoading(true);

    try {
      const response = await apiService.topUpWallet({
        amount: parseFloat(amount),
        paymentMethod: selectedMethod
      });

      toast.success('Top-up successful! 🎉', {
        description: `₦${parseFloat(amount).toLocaleString()} has been added to your wallet.`,
      });

      setAmount('');
      setSelectedMethod('');

      // Refresh parent data
      if (onSuccess) {
        onSuccess();
      }
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Top-up failed';
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card className="border-2 border-brown-800/10 shadow-tea-lg bg-gradient-to-br from-cream-50 to-cream-100">
        <CardHeader>
          <CardTitle className="text-brown-900 flex items-center gap-2">
            <Plus className="text-brown-800" size={24} />
            Top Up Wallet
          </CardTitle>
          <CardDescription className="text-brown-800/60">
            Add funds to your Mocha campus wallet securely
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Amount Input */}
            <div className="space-y-2">
              <Label htmlFor="topup-amount" className="text-brown-900">
                Enter Amount (₦)
              </Label>
              <div className="relative">
                <Input
                  id="topup-amount"
                  type="number"
                  placeholder="0.00"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="text-2xl h-16 pl-4 bg-cream-100/50 border-brown-800/20 focus:border-tea-green"
                  min="500"
                  step="100"
                />
              </div>

              {/* Quick Amount Buttons */}
              <div className="grid grid-cols-4 gap-2 mt-3">
                {quickAmounts.map((quickAmount) => (
                  <Button
                    key={quickAmount}
                    type="button"
                    variant="outline"
                    onClick={() => setAmount(quickAmount.toString())}
                    className="border-brown-800/20 hover:bg-tea-green/10 hover:border-tea-green text-brown-900"
                  >
                    ₦{quickAmount.toLocaleString()}
                  </Button>
                ))}
              </div>

              <p className="text-sm text-brown-800/60">Minimum top-up: ₦500</p>
            </div>

            {/* Payment Methods */}
            <div className="space-y-3">
              <Label className="text-brown-900">Select Payment Method</Label>
              <div className="space-y-2">
                {paymentMethods.map((method, index) => (
                  <motion.button
                    key={method.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    type="button"
                    onClick={() => setSelectedMethod(method.id)}
                    className={`w-full p-4 rounded-xl border-2 transition-all duration-300 text-left ${
                      selectedMethod === method.id
                        ? 'border-tea-green bg-tea-green/10 shadow-md'
                        : 'border-brown-800/10 bg-cream-100/30 hover:bg-cream-200/50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-12 h-12 rounded-xl bg-gradient-to-br ${method.color} flex items-center justify-center shadow-md`}
                        >
                          <method.icon className="text-cream-50" size={24} />
                        </div>
                        <div>
                          <p className="text-brown-900 mb-1">{method.name}</p>
                          <p className="text-sm text-brown-800/60">{method.description}</p>
                        </div>
                      </div>
                      {selectedMethod === method.id && (
                        <CheckCircle2 className="text-tea-green" size={24} />
                      )}
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Summary */}
            {amount && parseFloat(amount) >= 500 && selectedMethod && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 rounded-xl bg-cream-200/50 border border-brown-800/10 space-y-2"
              >
                <div className="flex justify-between text-sm">
                  <span className="text-brown-800/70">Top-up Amount</span>
                  <span className="text-brown-900">
                    ₦{parseFloat(amount).toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-brown-800/70">Transaction Fee</span>
                  <span className="text-brown-900">₦0.00</span>
                </div>
                <div className="h-px bg-brown-800/10 my-2" />
                <div className="flex justify-between">
                  <span className="text-brown-900">Total</span>
                  <span className="text-brown-900">
                    ₦{parseFloat(amount).toLocaleString()}
                  </span>
                </div>
              </motion.div>
            )}

            <Button
              onClick={handleTopUp}
              disabled={!amount || !selectedMethod || parseFloat(amount) < 500 || isLoading}
              className="w-full bg-gradient-to-r from-brown-800 to-brown-900 hover:from-brown-900 hover:to-brown-950 text-cream-50 shadow-tea disabled:opacity-50"
            >
              {isLoading ? 'Processing...' : 'Proceed to Payment'}
              <ArrowRight size={18} className="ml-2" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Info Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Card className="border-2 border-tea-green/20 shadow-tea bg-gradient-to-br from-tea-green/5 to-cream-50">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-tea-green/20 flex items-center justify-center flex-shrink-0">
                <CheckCircle2 className="text-tea-green" size={20} />
              </div>
              <div>
                <h4 className="text-brown-900 mb-1">Instant Transfer</h4>
                <p className="text-sm text-brown-800/70">
                  Funds are credited to your wallet immediately
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-2 border-tea-gold/20 shadow-tea bg-gradient-to-br from-tea-gold/5 to-cream-50">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-tea-gold/20 flex items-center justify-center flex-shrink-0">
                <Plus className="text-tea-gold" size={20} />
              </div>
              <div>
                <h4 className="text-brown-900 mb-1">Zero Fees</h4>
                <p className="text-sm text-brown-800/70">
                  No hidden charges or transaction fees
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Security Notice */}
      <Card className="border-2 border-brown-800/10 shadow-tea bg-cream-50/80">
        <CardContent className="pt-6">
          <div className="text-center text-sm text-brown-800/60">
            <p>🔒 All transactions are encrypted and secure</p>
            <p className="mt-1">For Covenant University students only</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
