import React, { useState, useEffect } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Plus,
  Clock,
  User,
  Calendar as CalendarIcon,
  MapPin,
  Phone,
  Sparkles,
  Star,
  Heart,
  Zap,
  Shield,
  Activity,
} from 'lucide-react';
import { Appointment } from '../types';
import { MOCK_DOCTORS, MOCK_PATIENTS } from '../data/mockData';

interface MobileCalendarProps {
  selectedDate: string;
  onDateChange: (date: string) => void;
  appointments: Appointment[];
  onAddAppointment: () => void;
  onAppointmentClick: (appointment: Appointment) => void;
}

export function MobileCalendar({
  selectedDate,
  onDateChange,
  appointments,
  onAddAppointment,
  onAppointmentClick,
}: MobileCalendarProps) {
  const [isNavigating, setIsNavigating] = useState(false);
  const [animatingAppointments, setAnimatingAppointments] = useState<Set<string>>(new Set());
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [currentTime, setCurrentTime] = useState(new Date());

  const date = new Date(selectedDate);
  const today = new Date();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const navigateDay = (direction: 'prev' | 'next') => {
    setIsNavigating(true);
    setTimeout(() => setIsNavigating(false), 300);
    
    const newDate = new Date(date);
    newDate.setDate(newDate.getDate() + (direction === 'next' ? 1 : -1));
    onDateChange(newDate.toISOString().split('T')[0]);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!touchStart) return;

    const touchEnd = e.changedTouches[0].clientX;
    const diff = touchStart - touchEnd;

    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        navigateDay('next');
      } else {
        navigateDay('prev');
      }
    }

    setTouchStart(null);
  };

  const handleAppointmentClick = (appointment: Appointment) => {
    setAnimatingAppointments(prev => new Set(prev).add(appointment.id));
    
    setTimeout(() => {
      setAnimatingAppointments(prev => {
        const newSet = new Set(prev);
        newSet.delete(appointment.id);
        return newSet;
      });
    }, 600);
    
    onAppointmentClick(appointment);
  };

  const getDoctorById = (id: string) =>
    MOCK_DOCTORS.find((doc) => doc.id === id);
  const getPatientById = (id: string) =>
    MOCK_PATIENTS.find((pat) => pat.id === id);

  const isToday = selectedDate === today.toISOString().split('T')[0];
  const isPast = date < new Date(today.toISOString().split('T')[0]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-blue-900 dark:to-indigo-900">
      {/* Enhanced Header with Advanced Gradient */}
      <div className="sticky top-0 z-20 bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-700 dark:from-blue-700 dark:via-blue-800 dark:to-indigo-900 shadow-2xl overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full animate-pulse" />
          <div className="absolute -bottom-10 -left-10 w-24 h-24 bg-white/5 rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
          <div className="absolute top-1/2 left-1/2 w-16 h-16 bg-white/5 rounded-full animate-pulse" style={{ animationDelay: '2s' }} />
        </div>

        {/* Enhanced Navigation Bar */}
        <div 
          className="flex items-center justify-between p-4 pb-2 relative z-10"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <button
            onClick={() => navigateDay('prev')}
            className="group p-4 rounded-3xl bg-white/20 hover:bg-white/30 active:bg-white/40 transition-all duration-300 transform active:scale-95 shadow-xl hover:shadow-2xl backdrop-blur-sm border border-white/20"
          >
            <ChevronLeft className="w-6 h-6 text-white group-hover:scale-110 group-hover:-translate-x-1 transition-all duration-300" />
            <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </button>

          <div className={`text-center flex-1 px-4 transition-all duration-300 ${
            isNavigating ? 'scale-110 opacity-80' : 'scale-100 opacity-100'
          }`}>
            <div className="relative">
              <h1 className="text-xl font-bold text-white mb-1 flex items-center justify-center space-x-2">
                <Sparkles className="w-5 h-5 animate-pulse" />
                <span>{date.toLocaleDateString('default', { weekday: 'long' })}</span>
                <Star className="w-4 h-4 animate-pulse" />
              </h1>
              <p className="text-blue-100 text-sm flex items-center justify-center space-x-2">
                <CalendarIcon className="w-4 h-4" />
                <span>
                  {date.toLocaleDateString('default', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </span>
              </p>
              
              {/* Live time display */}
              {isToday && (
                <p className="text-blue-200 text-xs mt-1 flex items-center justify-center space-x-1">
                  <Activity className="w-3 h-3 animate-pulse" />
                  <span>{currentTime.toLocaleTimeString()}</span>
                </p>
              )}
            </div>
          </div>

          <button
            onClick={() => navigateDay('next')}
            className="group p-4 rounded-3xl bg-white/20 hover:bg-white/30 active:bg-white/40 transition-all duration-300 transform active:scale-95 shadow-xl hover:shadow-2xl backdrop-blur-sm border border-white/20"
          >
            <ChevronRight className="w-6 h-6 text-white group-hover:scale-110 group-hover:translate-x-1 transition-all duration-300" />
            <div className="absolute inset-0 bg-gradient-to-l from-white/10 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </button>
        </div>

        {/* Enhanced Date Status and Quick Actions */}
        <div className="px-4 pb-4 relative z-10">
          <div className="flex items-center justify-between mb-4">
            {/* Enhanced Status Indicators */}
            <div className="flex items-center space-x-2">
              {isToday && (
                <div className="flex items-center space-x-2 px-4 py-2 bg-green-500/30 rounded-full border border-green-400/50 backdrop-blur-sm shadow-lg">
                  <div className="relative">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-ping" />
                    <div className="absolute top-0 left-0 w-2 h-2 bg-green-500 rounded-full" />
                  </div>
                  <span className="text-green-100 text-sm font-medium flex items-center space-x-1">
                    <Heart className="w-3 h-3 animate-pulse" />
                    <span>Today</span>
                  </span>
                </div>
              )}
              {isPast && !isToday && (
                <div className="flex items-center space-x-2 px-4 py-2 bg-gray-500/30 rounded-full border border-gray-400/50 backdrop-blur-sm shadow-lg">
                  <Shield className="w-3 h-3 text-gray-200" />
                  <span className="text-gray-200 text-sm">Past Date</span>
                </div>
              )}
              {!isToday && !isPast && (
                <div className="flex items-center space-x-2 px-4 py-2 bg-blue-500/30 rounded-full border border-blue-400/50 backdrop-blur-sm shadow-lg">
                  <Zap className="w-3 h-3 text-blue-100 animate-pulse" />
                  <span className="text-blue-100 text-sm">Future Date</span>
                </div>
              )}
            </div>

            {/* Enhanced Appointment Count */}
            <div className="flex items-center space-x-2 px-4 py-2 bg-white/20 rounded-full backdrop-blur-sm shadow-lg border border-white/30">
              <div className="relative">
                <CalendarIcon className="w-4 h-4 text-white" />
                {appointments.length > 0 && (
                  <div className="absolute -top-1 -right-1 w-2 h-2 bg-yellow-400 rounded-full animate-pulse" />
                )}
              </div>
              <span className="text-white text-sm font-medium">
                {appointments.length}{' '}
                {appointments.length === 1 ? 'appointment' : 'appointments'}
              </span>
              <Sparkles className="w-3 h-3 text-yellow-300 animate-pulse" />
            </div>
          </div>

          {/* Enhanced Date Picker and Add Button */}
          <div className="flex items-center space-x-3">
            <div className="relative flex-1 group">
              <CalendarIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/70 group-hover:text-white group-hover:scale-110 transition-all duration-300" />
              <input
                type="date"
                value={selectedDate}
                onChange={(e) =>
                  onDateChange(
                    e.target.value || new Date().toISOString().split('T')[0]
                  )
                }
                className="w-full pl-12 pr-4 py-4 bg-white/20 border border-white/30 rounded-2xl text-white placeholder-white/70 focus:ring-4 focus:ring-white/30 focus:border-white/50 transition-all backdrop-blur-sm shadow-lg hover:shadow-xl hover:bg-white/25"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            
            <button
              onClick={onAddAppointment}
              className="group px-8 py-4 bg-white text-blue-600 hover:bg-blue-50 active:bg-blue-100 rounded-2xl font-bold shadow-xl transition-all duration-300 transform active:scale-95 hover:shadow-2xl flex items-center space-x-2 relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-indigo-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <Plus className="w-5 h-5 relative z-10 group-hover:rotate-90 transition-transform duration-300" />
              <span className="relative z-10">Add</span>
              <Sparkles className="w-4 h-4 relative z-10 opacity-0 group-hover:opacity-100 transition-all duration-300 animate-pulse" />
            </button>
          </div>
        </div>

        {/* Floating particles */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white/30 rounded-full animate-float"
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

      {/* Enhanced Appointments Content */}
      <div className="px-4 py-6">
        {appointments.length === 0 ? (
          /* Enhanced Empty State */
          <div className="text-center py-20">
            <div className="relative mx-auto w-40 h-40 mb-8">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-100 via-indigo-100 to-purple-100 dark:from-blue-900/30 dark:via-indigo-900/30 dark:to-purple-900/30 rounded-full animate-pulse" />
              <div className="relative w-full h-full flex items-center justify-center">
                <CalendarIcon className="w-20 h-20 text-blue-400 dark:text-blue-500 animate-pulse" />
              </div>
              
              {/* Enhanced floating elements */}
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-blue-500 rounded-full animate-bounce flex items-center justify-center">
                <Plus className="w-4 h-4 text-white" />
              </div>
              <div
                className="absolute -bottom-2 -left-2 w-6 h-6 bg-indigo-500 rounded-full animate-pulse flex items-center justify-center"
                style={{ animationDelay: '1s' }}
              >
                <Star className="w-3 h-3 text-white" />
              </div>
              <div
                className="absolute top-1/4 -left-4 w-4 h-4 bg-purple-500 rounded-full animate-ping"
                style={{ animationDelay: '2s' }}
              />
              <div
                className="absolute bottom-1/4 -right-4 w-5 h-5 bg-yellow-500 rounded-full animate-pulse flex items-center justify-center"
                style={{ animationDelay: '1.5s' }}
              >
                <Sparkles className="w-2 h-2 text-white" />
              </div>
            </div>

            <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4 flex items-center justify-center space-x-2">
              <Heart className="w-8 h-8 text-red-500 animate-pulse" />
              <span>No appointments scheduled</span>
            </h3>
            <p className="text-gray-500 dark:text-gray-400 mb-10 text-lg leading-relaxed px-6">
              {isToday
                ? 'Your schedule is clear for today. Time to relax! 🌟'
                : 'No appointments planned for this day. Ready to schedule? ✨'}
            </p>

            <button
              onClick={onAddAppointment}
              className="btn-primary text-lg px-10 py-5 shadow-2xl group relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-indigo-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
              <Plus className="w-6 h-6 mr-3 relative z-10 group-hover:rotate-90 transition-transform duration-300" />
              <span className="relative z-10">Schedule First Appointment</span>
              <Sparkles className="w-5 h-5 ml-3 relative z-10 opacity-0 group-hover:opacity-100 transition-all duration-300 animate-pulse" />
            </button>
          </div>
        ) : (
          /* Enhanced Appointments List */
          <div className="space-y-6">
            {/* Enhanced Header with Quick Stats */}
            <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-2xl border border-gray-100 dark:border-gray-700 relative overflow-hidden">
              {/* Animated background */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-50/50 to-indigo-50/50 dark:from-blue-900/20 dark:to-indigo-900/20 animate-pulse" />
              
              <div className="flex items-center justify-between relative z-10">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl shadow-lg">
                    <Activity className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center space-x-2">
                      <span>Today's Schedule</span>
                      <Star className="w-5 h-5 text-yellow-500 animate-pulse" />
                    </h3>
                    <p className="text-gray-500 dark:text-gray-400 text-sm flex items-center space-x-2">
                      <Shield className="w-4 h-4 text-green-500" />
                      <span>
                        {appointments.length} appointment
                        {appointments.length !== 1 ? 's' : ''} planned
                      </span>
                    </p>
                  </div>
                </div>
                
                <button
                  onClick={onAddAppointment}
                  className="group p-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/30 dark:to-indigo-900/30 hover:from-blue-100 hover:to-indigo-100 dark:hover:from-blue-900/50 dark:hover:to-indigo-900/50 rounded-2xl transition-all duration-300 transform active:scale-95 shadow-lg hover:shadow-xl"
                >
                  <Plus className="w-6 h-6 text-blue-600 dark:text-blue-400 group-hover:rotate-90 transition-transform duration-300" />
                </button>
              </div>
            </div>

            {/* Enhanced Appointments List */}
            {appointments
              .sort((a, b) => a.time.localeCompare(b.time))
              .map((appointment, index) => {
                const doctor = getDoctorById(appointment.doctorId);
                const patient = getPatientById(appointment.patientId);
                const isAnimating = animatingAppointments.has(appointment.id);

                return (
                  <div
                    key={appointment.id}
                    className={`appointment-card bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-2xl border-l-4 hover:shadow-3xl transition-all duration-500 transform active:scale-[0.98] cursor-pointer relative overflow-hidden ${
                      isAnimating ? 'animate-bounce scale-105' : 'hover:scale-105 hover:-translate-y-2'
                    }`}
                    style={{ 
                      borderLeftColor: doctor?.color,
                      animationDelay: `${index * 0.1}s`
                    }}
                    onClick={() => handleAppointmentClick(appointment)}
                  >
                    {/* Enhanced animated background */}
                    <div 
                      className="absolute inset-0 opacity-5 animate-pulse"
                      style={{ backgroundColor: doctor?.color }}
                    />
                    
                    {/* Enhanced Time Header */}
                    <div className="flex items-center justify-between mb-6 relative z-10">
                      <div className="flex items-center space-x-4">
                        <div
                          className="p-4 rounded-2xl shadow-xl relative overflow-hidden group"
                          style={{ backgroundColor: doctor?.color + '20' }}
                        >
                          <Clock
                            className="w-7 h-7 relative z-10 group-hover:scale-110 transition-transform duration-300"
                            style={{ color: doctor?.color }}
                          />
                          <div 
                            className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300"
                            style={{ backgroundColor: doctor?.color }}
                          />
                        </div>
                        <div>
                          <div className="text-3xl font-bold text-gray-900 dark:text-white flex items-center space-x-2">
                            <span>{appointment.time}</span>
                            <Zap className="w-5 h-5 text-yellow-500 animate-pulse" />
                          </div>
                          <div className="text-sm text-gray-500 dark:text-gray-400 flex items-center space-x-2">
                            <Star className="w-3 h-3 text-yellow-400" />
                            <span>Appointment #{index + 1}</span>
                          </div>
                        </div>
                      </div>

                      {/* Enhanced Status Indicator */}
                      <div className="flex flex-col items-center space-y-2">
                        <div className="relative">
                          <div
                            className="w-4 h-4 rounded-full animate-pulse shadow-lg"
                            style={{ backgroundColor: doctor?.color }}
                          />
                          <div
                            className="absolute inset-0 w-4 h-4 rounded-full animate-ping"
                            style={{ backgroundColor: doctor?.color }}
                          />
                        </div>
                        <ChevronRight className="w-5 h-5 text-gray-400 animate-pulse" />
                      </div>
                    </div>

                    {/* Enhanced Patient Information */}
                    <div className="bg-gradient-to-r from-gray-50 to-blue-50 dark:from-gray-700/50 dark:to-blue-900/20 rounded-2xl p-5 mb-5 relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-400/5 to-indigo-400/5 animate-pulse" />
                      
                      <div className="flex items-start space-x-4 relative z-10">
                        <div className="p-3 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl shadow-lg">
                          <User className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <div className="font-bold text-gray-900 dark:text-white text-xl mb-2 flex items-center space-x-2">
                            <span>{patient?.name}</span>
                            <Heart className="w-5 h-5 text-red-500 animate-pulse" />
                          </div>
                          <div className="text-sm text-gray-500 dark:text-gray-400 mb-3 flex items-center space-x-2">
                            <Shield className="w-4 h-4 text-green-500" />
                            <span>Patient Information</span>
                          </div>
                          <div className="flex flex-col space-y-2 text-sm text-gray-600 dark:text-gray-400">
                            <div className="flex items-center space-x-3">
                              <div className="p-1 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                                <Phone className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                              </div>
                              <span className="font-medium">{patient?.phone}</span>
                            </div>
                            <div className="flex items-center space-x-3">
                              <div className="p-1 bg-green-100 dark:bg-green-900/30 rounded-lg">
                                <MapPin className="w-4 h-4 text-green-600 dark:text-green-400" />
                              </div>
                              <span className="font-medium">{patient?.email}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Enhanced Doctor Information */}
                    <div className="flex items-center space-x-4 mb-5 relative z-10">
                      <div className="relative">
                        <div
                          className="w-8 h-8 rounded-full shadow-xl relative overflow-hidden"
                          style={{ backgroundColor: doctor?.color }}
                        >
                          <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent animate-pulse" />
                        </div>
                        <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                      </div>
                      <div className="flex-1">
                        <div className="font-bold text-gray-900 dark:text-white text-lg flex items-center space-x-2">
                          <span style={{ color: doctor?.color }}>{doctor?.name}</span>
                          <Sparkles className="w-4 h-4 text-yellow-500 animate-pulse" />
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400 flex items-center space-x-2">
                          <Activity className="w-4 h-4 text-blue-500 animate-pulse" />
                          <span>{doctor?.specialty}</span>
                        </div>
                      </div>
                    </div>

                    {/* Enhanced Notes Section */}
                    {appointment.notes && (
                      <div className="bg-gradient-to-r from-amber-50 to-yellow-50 dark:from-amber-900/20 dark:to-yellow-900/20 border border-amber-200 dark:border-amber-800 rounded-2xl p-5 relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-r from-amber-400/5 to-yellow-400/5 animate-pulse" />
                        
                        <div className="flex items-start space-x-3 relative z-10">
                          <div className="p-2 bg-gradient-to-r from-amber-500 to-yellow-500 rounded-xl shadow-lg">
                            <MapPin className="w-5 h-5 text-white" />
                          </div>
                          <div className="flex-1">
                            <div className="text-sm font-bold text-amber-800 dark:text-amber-200 mb-2 flex items-center space-x-2">
                              <span>Special Notes</span>
                              <Star className="w-4 h-4 text-yellow-500 animate-pulse" />
                            </div>
                            <div className="text-sm text-amber-700 dark:text-amber-300 leading-relaxed">
                              {appointment.notes}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Enhanced Action Hint */}
                    <div className="mt-6 pt-5 border-t border-gray-100 dark:border-gray-700 relative z-10">
                      <div className="text-center text-sm text-gray-400 dark:text-gray-500 flex items-center justify-center space-x-2">
                        <Zap className="w-4 h-4 animate-pulse" />
                        <span>Tap to edit or view details</span>
                        <Sparkles className="w-4 h-4 animate-pulse" />
                      </div>
                    </div>

                    {/* Hover effect overlay */}
                    <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 rounded-3xl pointer-events-none" />
                  </div>
                );
              })}
          </div>
        )}
      </div>
    </div>
  );
}