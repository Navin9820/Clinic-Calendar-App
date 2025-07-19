import React, { useState, useEffect } from 'react';
import {
  LogIn,
  Mail,
  Lock,
  Eye,
  EyeOff,
  Stethoscope,
  Heart,
  Activity,
  Sparkles,
  Shield,
  Zap,
} from 'lucide-react';
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
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Enhanced loading simulation with progress
    const loadingSteps = [
      'Verifying credentials...',
      'Checking permissions...',
      'Loading profile...',
      'Finalizing login...',
    ];

    for (let i = 0; i < loadingSteps.length; i++) {
      await new Promise((resolve) => setTimeout(resolve, 300));
    }

    if (
      email === MOCK_CREDENTIALS.email &&
      password === MOCK_CREDENTIALS.password
    ) {
      onLogin({ email, name: 'Dr. Sarah Williams' });
    } else {
      setError('Invalid credentials. Please check your email and password.');
    }

    setIsLoading(false);
  };

  const fillDemoCredentials = () => {
    setEmail('');
    setPassword('');
    
    // Animated typing effect
    const emailText = MOCK_CREDENTIALS.email;
    const passwordText = MOCK_CREDENTIALS.password;
    
    let emailIndex = 0;
    let passwordIndex = 0;
    
    const typeEmail = () => {
      if (emailIndex < emailText.length) {
        setEmail(emailText.slice(0, emailIndex + 1));
        emailIndex++;
        setTimeout(typeEmail, 50);
      } else {
        setTimeout(typePassword, 200);
      }
    };
    
    const typePassword = () => {
      if (passwordIndex < passwordText.length) {
        setPassword(passwordText.slice(0, passwordIndex + 1));
        passwordIndex++;
        setTimeout(typePassword, 50);
      }
    };
    
    typeEmail();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-900 dark:to-indigo-900 flex items-center justify-center p-4 page-transition overflow-hidden">
      {/* Enhanced animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"
          style={{ animationDelay: '2s' }}
        ></div>
        <div
          className="absolute top-40 left-40 w-80 h-80 bg-indigo-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"
          style={{ animationDelay: '4s' }}
        ></div>
        
        {/* Floating particles */}
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-blue-400 rounded-full opacity-30 animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`,
            }}
          />
        ))}
      </div>

      {/* Interactive cursor follower */}
      <div
        className="fixed w-4 h-4 bg-blue-500 rounded-full pointer-events-none z-50 opacity-20 transition-all duration-300 ease-out"
        style={{
          left: mousePosition.x - 8,
          top: mousePosition.y - 8,
          transform: isHovering ? 'scale(2)' : 'scale(1)',
        }}
      />

      <div className="relative max-w-md w-full">
        {/* Main login card with enhanced glass effect */}
        <div 
          className="glass rounded-3xl shadow-2xl p-8 backdrop-blur-lg border border-white/20 dark:border-gray-700/50 transform transition-all duration-500 hover:scale-105 hover:shadow-3xl"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          {/* Header with enhanced animated icons */}
          <div className="text-center mb-8">
            <div className="relative mx-auto w-20 h-20 mb-6 group">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl shadow-lg transform rotate-3 group-hover:rotate-6 transition-transform duration-300"></div>
              <div className="relative bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl flex items-center justify-center w-full h-full shadow-xl group-hover:shadow-2xl transition-all duration-300">
                <Stethoscope className="w-10 h-10 text-white group-hover:scale-110 transition-transform duration-300" />
              </div>
              
              {/* Enhanced floating medical icons */}
              <Heart className="absolute -top-2 -right-2 w-6 h-6 text-red-500 animate-bounce" />
              <Activity
                className="absolute -bottom-2 -left-2 w-6 h-6 text-green-500 animate-pulse"
                style={{ animationDelay: '1s' }}
              />
              <Sparkles className="absolute top-0 left-0 w-4 h-4 text-yellow-400 animate-spin" />
              <Shield className="absolute bottom-0 right-0 w-4 h-4 text-blue-400 animate-pulse" />
            </div>

            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-3 animate-gradient">
              MediPlus Pro
            </h1>
            <p className="text-gray-600 dark:text-gray-300 text-lg animate-fade-in-up">
              Clinic Staff Appointment App
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full mx-auto mt-4 animate-pulse"></div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Enhanced Email field */}
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="block text-sm font-semibold text-gray-700 dark:text-gray-300 transition-colors duration-200"
              >
                Email Address
              </label>
              <div className="relative group">
                <Mail className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 transition-all duration-300 ${
                  focusedField === 'email' ? 'text-blue-500 scale-110' : 'text-gray-400'
                }`} />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={() => setFocusedField('email')}
                  onBlur={() => setFocusedField(null)}
                  className="form-input pl-12 enhanced-input"
                  placeholder="Enter your email"
                  required
                />
                <div className={`absolute inset-0 rounded-xl border-2 pointer-events-none transition-all duration-300 ${
                  focusedField === 'email' ? 'border-blue-500 shadow-lg shadow-blue-500/20' : 'border-transparent'
                }`} />
              </div>
            </div>

            {/* Enhanced Password field */}
            <div className="space-y-2">
              <label
                htmlFor="password"
                className="block text-sm font-semibold text-gray-700 dark:text-gray-300 transition-colors duration-200"
              >
                Password
              </label>
              <div className="relative group">
                <Lock className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 transition-all duration-300 ${
                  focusedField === 'password' ? 'text-blue-500 scale-110' : 'text-gray-400'
                }`} />
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={() => setFocusedField('password')}
                  onBlur={() => setFocusedField(null)}
                  className="form-input pl-12 pr-12 enhanced-input"
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-blue-500 transition-all duration-300 hover:scale-110"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
                <div className={`absolute inset-0 rounded-xl border-2 pointer-events-none transition-all duration-300 ${
                  focusedField === 'password' ? 'border-blue-500 shadow-lg shadow-blue-500/20' : 'border-transparent'
                }`} />
              </div>
            </div>

            {/* Enhanced Remember me checkbox */}
            <div className="flex items-center justify-between">
              <label className="flex items-center space-x-3 cursor-pointer group">
                <div className="relative">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="sr-only"
                  />
                  <div className={`w-5 h-5 rounded border-2 transition-all duration-300 ${
                    rememberMe 
                      ? 'bg-blue-500 border-blue-500 scale-110' 
                      : 'border-gray-300 group-hover:border-blue-400'
                  }`}>
                    {rememberMe && (
                      <svg className="w-3 h-3 text-white absolute top-0.5 left-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    )}
                  </div>
                </div>
                <span className="text-sm text-gray-600 dark:text-gray-400 group-hover:text-blue-500 transition-colors duration-200">
                  Remember me
                </span>
              </label>
              <button
                type="button"
                className="text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 font-medium transition-all duration-200 hover:scale-105"
              >
                Forgot password?
              </button>
            </div>

            {/* Enhanced Error message */}
            {error && (
              <div className="bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 rounded-lg p-4 animate-shake">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="w-5 h-5 text-red-500 animate-pulse">
                      <Zap className="w-5 h-5" />
                    </div>
                  </div>
                  <p className="ml-3 text-red-700 dark:text-red-400 text-sm font-medium">
                    {error}
                  </p>
                </div>
              </div>
            )}

            {/* Enhanced Submit button with advanced loading */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center space-x-3 group relative overflow-hidden"
            >
              {/* Button background animation */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              {isLoading ? (
                <>
                  <div className="relative">
                    <div className="spinner-advanced rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                    <div className="absolute inset-0 rounded-full h-5 w-5 border-2 border-blue-300 border-t-transparent animate-spin-slow"></div>
                  </div>
                  <span className="relative">Authenticating...</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 animate-shimmer" />
                </>
              ) : (
                <>
                  <LogIn className="w-5 h-5 relative group-hover:rotate-12 transition-transform duration-300" />
                  <span className="relative">Sign In Securely</span>
                  <Sparkles className="w-4 h-4 relative opacity-0 group-hover:opacity-100 transition-all duration-300 animate-pulse" />
                </>
              )}
            </button>
          </form>

          {/* Enhanced Demo credentials section */}
          <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-700 rounded-2xl border border-blue-100 dark:border-gray-600 transform transition-all duration-300 hover:scale-105">
            <div className="text-center">
              <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 flex items-center justify-center space-x-2">
                <Zap className="w-4 h-4 text-yellow-500 animate-pulse" />
                <span>Demo Access</span>
                <Zap className="w-4 h-4 text-yellow-500 animate-pulse" />
              </h3>
              <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <p className="animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                  <strong>Email:</strong> {MOCK_CREDENTIALS.email}
                </p>
                <p className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                  <strong>Password:</strong> {MOCK_CREDENTIALS.password}
                </p>
              </div>
              <button
                type="button"
                onClick={fillDemoCredentials}
                className="mt-4 btn-secondary text-sm group relative overflow-hidden"
              >
                <span className="relative z-10">Auto-fill Demo Credentials</span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-500 opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
              </button>
            </div>
          </div>

          {/* Enhanced Footer */}
          <div className="mt-8 text-center">
            <div className="flex items-center justify-center space-x-4 text-xs text-gray-500 dark:text-gray-400">
              <div className="flex items-center space-x-1">
                <Shield className="w-3 h-3 text-green-500 animate-pulse" />
                <span>Secure</span>
              </div>
              <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
              <div className="flex items-center space-x-1">
                <Heart className="w-3 h-3 text-red-500 animate-pulse" />
                <span>HIPAA Compliant</span>
              </div>
              <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
              <div className="flex items-center space-x-1">
                <Sparkles className="w-3 h-3 text-blue-500 animate-pulse" />
                <span>Enterprise Ready</span>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced floating elements */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
          <div className="absolute top-10 right-10 w-2 h-2 bg-blue-400 rounded-full animate-ping"></div>
          <div
            className="absolute bottom-10 left-10 w-2 h-2 bg-purple-400 rounded-full animate-ping"
            style={{ animationDelay: '1s' }}
          ></div>
          <div
            className="absolute top-1/2 left-0 w-1 h-1 bg-indigo-400 rounded-full animate-ping"
            style={{ animationDelay: '2s' }}
          ></div>
          <div
            className="absolute top-1/4 right-1/4 w-1.5 h-1.5 bg-yellow-400 rounded-full animate-pulse"
            style={{ animationDelay: '3s' }}
          ></div>
        </div>
      </div>
    </div>
  );
}