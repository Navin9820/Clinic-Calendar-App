import React from 'react';
import { ChevronLeft, ChevronRight, Calendar, Filter, Sun, Moon, Sparkles, LogOut, User } from 'lucide-react';
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
  const monthName = currentDate.toLocaleString('default', { month: 'long', year: 'numeric' });

  return (
    <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-4 md:p-6 shadow-sm">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center space-y-6 lg:space-y-0">
        {/* Left section - Title, User Info, and Controls */}
        <div className="flex items-center space-x-2 md:space-x-4 flex-wrap">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <Calendar className="w-8 h-8 text-blue-600 dark:text-blue-400" />
              <Sparkles className="absolute -top-1 -right-1 w-4 h-4 text-yellow-500 animate-pulse" />
            </div>
            <div>
              <h1 className="text-xl md:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                MediPlus Pro
              </h1>
              <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400 hidden sm:block">Clinical Staff Appointment System</p>
            </div>
          </div>
          
          {/* User Info */}
          <div className="hidden sm:flex items-center space-x-3 px-4 py-2 bg-gray-50 dark:bg-gray-700 rounded-xl">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center">
              <User className="w-4 h-4 text-white" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900 dark:text-white">{user.name}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">{user.email}</p>
            </div>
          </div>
          
          {/* Enhanced Dark Mode Toggle */}
          <div className="relative hidden sm:block">
            <button
              onClick={onToggleDarkMode}
              className="group relative p-3 rounded-xl bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-300 transform hover:scale-105 focus:ring-4 focus:ring-blue-500/20"
              title={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              <div className="relative w-6 h-6">
                <Sun className={`absolute inset-0 w-6 h-6 text-yellow-500 transition-all duration-500 ${darkMode ? 'opacity-0 rotate-180 scale-0' : 'opacity-100 rotate-0 scale-100'}`} />
                <Moon className={`absolute inset-0 w-6 h-6 text-blue-400 transition-all duration-500 ${darkMode ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-180 scale-0'}`} />
              </div>
              
              {/* Tooltip */}
              <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 px-3 py-1 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
                {darkMode ? 'Light mode' : 'Dark mode'}
                <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gray-900 dark:bg-gray-100 rotate-45"></div>
              </div>
            </button>
          </div>
          
          {/* Logout Button */}
          <div className="relative hidden sm:block">
            <button
              onClick={onLogout}
              className="group relative p-3 rounded-xl bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/30 transition-all duration-300 transform hover:scale-105 focus:ring-4 focus:ring-red-500/20"
              title="Logout"
            >
              <LogOut className="w-6 h-6 text-red-600 dark:text-red-400 transition-transform group-hover:translate-x-0.5" />
              
              {/* Tooltip */}
              <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 px-3 py-1 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
                Sign out
                <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gray-900 dark:bg-gray-100 rotate-45"></div>
              </div>
            </button>
          </div>
          
          {/* Mobile Actions */}
          <div className="flex sm:hidden items-center space-x-2">
            <button
              onClick={onToggleDarkMode}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-200"
            >
              <div className="relative w-5 h-5">
                <Sun className={`absolute inset-0 w-5 h-5 text-yellow-500 transition-all duration-500 ${darkMode ? 'opacity-0 rotate-180 scale-0' : 'opacity-100 rotate-0 scale-100'}`} />
                <Moon className={`absolute inset-0 w-5 h-5 text-blue-400 transition-all duration-500 ${darkMode ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-180 scale-0'}`} />
              </div>
            </button>
            <button
              onClick={onLogout}
              className="p-2 rounded-lg bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/30 transition-all duration-200"
            >
              <LogOut className="w-5 h-5 text-red-600 dark:text-red-400" />
            </button>
          </div>
        </div>

        {/* Center section - Month Navigation */}
        <div className="flex items-center space-x-4 hidden md:flex">
          <button
            onClick={onPrevMonth}
            className="group p-3 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200 transform hover:scale-105 focus:ring-4 focus:ring-blue-500/20"
          >
            <ChevronLeft className="w-6 h-6 text-gray-600 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" />
          </button>
          
          <div className="text-center min-w-[200px]">
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">
              {monthName}
            </h2>
            <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full mx-auto mt-1"></div>
          </div>
          
          <button
            onClick={onNextMonth}
            className="group p-3 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200 transform hover:scale-105 focus:ring-4 focus:ring-blue-500/20"
          >
            <ChevronRight className="w-6 h-6 text-gray-600 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" />
          </button>
        </div>

        {/* Right section - Filters */}
        <div className="flex items-center space-x-2 md:space-x-4 w-full lg:w-auto">
          <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
            <Filter className="w-5 h-5" />
            <span className="text-sm font-medium hidden sm:inline">Filters:</span>
          </div>
          
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 md:space-x-3 flex-1 lg:flex-none">
            {/* Doctor Filter */}
            <div className="relative group">
              <select
                value={filters.doctor}
                onChange={(e) => onFilterChange({ ...filters, doctor: e.target.value })}
                className="form-input text-xs md:text-sm min-w-[120px] md:min-w-[140px] appearance-none cursor-pointer"
              >
                <option value="">All Doctors</option>
                {MOCK_DOCTORS.map(doctor => (
                  <option key={doctor.id} value={doctor.id}>{doctor.name}</option>
                ))}
              </select>
              <ChevronRight className="absolute right-3 top-1/2 transform -translate-y-1/2 rotate-90 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>
            
            {/* Patient Filter */}
            <div className="relative group">
              <select
                value={filters.patient}
                onChange={(e) => onFilterChange({ ...filters, patient: e.target.value })}
                className="form-input text-xs md:text-sm min-w-[120px] md:min-w-[140px] appearance-none cursor-pointer"
              >
                <option value="">All Patients</option>
                {MOCK_PATIENTS.map(patient => (
                  <option key={patient.id} value={patient.id}>{patient.name}</option>
                ))}
              </select>
              <ChevronRight className="absolute right-3 top-1/2 transform -translate-y-1/2 rotate-90 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}