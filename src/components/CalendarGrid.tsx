import React, { useState, useEffect } from 'react';
import { Appointment } from '../types';
import { MOCK_DOCTORS, MOCK_PATIENTS } from '../data/mockData';
import { Plus, Clock, User, Sparkles, Calendar, Star } from 'lucide-react';

interface CalendarGridProps {
  currentDate: Date;
  appointments: Appointment[];
  onDayClick: (date: string) => void;
  onAppointmentClick: (appointment: Appointment) => void;
}

export function CalendarGrid({
  currentDate,
  appointments,
  onDayClick,
  onAppointmentClick,
}: CalendarGridProps) {
  const [hoveredDay, setHoveredDay] = useState<string | null>(null);
  const [animatingAppointments, setAnimatingAppointments] = useState<Set<string>>(new Set());
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const firstDayOfMonth = new Date(year, month, 1);
  const lastDayOfMonth = new Date(year, month + 1, 0);
  const startDate = new Date(firstDayOfMonth);
  startDate.setDate(startDate.getDate() - firstDayOfMonth.getDay());

  const days = [];
  const current = new Date(startDate);

  while (current <= lastDayOfMonth || current.getDay() !== 0) {
    days.push(new Date(current));
    current.setDate(current.getDate() + 1);
  }

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const getAppointmentsForDay = (date: Date) => {
    const dateString = date.toISOString().split('T')[0];
    return appointments.filter((apt) => apt.date === dateString);
  };

  const getDoctorById = (id: string) =>
    MOCK_DOCTORS.find((doc) => doc.id === id);
  const getPatientById = (id: string) =>
    MOCK_PATIENTS.find((pat) => pat.id === id);

  const today = new Date().toISOString().split('T')[0];

  const handleAppointmentClick = (appointment: Appointment, e: React.MouseEvent) => {
    e.stopPropagation();
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

  return (
    <div className="relative">
      {/* Floating cursor effect */}
      <div
        className="fixed w-6 h-6 pointer-events-none z-50 transition-all duration-300 ease-out opacity-20"
        style={{
          left: mousePosition.x - 12,
          top: mousePosition.y - 12,
          background: 'radial-gradient(circle, rgba(59, 130, 246, 0.6) 0%, transparent 70%)',
          borderRadius: '50%',
          transform: hoveredDay ? 'scale(2)' : 'scale(1)',
        }}
      />

      <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl overflow-hidden border border-gray-100 dark:border-gray-700 transform transition-all duration-500 hover:shadow-3xl">
        {/* Enhanced Days of week header */}
        <div className="grid grid-cols-7 gap-px bg-gradient-to-r from-blue-500 to-indigo-600">
          {[
            'Sunday',
            'Monday',
            'Tuesday',
            'Wednesday',
            'Thursday',
            'Friday',
            'Saturday',
          ].map((day, index) => (
            <div
              key={day}
              className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-700 dark:to-gray-600 px-4 py-6 text-center relative overflow-hidden group"
            >
              {/* Animated background */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400/10 to-indigo-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <span className="relative text-sm font-bold text-gray-700 dark:text-gray-300 hidden sm:inline group-hover:scale-110 transition-transform duration-300">
                {day}
              </span>
              <span className="relative text-sm font-bold text-gray-700 dark:text-gray-300 sm:hidden group-hover:scale-110 transition-transform duration-300">
                {day.slice(0, 3)}
              </span>
              
              {/* Day indicator dots */}
              <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2">
                <div 
                  className="w-1 h-1 bg-blue-400 rounded-full opacity-60 animate-pulse"
                  style={{ animationDelay: `${index * 0.1}s` }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Enhanced Calendar days */}
        <div className="grid grid-cols-7 gap-px bg-gray-200 dark:bg-gray-600">
          {days.map((date, index) => {
            const dateString = date.toISOString().split('T')[0];
            const dayAppointments = getAppointmentsForDay(date);
            const isCurrentMonth = date.getMonth() === month;
            const isToday = dateString === today;
            const isPast = date < new Date(today);
            const isHovered = hoveredDay === dateString;

            return (
              <div
                key={index}
                className={`
                  calendar-day group bg-white dark:bg-gray-800 min-h-[140px] p-3 cursor-pointer relative overflow-hidden transition-all duration-300
                  ${!isCurrentMonth ? 'opacity-40 bg-gray-50 dark:bg-gray-900' : ''}
                  ${isToday ? 'bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/30 dark:to-indigo-900/30' : ''}
                  ${isPast && isCurrentMonth ? 'bg-gray-50 dark:bg-gray-800/50' : ''}
                  ${isHovered ? 'transform scale-105 shadow-2xl z-10' : 'hover:shadow-lg hover:z-10'}
                `}
                onClick={() => onDayClick(dateString)}
                onMouseEnter={() => setHoveredDay(dateString)}
                onMouseLeave={() => setHoveredDay(null)}
              >
                {/* Enhanced background effects */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Animated border */}
                <div className={`absolute inset-0 border-2 rounded-lg transition-all duration-300 ${
                  isHovered ? 'border-blue-400 shadow-lg shadow-blue-400/20' : 'border-transparent'
                }`} />

                {/* Date number with enhanced styling */}
                <div className="flex justify-between items-start mb-2 relative z-10">
                  <div className="relative">
                    <span
                      className={`
                      text-lg font-bold transition-all duration-300 relative
                      ${isToday ? 'text-blue-600 dark:text-blue-400 scale-110' : 'text-gray-900 dark:text-white'}
                      ${!isCurrentMonth ? 'text-gray-400 dark:text-gray-600' : ''}
                      ${isPast && isCurrentMonth ? 'text-gray-500 dark:text-gray-500' : ''}
                      ${isHovered ? 'scale-125 text-blue-600 dark:text-blue-400' : ''}
                    `}
                    >
                      {date.getDate()}
                    </span>
                    
                    {/* Today indicator with animation */}
                    {isToday && (
                      <div className="absolute -top-1 -right-1">
                        <div className="w-3 h-3 bg-blue-500 rounded-full animate-ping" />
                        <div className="absolute top-0 left-0 w-3 h-3 bg-blue-600 rounded-full animate-pulse" />
                      </div>
                    )}
                  </div>

                  {/* Enhanced Add appointment button */}
                  <div className={`transition-all duration-300 ${
                    isHovered ? 'opacity-100 scale-110' : 'opacity-0 group-hover:opacity-100'
                  }`}>
                    <div className="relative">
                      <div className="p-2 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-lg transform hover:scale-110 transition-all duration-200 hover:shadow-xl">
                        <Plus className="w-4 h-4" />
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-xl blur opacity-50 animate-pulse" />
                    </div>
                  </div>
                </div>

                {/* Enhanced Appointments */}
                <div className="space-y-2 relative z-10">
                  {dayAppointments.slice(0, 3).map((appointment, aptIndex) => {
                    const doctor = getDoctorById(appointment.doctorId);
                    const patient = getPatientById(appointment.patientId);
                    const isAnimating = animatingAppointments.has(appointment.id);

                    return (
                      <div
                        key={appointment.id}
                        className={`
                          appointment-card text-xs p-3 rounded-xl cursor-pointer border-l-4 shadow-sm hover:shadow-lg
                          transform transition-all duration-300 hover:scale-105 hover:-translate-y-1
                          ${isAnimating ? 'animate-bounce scale-110' : ''}
                        `}
                        style={{
                          backgroundColor: doctor?.color + '15',
                          borderLeftColor: doctor?.color,
                          borderLeftWidth: '4px',
                          animationDelay: `${aptIndex * 0.1}s`,
                        }}
                        onClick={(e) => handleAppointmentClick(appointment, e)}
                      >
                        {/* Appointment time with icon */}
                        <div className="flex items-center space-x-2 mb-2">
                          <div 
                            className="p-1 rounded-full"
                            style={{ backgroundColor: doctor?.color + '30' }}
                          >
                            <Clock className="w-3 h-3" style={{ color: doctor?.color }} />
                          </div>
                          <span className="font-semibold text-gray-900 dark:text-white">
                            {appointment.time}
                          </span>
                          <Sparkles className="w-3 h-3 text-yellow-400 animate-pulse" />
                        </div>
                        
                        {/* Patient info with enhanced styling */}
                        <div className="flex items-center space-x-2 mb-1">
                          <div 
                            className="p-1 rounded-full"
                            style={{ backgroundColor: doctor?.color + '20' }}
                          >
                            <User className="w-3 h-3 text-gray-500 dark:text-gray-400" />
                          </div>
                          <span className="text-gray-700 dark:text-gray-300 truncate font-medium">
                            {patient?.name}
                          </span>
                        </div>
                        
                        {/* Doctor info */}
                        <div className="flex items-center space-x-2">
                          <div
                            className="w-3 h-3 rounded-full shadow-sm animate-pulse"
                            style={{ backgroundColor: doctor?.color }}
                          />
                          <span className="text-gray-500 dark:text-gray-400 truncate text-xs">
                            {doctor?.name}
                          </span>
                        </div>

                        {/* Hover effect overlay */}
                        <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 rounded-xl" />
                      </div>
                    );
                  })}

                  {/* Enhanced More appointments indicator */}
                  {dayAppointments.length > 3 && (
                    <div className="text-xs text-center py-2 px-3 bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 rounded-xl text-gray-600 dark:text-gray-400 font-medium shadow-sm hover:shadow-md transition-all duration-300 transform hover:scale-105">
                      <div className="flex items-center justify-center space-x-1">
                        <Star className="w-3 h-3 text-yellow-500 animate-pulse" />
                        <span>+{dayAppointments.length - 3} more</span>
                        <Star className="w-3 h-3 text-yellow-500 animate-pulse" />
                      </div>
                    </div>
                  )}
                </div>

                {/* Enhanced Empty state */}
                {dayAppointments.length === 0 && isCurrentMonth && (
                  <div className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ${
                    isHovered ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                  }`}>
                    <div className="text-center">
                      <div className="relative">
                        <Calendar className="w-8 h-8 text-gray-300 dark:text-gray-600 mx-auto mb-2 animate-pulse" />
                        <div className="absolute -top-1 -right-1 w-3 h-3 bg-blue-400 rounded-full animate-ping" />
                      </div>
                      <span className="text-xs text-gray-400 dark:text-gray-500 font-medium">
                        Add appointment
                      </span>
                    </div>
                  </div>
                )}

                {/* Floating particles for active days */}
                {dayAppointments.length > 0 && (
                  <div className="absolute top-2 right-2 opacity-60">
                    <div className="w-1 h-1 bg-blue-400 rounded-full animate-ping" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}