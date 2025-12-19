import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Leaf, Lock, User, Mail, GraduationCap, Eye, EyeOff } from 'lucide-react';
import { GoogleLogin, CredentialResponse } from '@react-oauth/google';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { apiService } from '../services/api.service';
import { toast } from 'sonner';
import { User as UserType } from '../types';

interface AuthPageProps {
  onLogin: (user: UserType) => void;
}

export function AuthPage({ onLogin }: AuthPageProps) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    matricNumber: '',
    password: '',
    firstName: '',
    lastName: '',
    email: '',
    confirmPassword: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (isSignUp) {
        // Validate passwords match
        if (formData.password !== formData.confirmPassword) {
          toast.error('Passwords do not match');
          setIsLoading(false);
          return;
        }

        // Register
        const response = await apiService.register({
          matricNumber: formData.matricNumber,
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          password: formData.password,
        });

        toast.success('Welcome! 🎉');
        const userData = response.data.user;
        onLogin({
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
      } else {
        // Login
        const response = await apiService.login({
          matricNumber: formData.matricNumber,
          password: formData.password,
        });

        toast.success('Welcome! 🎉');
        const userData = response.data.user;
        onLogin({
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
      }
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'An error occurred';
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSuccess = async (credentialResponse: CredentialResponse) => {
    try {
      setIsLoading(true);
      const response = await apiService.googleAuth(credentialResponse.credential!);
      
      toast.success(response.message);
      const userData = response.data.user;
      onLogin({
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
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Google sign-in failed';
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleError = () => {
    toast.error('Google sign-in was cancelled or failed');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cream-50 via-cream-100 to-cream-200 relative overflow-hidden">
      {/* Animated Tea Leaves Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-tea-green/10"
            initial={{
              x: Math.random() * window.innerWidth,
              y: -50,
              rotate: Math.random() * 360,
            }}
            animate={{
              y: window.innerHeight + 50,
              rotate: Math.random() * 360 + 360,
              x: Math.random() * window.innerWidth,
            }}
            transition={{
              duration: Math.random() * 10 + 15,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
          >
            <Leaf size={Math.random() * 30 + 20} />
          </motion.div>
        ))}
      </div>

      <div className="relative z-10 container mx-auto px-4 py-12 flex items-center justify-center min-h-screen">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md"
        >
          {/* Logo and Header */}
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 200, damping: 15 }}
              className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-brown-800 to-brown-900 mb-4 shadow-tea-lg"
            >
              <Leaf className="text-cream-100" size={40} />
            </motion.div>
            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-brown-900 mb-2"
            >
              Mocha
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-brown-800/70 flex items-center justify-center gap-2"
            >
              <GraduationCap size={18} />
              Covenant University Campus Wallet
            </motion.p>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-brown-800/60 text-sm mt-2"
            >
              Brew your way to rewards with every transaction
            </motion.p>
          </div>

          <Card className="border-2 border-brown-800/10 shadow-tea-lg bg-cream-50/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-brown-900">
                {isSignUp ? 'Create Your Account' : 'Welcome!'}
              </CardTitle>
              <CardDescription className="text-brown-800/60">
                {isSignUp
                  ? 'Join the Mocha community and start earning rewards'
                  : 'Sign in to access your campus wallet'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <AnimatePresence mode="wait">
                  {isSignUp && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="space-y-4"
                    >
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="firstName" className="text-brown-900">
                            First Name
                          </Label>
                          <div className="relative">
                            <User
                              className="absolute left-3 top-1/2 -translate-y-1/2 text-brown-800/40"
                              size={18}
                            />
                            <Input
                              id="firstName"
                              name="firstName"
                              type="text"
                              placeholder="Sarah"
                              value={formData.firstName}
                              onChange={handleChange}
                              className="pl-10 bg-cream-100/50 border-brown-800/20 focus:border-tea-green"
                              required
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="lastName" className="text-brown-900">
                            Last Name
                          </Label>
                          <Input
                            id="lastName"
                            name="lastName"
                            type="text"
                            placeholder="Johnson"
                            value={formData.lastName}
                            onChange={handleChange}
                            className="bg-cream-100/50 border-brown-800/20 focus:border-tea-green"
                            required
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-brown-900">
                          University Email
                        </Label>
                        <div className="relative">
                          <Mail
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-brown-800/40"
                            size={18}
                          />
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="your.name@stu.cu.edu.ng"
                            value={formData.email}
                            onChange={handleChange}
                            className="pl-10 bg-cream-100/50 border-brown-800/20 focus:border-tea-green"
                            required
                          />
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="space-y-2">
                  <Label htmlFor="matricNumber" className="text-brown-900">
                    Matric Number
                  </Label>
                  <div className="relative">
                    <GraduationCap
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-brown-800/40"
                      size={18}
                    />
                    <Input
                      id="matricNumber"
                      name="matricNumber"
                      type="text"
                      placeholder="18CSC001"
                      value={formData.matricNumber}
                      onChange={handleChange}
                      className="pl-10 bg-cream-100/50 border-brown-800/20 focus:border-tea-green"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="text-brown-900">
                    Password
                  </Label>
                  <div className="relative">
                    <Lock
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-brown-800/40"
                      size={18}
                    />
                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="••••••••"
                      value={formData.password}
                      onChange={handleChange}
                      className="pl-10 pr-10 bg-cream-100/50 border-brown-800/20 focus:border-tea-green"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-brown-800/40 hover:text-brown-800 transition-colors"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                {isSignUp && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="space-y-2"
                  >
                    <Label htmlFor="confirmPassword" className="text-brown-900">
                      Confirm Password
                    </Label>
                    <div className="relative">
                      <Lock
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-brown-800/40"
                        size={18}
                      />
                      <Input
                        id="confirmPassword"
                        name="confirmPassword"
                        type="password"
                        placeholder="••••••••"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        className="pl-10 bg-cream-100/50 border-brown-800/20 focus:border-tea-green"
                        required
                      />
                    </div>
                  </motion.div>
                )}

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-brown-800 to-brown-900 hover:from-brown-900 hover:to-brown-950 text-cream-50 shadow-tea transition-all duration-300 disabled:opacity-50"
                >
                  {isLoading ? 'Please wait...' : (isSignUp ? 'Start Brewing' : 'Sign In')}
                </Button>

                {/* Google Sign In */}
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t border-brown-800/20" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-cream-50/80 px-2 text-brown-800/60">
                      Or continue with
                    </span>
                  </div>
                </div>

                <div className="flex justify-center">
                  <GoogleLogin
                    onSuccess={handleGoogleSuccess}
                    onError={handleGoogleError}
                    text={isSignUp ? 'signup_with' : 'signin_with'}
                    theme="outline"
                    size="large"
                    width="100%"
                  />
                </div>

                <div className="text-center pt-4 border-t border-brown-800/10">
                  <p className="text-brown-800/60 text-sm">
                    {isSignUp ? 'Already have an account?' : "Don't have an account?"}
                    <button
                      type="button"
                      onClick={() => setIsSignUp(!isSignUp)}
                      className="text-brown-900 hover:text-tea-green ml-2 transition-colors"
                    >
                      {isSignUp ? 'Sign In' : 'Sign Up'}
                    </button>
                  </p>
                </div>
              </form>
            </CardContent>
          </Card>

          <div className="mt-6 text-center text-sm text-brown-800/50">
            <p>🔒 Secure transactions • For CU students only</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
