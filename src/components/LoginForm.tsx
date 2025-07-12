import React, { useState } from 'react';
import { LogIn, Mail, Lock, Eye, EyeOff, Stethoscope, Heart, Activity } from 'lucide-react';
import { MOCK_CREDENTIALS } from '../data/mockData';

interface LoginFormProps {
  onLogin: (user: { email: string; name: string }) => void;
}

export function LoginForm({ onLogin }: LoginFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Simulate API call delay with realistic timing
    await new Promise(resolve => setTimeout(resolve, 1200));

    if (email === MOCK_CREDENTIALS.email && password === MOCK_CREDENTIALS.password) {
      onLogin({ email, name: 'Dr. Sarah Williams' });
    } else {
      setError('Invalid credentials. Please check your email and password.');
    }
    
    setIsLoading(false);
  };

  const fillDemoCredentials = () => {
    setEmail(MOCK_CREDENTIALS.email);
    setPassword(MOCK_CREDENTIALS.password);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-900 dark:to-indigo-900 flex items-center justify-center p-4 page-transition">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-indigo-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" style={{ animationDelay: '4s' }}></div>
      </div>

      <div className="relative max-w-md w-full">
        {/* Main login card */}
        <div className="glass rounded-3xl shadow-2xl p-8 backdrop-blur-lg border border-white/20 dark:border-gray-700/50">
          {/* Header with animated icons */}
          <div className="text-center mb-8">
            <div className="relative mx-auto w-20 h-20 mb-6">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl shadow-lg transform rotate-3"></div>
              <div className="relative bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl flex items-center justify-center w-full h-full shadow-xl">
                <Stethoscope className="w-10 h-10 text-white" />
              </div>
              {/* Floating medical icons */}
              <Heart className="absolute -top-2 -right-2 w-6 h-6 text-red-500 animate-pulse" />
              <Activity className="absolute -bottom-2 -left-2 w-6 h-6 text-green-500 animate-pulse" style={{ animationDelay: '1s' }} />
            </div>
            
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-3">
              MediPlus Pro
            </h1>
            <p className="text-gray-600 dark:text-gray-300 text-lg">
              Clinical Staff Appointment Management
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full mx-auto mt-4"></div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email field */}
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                Email Address
              </label>
              <div className="relative group">
                <Mail className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 w-5 h-5 transition-colors" />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="form-input pl-12"
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>

            {/* Password field */}
            <div className="space-y-2">
              <label htmlFor="password" className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                Password
              </label>
              <div className="relative group">
                <Lock className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 w-5 h-5 transition-colors" />
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="form-input pl-12 pr-12"
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-blue-500 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Remember me checkbox */}
            <div className="flex items-center justify-between">
              <label className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <span className="text-sm text-gray-600 dark:text-gray-400">Remember me</span>
              </label>
              <button
                type="button"
                className="text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 font-medium transition-colors"
              >
                Forgot password?
              </button>
            </div>

            {/* Error message */}
            {error && (
              <div className="bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 rounded-lg p-4 animate-pulse">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <p className="ml-3 text-red-700 dark:text-red-400 text-sm font-medium">{error}</p>
                </div>
              </div>
            )}

            {/* Submit button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center space-x-3"
            >
              {isLoading ? (
                <>
                  <div className="spinner rounded-full h-5 w-5 border-b-2 border-white"></div>
                  <span>Authenticating...</span>
                </>
              ) : (
                <>
                  <LogIn className="w-5 h-5" />
                  <span>Sign In Securely</span>
                </>
              )}
            </button>
          </form>

          {/* Demo credentials section */}
          <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-700 rounded-2xl border border-blue-100 dark:border-gray-600">
            <div className="text-center">
              <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                🚀 Demo Access
              </h3>
              <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <p><strong>Email:</strong> {MOCK_CREDENTIALS.email}</p>
                <p><strong>Password:</strong> {MOCK_CREDENTIALS.password}</p>
              </div>
              <button
                type="button"
                onClick={fillDemoCredentials}
                className="mt-4 btn-secondary text-sm"
              >
                Auto-fill Demo Credentials
              </button>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-8 text-center">
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Secure • HIPAA Compliant • Enterprise Ready
            </p>
          </div>
        </div>

        {/* Additional floating elements */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
          <div className="absolute top-10 right-10 w-2 h-2 bg-blue-400 rounded-full animate-ping"></div>
          <div className="absolute bottom-10 left-10 w-2 h-2 bg-purple-400 rounded-full animate-ping" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-1/2 left-0 w-1 h-1 bg-indigo-400 rounded-full animate-ping" style={{ animationDelay: '2s' }}></div>
        </div>
      </div>
    </div>
  );
}