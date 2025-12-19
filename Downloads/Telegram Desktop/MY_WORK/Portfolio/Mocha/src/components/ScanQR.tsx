import React, { useState } from 'react';
import { motion } from 'motion/react';
import { QrCode, Camera, Upload, Store, Coffee, Book, Utensils } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { toast } from 'sonner';
import { apiService } from '../services/api.service';

interface ScanQRProps {
  onSuccess?: () => void;
}

export function ScanQR({ onSuccess }: ScanQRProps) {
  const [isScanning, setIsScanning] = useState(false);

  const handleScan = () => {
    setIsScanning(true);
    
    // Simulate scanning
    setTimeout(async () => {
      setIsScanning(false);
      
      // Process mock payment
      try {
        const response = await apiService.processQRPayment({
          amount: 1200,
          vendorName: 'CU Cafeteria'
        });

        toast.success('QR Code Scanned! 🎉', {
          description: `Payment of ₦1,200 to CU Cafeteria successful. +${response.data.pointsEarned} points earned!`,
        });

        if (onSuccess) {
          onSuccess();
        }
      } catch (error: any) {
        const errorMessage = error.response?.data?.message || 'Payment failed';
        toast.error(errorMessage);
      }
    }, 2000);
  };

  const popularVendors = [
    { name: 'CU Cafeteria', icon: Utensils, color: 'from-orange-600 to-orange-700' },
    { name: 'Campus Bookstore', icon: Book, color: 'from-blue-600 to-blue-700' },
    { name: 'Coffee Shop', icon: Coffee, color: 'from-brown-600 to-brown-800' },
    { name: 'Campus Store', icon: Store, color: 'from-tea-green to-green-700' },
  ];

  const handleVendorPayment = async (vendorName: string) => {
    // Generate random amount between 500 and 3000
    const amount = Math.floor(Math.random() * (3000 - 500 + 1)) + 500;

    try {
      const response = await apiService.processQRPayment({
        amount,
        vendorName
      });

      toast.success(`Payment Successful! 🎉`, {
        description: `₦${amount.toLocaleString()} paid to ${vendorName}. +${response.data.pointsEarned} loyalty points earned!`,
      });

      if (onSuccess) {
        onSuccess();
      }
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Payment failed';
      toast.error(errorMessage);
    }
  };

  return (
    <div className="space-y-6">
      <Card className="border-2 border-brown-800/10 shadow-tea-lg bg-gradient-to-br from-cream-50 to-cream-100">
        <CardHeader>
          <CardTitle className="text-brown-900 flex items-center gap-2">
            <QrCode className="text-brown-800" size={24} />
            Scan & Pay
          </CardTitle>
          <CardDescription className="text-brown-800/60">
            Scan vendor QR codes for instant cashless payments
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Scanner Area */}
            <div className="relative aspect-square max-w-sm mx-auto">
              <motion.div
                className={`w-full h-full rounded-2xl border-4 flex items-center justify-center overflow-hidden ${
                  isScanning
                    ? 'border-tea-green bg-tea-green/10'
                    : 'border-brown-800/20 bg-cream-100/50'
                }`}
                animate={isScanning ? { borderColor: ['#8B9A7C', '#D4AF37', '#8B9A7C'] } : {}}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                {isScanning ? (
                  <div className="text-center">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                    >
                      <Camera className="text-tea-green mx-auto mb-4" size={64} />
                    </motion.div>
                    <p className="text-brown-900">Scanning...</p>
                  </div>
                ) : (
                  <div className="text-center p-8">
                    <QrCode className="text-brown-800/30 mx-auto mb-4" size={80} />
                    <p className="text-brown-800/60 mb-2">Point camera at QR code</p>
                    <p className="text-sm text-brown-800/40">
                      Align within the frame to scan
                    </p>
                  </div>
                )}

                {/* Scanning Line Animation */}
                {isScanning && (
                  <motion.div
                    className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-tea-green to-transparent"
                    animate={{ top: ['0%', '100%'] }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                  />
                )}

                {/* Corner Brackets */}
                {!isScanning && (
                  <>
                    {['top-4 left-4', 'top-4 right-4', 'bottom-4 left-4', 'bottom-4 right-4'].map(
                      (position, i) => (
                        <div
                          key={i}
                          className={`absolute ${position} w-8 h-8 border-2 border-brown-800/30 ${
                            i === 0
                              ? 'border-r-0 border-b-0'
                              : i === 1
                              ? 'border-l-0 border-b-0'
                              : i === 2
                              ? 'border-r-0 border-t-0'
                              : 'border-l-0 border-t-0'
                          }`}
                        />
                      )
                    )}
                  </>
                )}
              </motion.div>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-4">
              <Button
                onClick={handleScan}
                disabled={isScanning}
                className="bg-gradient-to-r from-brown-800 to-brown-900 hover:from-brown-900 hover:to-brown-950 text-cream-50 shadow-tea"
              >
                <Camera size={18} className="mr-2" />
                {isScanning ? 'Scanning...' : 'Start Scan'}
              </Button>
              <Button
                variant="outline"
                disabled={isScanning}
                className="border-brown-800/20 hover:bg-cream-200 text-brown-900"
              >
                <Upload size={18} className="mr-2" />
                Upload QR
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Popular Vendors */}
      <Card className="border-2 border-brown-800/10 shadow-tea bg-cream-50/80">
        <CardHeader>
          <CardTitle className="text-brown-900">Popular Campus Vendors</CardTitle>
          <CardDescription className="text-brown-800/60">
            Quick access to frequently visited locations
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {popularVendors.map((vendor, index) => (
              <motion.button
                key={vendor.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="p-4 rounded-xl bg-cream-100/50 hover:bg-cream-200/70 border border-brown-800/10 transition-all duration-300 text-left"
                onClick={() => handleVendorPayment(vendor.name)}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-12 h-12 rounded-xl bg-gradient-to-br ${vendor.color} flex items-center justify-center shadow-md`}
                  >
                    <vendor.icon className="text-cream-50" size={24} />
                  </div>
                  <div>
                    <p className="text-brown-900">{vendor.name}</p>
                    <p className="text-sm text-brown-800/60">Tap to pay</p>
                  </div>
                </div>
              </motion.button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Info Card */}
      <Card className="border-2 border-tea-green/20 shadow-tea bg-gradient-to-br from-tea-green/5 to-cream-50">
        <CardContent className="pt-6">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-tea-green/20 flex items-center justify-center flex-shrink-0">
              <QrCode className="text-tea-green" size={20} />
            </div>
            <div>
              <h4 className="text-brown-900 mb-2">Earn Points with Every Scan</h4>
              <p className="text-sm text-brown-800/70">
                Get 1 loyalty point for every ₦100 spent using QR payments. The more you scan,
                the more you earn! 🎉
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}