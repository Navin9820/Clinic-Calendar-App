import React from 'react';
import { Appointment } from '../types';
import { MOCK_DOCTORS, MOCK_PATIENTS } from '../data/mockData';
import { Plus, Clock, User } from 'lucide-react';

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

  const getAppointmentsForDay = (date: Date) => {
    const dateString = date.toISOString().split('T')[0];
    return appointments.filter((apt) => apt.date === dateString);
  };

  const getDoctorById = (id: string) =>
    MOCK_DOCTORS.find((doc) => doc.id === id);
  const getPatientById = (id: string) =>
    MOCK_PATIENTS.find((pat) => pat.id === id);

  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
      {/* Days of week header */}
      <div className="grid grid-cols-7 gap-px bg-gray-200 dark:bg-gray-600">
        {[
          'Sunday',
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday',
        ].map((day) => (
          <div
            key={day}
            className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-700 dark:to-gray-600 px-4 py-4 text-center"
          >
            <span className="text-sm font-bold text-gray-700 dark:text-gray-300 hidden sm:inline">
              {day}
            </span>
            <span className="text-sm font-bold text-gray-700 dark:text-gray-300 sm:hidden">
              {day.slice(0, 3)}
            </span>
          </div>
        ))}
      </div>

      {/* Calendar days */}
      <div className="grid grid-cols-7 gap-px bg-gray-200 dark:bg-gray-600">
        {days.map((date, index) => {
          const dateString = date.toISOString().split('T')[0];
          const dayAppointments = getAppointmentsForDay(date);
          const isCurrentMonth = date.getMonth() === month;
          const isToday = dateString === today;
          const isPast = date < new Date(today);

          return (
            <div
              key={index}
              className={`
                calendar-day group bg-white dark:bg-gray-800 min-h-[140px] p-3 cursor-pointer relative overflow-hidden
                ${!isCurrentMonth ? 'opacity-40 bg-gray-50 dark:bg-gray-900' : ''}
                ${isToday ? 'bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/30 dark:to-indigo-900/30' : ''}
                ${isPast && isCurrentMonth ? 'bg-gray-50 dark:bg-gray-800/50' : ''}
                hover:shadow-lg hover:z-10 transition-all duration-200
              `}
              onClick={() => onDayClick(dateString)}
            >
              {/* Date number */}
              <div className="flex justify-between items-start mb-2">
                <span
                  className={`
                  text-lg font-bold transition-colors
                  ${isToday ? 'text-blue-600 dark:text-blue-400' : 'text-gray-900 dark:text-white'}
                  ${!isCurrentMonth ? 'text-gray-400 dark:text-gray-600' : ''}
                  ${isPast && isCurrentMonth ? 'text-gray-500 dark:text-gray-500' : ''}
                `}
                >
                  {date.getDate()}
                </span>

                {/* Add appointment button */}
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <div className="p-1.5 rounded-lg bg-blue-500 hover:bg-blue-600 text-white shadow-lg transform hover:scale-110 transition-all duration-200">
                    <Plus className="w-4 h-4" />
                  </div>
                </div>
              </div>

              {/* Today indicator */}
              {isToday && (
                <div className="absolute top-2 right-2 w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
              )}

              {/* Appointments */}
              <div className="space-y-1.5">
                {dayAppointments.slice(0, 3).map((appointment) => {
                  const doctor = getDoctorById(appointment.doctorId);
                  const patient = getPatientById(appointment.patientId);

                  return (
                    <div
                      key={appointment.id}
                      className="appointment-card text-xs p-2 rounded-lg cursor-pointer border-l-3 shadow-sm hover:shadow-md"
                      style={{
                        backgroundColor: doctor?.color + '15',
                        borderLeftColor: doctor?.color,
                        borderLeftWidth: '4px',
                      }}
                      onClick={(e) => {
                        e.stopPropagation();
                        onAppointmentClick(appointment);
                      }}
                    >
                      <div className="flex items-center space-x-1 mb-1">
                        <Clock className="w-3 h-3 text-gray-600 dark:text-gray-400" />
                        <span className="font-semibold text-gray-900 dark:text-white">
                          {appointment.time}
                        </span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <User className="w-3 h-3 text-gray-500 dark:text-gray-400" />
                        <span className="text-gray-700 dark:text-gray-300 truncate">
                          {patient?.name}
                        </span>
                      </div>
                      <div className="text-gray-500 dark:text-gray-400 truncate text-xs mt-1">
                        {doctor?.name}
                      </div>
                    </div>
                  );
                })}

                {/* More appointments indicator */}
                {dayAppointments.length > 3 && (
                  <div className="text-xs text-center py-1 px-2 bg-gray-100 dark:bg-gray-700 rounded-lg text-gray-600 dark:text-gray-400 font-medium">
                    +{dayAppointments.length - 3} more
                  </div>
                )}
              </div>

              {/* Empty state */}
              {dayAppointments.length === 0 && isCurrentMonth && (
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <div className="text-center">
                    <Plus className="w-8 h-8 text-gray-300 dark:text-gray-600 mx-auto mb-1" />
                    <span className="text-xs text-gray-400 dark:text-gray-500">
                      Add appointment
                    </span>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
