import React, { useState, useEffect } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Calendar,
  Filter,
  Sun,
  Moon,
  Sparkles,
  LogOut,
  User,
  Star,
  Zap,
  Shield,
  Heart,
} from 'lucide-react';
import { MOCK_DOCTORS, MOCK_PATIENTS } from '../data/mockData';

interface CalendarHeaderProps {
  currentDate: Date;
  onPrevMonth: () => void;
  onNextMonth: () => void;
  filters: { doctor: string; patient: string };
  onFilterChange: (filters: { doctor: string; patient: string }) => void;
  darkMode: boolean;
  onToggleDarkMode: () => void;
  user: { email: string; name: string };
  onLogout: () => void;
}

export function CalendarHeader({
  currentDate,
  onPrevMonth,
  onNextMonth,
  filters,
  onFilterChange,
  darkMode,
  onToggleDarkMode,
  user,
  onLogout,
}: CalendarHeaderProps) {
  const [isAnimating, setIsAnimating] = useState(false);
  const [hoveredElement, setHoveredElement] = useState<string | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const monthName = currentDate.toLocaleString('default', {
    month: 'long',
    year: 'numeric',
  });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleMonthChange = (direction: 'prev' | 'next') => {
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 300);
    
    if (direction === 'prev') {
      onPrevMonth();
    } else {
      onNextMonth();
    }
  };

  const handleDarkModeToggle = () => {
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 500);
    onToggleDarkMode();
  };

  return (
    <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-4 md:p-6 shadow-lg relative overflow-hidden">
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-50/50 via-indigo-50/50 to-purple-50/50 dark:from-blue-900/20 dark:via-indigo-900/20 dark:to-purple-900/20 animate-pulse" />
      
      {/* Interactive cursor effect */}
      <div
        className="fixed w-4 h-4 pointer-events-none z-50 transition-all duration-300 ease-out opacity-20"
        style={{
          left: mousePosition.x - 8,
          top: mousePosition.y - 8,
          background: 'radial-gradient(circle, rgba(59, 130, 246, 0.6) 0%, transparent 70%)',
          borderRadius: '50%',
          transform: hoveredElement ? 'scale(2)' : 'scale(1)',
        }}
      />

      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center space-y-6 lg:space-y-0 relative z-10">
        {/* Enhanced Left section */}
        <div className="flex items-center space-x-2 md:space-x-4 flex-wrap">
          <div className="flex items-center space-x-3 group">
            <div className="relative">
              <div className="p-2 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl shadow-lg transform transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
                <Calendar className="w-8 h-8 text-white" />
              </div>
              <div className="absolute -top-1 -right-1">
                <Sparkles className="w-5 h-5 text-yellow-500 animate-pulse" />
              </div>
              <div className="absolute -bottom-1 -left-1">
                <Star className="w-4 h-4 text-yellow-400 animate-spin" style={{ animationDuration: '3s' }} />
              </div>
            </div>
            <div className="transform transition-all duration-300 group-hover:scale-105">
              <h1 className="text-xl md:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent animate-gradient">
                MediPlus Pro
              </h1>
              <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400 hidden sm:flex items-center space-x-2">
                <Shield className="w-3 h-3 text-green-500 animate-pulse" />
                <span>Clinic Staff Appointment App</span>
                <Heart className="w-3 h-3 text-red-500 animate-pulse" />
              </p>
            </div>
          </div>

          {/* Enhanced User Info */}
          <div 
            className="hidden sm:flex items-center space-x-3 px-4 py-3 bg-gradient-to-r from-gray-50 to-blue-50 dark:from-gray-700 dark:to-gray-600 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-600 transform transition-all duration-300 hover:scale-105 hover:shadow-xl group"
            onMouseEnter={() => setHoveredElement('user')}
            onMouseLeave={() => setHoveredElement(null)}
          >
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300">
                <User className="w-5 h-5 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-pulse" />
            </div>
            <div>
              <p className="text-sm font-bold text-gray-900 dark:text-white flex items-center space-x-1">
                <span>{user.name}</span>
                <Sparkles className="w-3 h-3 text-yellow-500 animate-pulse" />
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {user.email}
              </p>
            </div>
          </div>

          {/* Enhanced Dark Mode Toggle */}
          <div className="relative hidden sm:block">
            <button
              onClick={handleDarkModeToggle}
              onMouseEnter={() => setHoveredElement('darkmode')}
              onMouseLeave={() => setHoveredElement(null)}
              className="group relative p-4 rounded-2xl bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 hover:from-blue-100 hover:to-indigo-100 dark:hover:from-blue-900/30 dark:hover:to-indigo-900/30 transition-all duration-300 transform hover:scale-110 focus:ring-4 focus:ring-blue-500/20 shadow-lg hover:shadow-xl"
              title={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              <div className="relative w-6 h-6">
                <Sun
                  className={`absolute inset-0 w-6 h-6 text-yellow-500 transition-all duration-500 ${
                    darkMode ? 'opacity-0 rotate-180 scale-0' : 'opacity-100 rotate-0 scale-100'
                  }`}
                />
                <Moon
                  className={`absolute inset-0 w-6 h-6 text-blue-400 transition-all duration-500 ${
                    darkMode ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-180 scale-0'
                  }`}
                />
              </div>

              {/* Enhanced Tooltip */}
              <div className="absolute -bottom-14 left-1/2 transform -translate-x-1/2 px-3 py-2 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 text-xs rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none whitespace-nowrap shadow-lg">
                <div className="flex items-center space-x-2">
                  {darkMode ? <Sun className="w-3 h-3" /> : <Moon className="w-3 h-3" />}
                  <span>{darkMode ? 'Light mode' : 'Dark mode'}</span>
                </div>
                <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gray-900 dark:bg-gray-100 rotate-45"></div>
              </div>

              {/* Animated background */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-indigo-400/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </button>
          </div>

          {/* Enhanced Logout Button */}
          <div className="relative hidden sm:block">
            <button
              onClick={onLogout}
              onMouseEnter={() => setHoveredElement('logout')}
              onMouseLeave={() => setHoveredElement(null)}
              className="group relative p-4 rounded-2xl bg-gradient-to-r from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20 hover:from-red-100 hover:to-red-200 dark:hover:from-red-900/30 dark:hover:to-red-800/30 transition-all duration-300 transform hover:scale-110 focus:ring-4 focus:ring-red-500/20 shadow-lg hover:shadow-xl"
              title="Logout"
            >
              <LogOut className="w-6 h-6 text-red-600 dark:text-red-400 transition-all duration-300 group-hover:translate-x-1 group-hover:scale-110" />

              {/* Enhanced Tooltip */}
              <div className="absolute -bottom-14 left-1/2 transform -translate-x-1/2 px-3 py-2 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 text-xs rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none whitespace-nowrap shadow-lg">
                <div className="flex items-center space-x-2">
                  <Zap className="w-3 h-3" />
                  <span>Sign out</span>
                </div>
                <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gray-900 dark:bg-gray-100 rotate-45"></div>
              </div>

              {/* Animated background */}
              <div className="absolute inset-0 bg-gradient-to-r from-red-400/20 to-red-500/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </button>
          </div>

          {/* Enhanced Mobile Actions */}
          <div className="flex sm:hidden items-center space-x-2">
            <button
              onClick={handleDarkModeToggle}
              className="p-3 rounded-xl bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 hover:from-blue-100 hover:to-indigo-100 dark:hover:from-blue-900/30 dark:hover:to-indigo-900/30 transition-all duration-300 transform active:scale-95 shadow-lg"
            >
              <div className="relative w-5 h-5">
                <Sun
                  className={`absolute inset-0 w-5 h-5 text-yellow-500 transition-all duration-500 ${
                    darkMode ? 'opacity-0 rotate-180 scale-0' : 'opacity-100 rotate-0 scale-100'
                  }`}
                />
                <Moon
                  className={`absolute inset-0 w-5 h-5 text-blue-400 transition-all duration-500 ${
                    darkMode ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-180 scale-0'
                  }`}
                />
              </div>
            </button>
            <button
              onClick={onLogout}
              className="p-3 rounded-xl bg-gradient-to-r from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20 hover:from-red-100 hover:to-red-200 dark:hover:from-red-900/30 dark:hover:to-red-800/30 transition-all duration-300 transform active:scale-95 shadow-lg"
            >
              <LogOut className="w-5 h-5 text-red-600 dark:text-red-400" />
            </button>
          </div>
        </div>

        {/* Enhanced Center section - Month Navigation */}
        <div className="flex items-center space-x-6 hidden md:flex">
          <button
            onClick={() => handleMonthChange('prev')}
            onMouseEnter={() => setHoveredElement('prev')}
            onMouseLeave={() => setHoveredElement(null)}
            className="group p-4 rounded-2xl hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 dark:hover:from-blue-900/30 dark:hover:to-indigo-900/30 transition-all duration-300 transform hover:scale-110 focus:ring-4 focus:ring-blue-500/20 shadow-lg hover:shadow-xl"
          >
            <ChevronLeft className="w-7 h-7 text-gray-600 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-all duration-300 group-hover:scale-110 group-hover:-translate-x-1" />
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400/10 to-indigo-400/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </button>

          <div className="text-center min-w-[250px] relative group">
            <h2 className={`text-2xl md:text-3xl font-bold text-gray-900 dark:text-white transition-all duration-300 ${
              isAnimating ? 'scale-110 text-blue-600 dark:text-blue-400' : ''
            }`}>
              {monthName}
            </h2>
            <div className="w-20 h-1.5 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 rounded-full mx-auto mt-2 animate-pulse" />
            
            {/* Floating decorations */}
            <div className="absolute -top-2 -left-2">
              <Star className="w-4 h-4 text-yellow-400 animate-pulse" />
            </div>
            <div className="absolute -top-2 -right-2">
              <Sparkles className="w-4 h-4 text-blue-400 animate-pulse" style={{ animationDelay: '1s' }} />
            </div>
          </div>

          <button
            onClick={() => handleMonthChange('next')}
            onMouseEnter={() => setHoveredElement('next')}
            onMouseLeave={() => setHoveredElement(null)}
            className="group p-4 rounded-2xl hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 dark:hover:from-blue-900/30 dark:hover:to-indigo-900/30 transition-all duration-300 transform hover:scale-110 focus:ring-4 focus:ring-blue-500/20 shadow-lg hover:shadow-xl"
          >
            <ChevronRight className="w-7 h-7 text-gray-600 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-all duration-300 group-hover:scale-110 group-hover:translate-x-1" />
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400/10 to-indigo-400/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </button>
        </div>

        {/* Enhanced Right section - Filters */}
        <div className="flex items-center space-x-2 md:space-x-4 w-full lg:w-auto">
          <div className="flex items-center space-x-3 text-gray-600 dark:text-gray-400 group">
            <div className="p-2 bg-gradient-to-r from-purple-100 to-indigo-100 dark:from-purple-900/30 dark:to-indigo-900/30 rounded-xl shadow-lg group-hover:shadow-xl transition-all duration-300">
              <Filter className="w-5 h-5 text-purple-600 dark:text-purple-400 group-hover:scale-110 transition-transform duration-300" />
            </div>
            <span className="text-sm font-semibold hidden sm:inline group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-300">
              Smart Filters
            </span>
            <Sparkles className="w-4 h-4 text-yellow-500 animate-pulse" />
          </div>

          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3 md:space-x-4 flex-1 lg:flex-none">
            {/* Enhanced Doctor Filter */}
            <div className="relative group">
              <select
                value={filters.doctor}
                onChange={(e) =>
                  onFilterChange({ ...filters, doctor: e.target.value })
                }
                onMouseEnter={() => setHoveredElement('doctor-filter')}
                onMouseLeave={() => setHoveredElement(null)}
                className="form-input text-xs md:text-sm min-w-[140px] md:min-w-[160px] appearance-none cursor-pointer bg-gradient-to-r from-white to-blue-50 dark:from-gray-800 dark:to-gray-700 border-2 border-blue-200 dark:border-blue-800 hover:border-blue-400 dark:hover:border-blue-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                <option value="">All Doctors</option>
                {MOCK_DOCTORS.map((doctor) => (
                  <option key={doctor.id} value={doctor.id}>
                    {doctor.name}
                  </option>
                ))}
              </select>
              <ChevronRight className="absolute right-3 top-1/2 transform -translate-y-1/2 rotate-90 w-4 h-4 text-gray-400 pointer-events-none group-hover:text-blue-500 transition-colors duration-300" />
              
              {/* Enhanced selection indicator */}
              {filters.doctor && (
                <div className="absolute -top-1 -right-1">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                </div>
              )}
            </div>

            {/* Enhanced Patient Filter */}
            <div className="relative group">
              <select
                value={filters.patient}
                onChange={(e) =>
                  onFilterChange({ ...filters, patient: e.target.value })
                }
                onMouseEnter={() => setHoveredElement('patient-filter')}
                onMouseLeave={() => setHoveredElement(null)}
                className="form-input text-xs md:text-sm min-w-[140px] md:min-w-[160px] appearance-none cursor-pointer bg-gradient-to-r from-white to-green-50 dark:from-gray-800 dark:to-gray-700 border-2 border-green-200 dark:border-green-800 hover:border-green-400 dark:hover:border-green-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                <option value="">All Patients</option>
                {MOCK_PATIENTS.map((patient) => (
                  <option key={patient.id} value={patient.id}>
                    {patient.name}
                  </option>
                ))}
              </select>
              <ChevronRight className="absolute right-3 top-1/2 transform -translate-y-1/2 rotate-90 w-4 h-4 text-gray-400 pointer-events-none group-hover:text-green-500 transition-colors duration-300" />
              
              {/* Enhanced selection indicator */}
              {filters.patient && (
                <div className="absolute -top-1 -right-1">
                  <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse" />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Floating particles */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-blue-400 rounded-full opacity-30 animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
}