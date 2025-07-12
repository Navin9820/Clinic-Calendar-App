import React from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Plus,
  Clock,
  User,
  Calendar as CalendarIcon,
  MapPin,
  Phone,
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
  const date = new Date(selectedDate);
  const today = new Date();

  const navigateDay = (direction: 'prev' | 'next') => {
    const newDate = new Date(date);
    newDate.setDate(newDate.getDate() + (direction === 'next' ? 1 : -1));
    onDateChange(newDate.toISOString().split('T')[0]);
  };

  const getDoctorById = (id: string) =>
    MOCK_DOCTORS.find((doc) => doc.id === id);
  const getPatientById = (id: string) =>
    MOCK_PATIENTS.find((pat) => pat.id === id);

  const isToday = selectedDate === today.toISOString().split('T')[0];
  const isPast = date < new Date(today.toISOString().split('T')[0]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Enhanced Header with Gradient */}
      <div className="sticky top-0 z-10 bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-700 dark:from-blue-700 dark:via-blue-800 dark:to-indigo-900 shadow-xl">
        {/* Navigation Bar */}
        <div className="flex items-center justify-between p-4 pb-2">
          <button
            onClick={() => navigateDay('prev')}
            className="p-3 rounded-2xl bg-white/20 hover:bg-white/30 active:bg-white/40 transition-all duration-200 transform active:scale-95 shadow-lg"
          >
            <ChevronLeft className="w-6 h-6 text-white" />
          </button>

          <div className="text-center flex-1 px-4">
            <h1 className="text-xl font-bold text-white mb-1">
              {date.toLocaleDateString('default', { weekday: 'long' })}
            </h1>
            <p className="text-blue-100 text-sm">
              {date.toLocaleDateString('default', {
                month: 'long',
                day: 'numeric',
                year: 'numeric',
              })}
            </p>
          </div>

          <button
            onClick={() => navigateDay('next')}
            className="p-3 rounded-2xl bg-white/20 hover:bg-white/30 active:bg-white/40 transition-all duration-200 transform active:scale-95 shadow-lg"
          >
            <ChevronRight className="w-6 h-6 text-white" />
          </button>
        </div>

        {/* Date Status and Quick Actions */}
        <div className="px-4 pb-4">
          <div className="flex items-center justify-between">
            {/* Today Indicator */}
            <div className="flex items-center space-x-2">
              {isToday && (
                <div className="flex items-center space-x-2 px-3 py-1.5 bg-green-500/20 rounded-full border border-green-400/30">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-green-100 text-sm font-medium">
                    Today
                  </span>
                </div>
              )}
              {isPast && !isToday && (
                <div className="flex items-center space-x-2 px-3 py-1.5 bg-gray-500/20 rounded-full border border-gray-400/30">
                  <span className="text-gray-200 text-sm">Past Date</span>
                </div>
              )}
              {!isToday && !isPast && (
                <div className="flex items-center space-x-2 px-3 py-1.5 bg-blue-500/20 rounded-full border border-blue-400/30">
                  <span className="text-blue-100 text-sm">Future Date</span>
                </div>
              )}
            </div>

            {/* Appointment Count */}
            <div className="flex items-center space-x-2 px-3 py-1.5 bg-white/10 rounded-full">
              <CalendarIcon className="w-4 h-4 text-white" />
              <span className="text-white text-sm font-medium">
                {appointments.length}{' '}
                {appointments.length === 1 ? 'appointment' : 'appointments'}
              </span>
            </div>
          </div>

          {/* Date Picker and Add Button */}
          <div className="flex items-center space-x-3 mt-4">
            <div className="relative flex-1">
              <CalendarIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/70" />
              <input
                type="date"
                value={selectedDate}
                onChange={(e) =>
                  onDateChange(
                    e.target.value || new Date().toISOString().split('T')[0]
                  )
                }
                className="w-full pl-10 pr-4 py-3 bg-white/15 border border-white/20 rounded-2xl text-white placeholder-white/70 focus:ring-4 focus:ring-white/20 focus:border-white/40 transition-all backdrop-blur-sm"
              />
            </div>
            <button
              onClick={onAddAppointment}
              className="px-6 py-3 bg-white text-blue-600 hover:bg-blue-50 active:bg-blue-100 rounded-2xl font-semibold shadow-lg transition-all duration-200 transform active:scale-95 flex items-center space-x-2"
            >
              <Plus className="w-5 h-5" />
              <span>Add</span>
            </button>
          </div>
        </div>
      </div>

      {/* Appointments Content */}
      <div className="px-4 py-6">
        {appointments.length === 0 ? (
          /* Enhanced Empty State */
          <div className="text-center py-16">
            <div className="relative mx-auto w-32 h-32 mb-6">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/30 rounded-full"></div>
              <div className="relative w-full h-full flex items-center justify-center">
                <CalendarIcon className="w-16 h-16 text-blue-400 dark:text-blue-500" />
              </div>
              {/* Floating elements */}
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-blue-500 rounded-full animate-pulse"></div>
              <div
                className="absolute -bottom-2 -left-2 w-4 h-4 bg-indigo-500 rounded-full animate-pulse"
                style={{ animationDelay: '1s' }}
              ></div>
            </div>

            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
              No appointments scheduled
            </h3>
            <p className="text-gray-500 dark:text-gray-400 mb-8 text-lg leading-relaxed px-4">
              {isToday
                ? 'Your schedule is clear for today'
                : 'No appointments planned for this day'}
            </p>

            <button
              onClick={onAddAppointment}
              className="btn-primary text-lg px-8 py-4 shadow-xl"
            >
              <Plus className="w-6 h-6 mr-3" />
              Schedule First Appointment
            </button>
          </div>
        ) : (
          /* Enhanced Appointments List */
          <div className="space-y-4">
            {/* Header with Quick Stats */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-lg border border-gray-100 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                    Today's Schedule
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400 text-sm">
                    {appointments.length} appointment
                    {appointments.length !== 1 ? 's' : ''} planned
                  </p>
                </div>
                <button
                  onClick={onAddAppointment}
                  className="p-3 bg-blue-50 dark:bg-blue-900/30 hover:bg-blue-100 dark:hover:bg-blue-900/50 rounded-xl transition-all duration-200 transform active:scale-95"
                >
                  <Plus className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </button>
              </div>
            </div>

            {/* Appointments List */}
            {appointments
              .sort((a, b) => a.time.localeCompare(b.time))
              .map((appointment, index) => {
                const doctor = getDoctorById(appointment.doctorId);
                const patient = getPatientById(appointment.patientId);

                return (
                  <div
                    key={appointment.id}
                    className="appointment-card bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-lg border-l-4 hover:shadow-xl transition-all duration-300 transform active:scale-[0.98] cursor-pointer"
                    style={{ borderLeftColor: doctor?.color }}
                    onClick={() => onAppointmentClick(appointment)}
                  >
                    {/* Time Header */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div
                          className="p-3 rounded-xl shadow-sm"
                          style={{ backgroundColor: doctor?.color + '20' }}
                        >
                          <Clock
                            className="w-6 h-6"
                            style={{ color: doctor?.color }}
                          />
                        </div>
                        <div>
                          <div className="text-2xl font-bold text-gray-900 dark:text-white">
                            {appointment.time}
                          </div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            Appointment #{index + 1}
                          </div>
                        </div>
                      </div>

                      {/* Status Indicator */}
                      <div className="flex flex-col items-center space-y-1">
                        <div
                          className="w-3 h-3 rounded-full animate-pulse"
                          style={{ backgroundColor: doctor?.color }}
                        />
                        <ChevronRight className="w-4 h-4 text-gray-400" />
                      </div>
                    </div>

                    {/* Patient Information */}
                    <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4 mb-4">
                      <div className="flex items-start space-x-3">
                        <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                          <User className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                        </div>
                        <div className="flex-1">
                          <div className="font-semibold text-gray-900 dark:text-white text-lg">
                            {patient?.name}
                          </div>
                          <div className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                            Patient
                          </div>
                          <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
                            <div className="flex items-center space-x-1">
                              <Phone className="w-4 h-4" />
                              <span>{patient?.phone}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Doctor Information */}
                    <div className="flex items-center space-x-3 mb-4">
                      <div
                        className="w-6 h-6 rounded-full shadow-sm"
                        style={{ backgroundColor: doctor?.color }}
                      />
                      <div className="flex-1">
                        <div className="font-semibold text-gray-900 dark:text-white">
                          {doctor?.name}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          {doctor?.specialty}
                        </div>
                      </div>
                    </div>

                    {/* Notes Section */}
                    {appointment.notes && (
                      <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl p-4">
                        <div className="flex items-start space-x-2">
                          <div className="p-1 bg-amber-100 dark:bg-amber-900/30 rounded">
                            <MapPin className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                          </div>
                          <div>
                            <div className="text-sm font-medium text-amber-800 dark:text-amber-200 mb-1">
                              Notes
                            </div>
                            <div className="text-sm text-amber-700 dark:text-amber-300">
                              {appointment.notes}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Action Hint */}
                    <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
                      <div className="text-center text-sm text-gray-400 dark:text-gray-500">
                        Tap to edit or view details
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        )}
      </div>
    </div>
  );
}
