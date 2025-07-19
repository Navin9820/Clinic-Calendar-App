import React, { useState, useEffect } from 'react';
import {
  X,
  Save,
  Trash2,
  Clock,
  User,
  UserCheck,
  FileText,
  Calendar as CalendarIcon,
  Sparkles,
  Heart,
  Shield,
  Zap,
  Star,
  CheckCircle,
} from 'lucide-react';
import { Appointment } from '../types';
import { MOCK_DOCTORS, MOCK_PATIENTS } from '../data/mockData';

interface AppointmentFormProps {
  appointment?: Appointment;
  selectedDate: string;
  onSave: (appointment: Omit<Appointment, 'id'>) => void;
  onUpdate: (id: string, appointment: Partial<Appointment>) => void;
  onDelete: (id: string) => void;
  onClose: () => void;
}

export function AppointmentForm({
  appointment,
  selectedDate,
  onSave,
  onUpdate,
  onDelete,
  onClose,
}: AppointmentFormProps) {
  const [formData, setFormData] = useState({
    patientId: appointment?.patientId || '',
    doctorId: appointment?.doctorId || '',
    date: appointment?.date || selectedDate,
    time: appointment?.time || '',
    notes: appointment?.notes || '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    if (appointment) {
      setFormData({
        patientId: appointment.patientId,
        doctorId: appointment.doctorId,
        date: appointment.date,
        time: appointment.time,
        notes: appointment.notes || '',
      });
    }
  }, [appointment]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.patientId) newErrors.patientId = 'Please select a patient';
    if (!formData.doctorId) newErrors.doctorId = 'Please select a doctor';
    if (!formData.date) newErrors.date = 'Date is required';
    if (!formData.time) newErrors.time = 'Please select a time slot';

    // Validate date is not in the past
    const selectedDate = new Date(formData.date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (selectedDate < today) {
      newErrors.date = 'Cannot schedule appointments in the past';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    // Enhanced loading simulation with progress steps
    const steps = [
      'Validating information...',
      'Checking availability...',
      'Saving appointment...',
      'Sending notifications...',
    ];

    for (let i = 0; i < steps.length; i++) {
      await new Promise((resolve) => setTimeout(resolve, 400));
    }

    if (appointment) {
      onUpdate(appointment.id, formData);
    } else {
      onSave(formData);
    }

    setShowSuccess(true);
    setTimeout(() => {
      setIsSubmitting(false);
      onClose();
    }, 1000);
  };

  const handleDelete = async () => {
    if (
      appointment &&
      window.confirm(
        'Are you sure you want to delete this appointment? This action cannot be undone.'
      )
    ) {
      setIsSubmitting(true);
      await new Promise((resolve) => setTimeout(resolve, 800));
      onDelete(appointment.id);
      onClose();
    }
  };

  const generateTimeSlots = () => {
    const slots = [];
    for (let hour = 8; hour < 18; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const time = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
        slots.push(time);
      }
    }
    return slots;
  };

  const selectedDoctor = MOCK_DOCTORS.find(
    (doc) => doc.id === formData.doctorId
  );
  const selectedPatient = MOCK_PATIENTS.find(
    (pat) => pat.id === formData.patientId
  );

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center p-4 z-50 modal-overlay">
      {/* Interactive cursor effect */}
      <div
        className="fixed w-6 h-6 pointer-events-none z-50 transition-all duration-300 ease-out opacity-30"
        style={{
          left: mousePosition.x - 12,
          top: mousePosition.y - 12,
          background: 'radial-gradient(circle, rgba(59, 130, 246, 0.8) 0%, transparent 70%)',
          borderRadius: '50%',
          transform: isHovering ? 'scale(2)' : 'scale(1)',
        }}
      />

      <div 
        className="bg-white dark:bg-gray-800 rounded-3xl shadow-3xl max-w-lg w-full max-h-[90vh] overflow-y-auto modal-content border border-gray-200 dark:border-gray-700 transform transition-all duration-500"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        {/* Enhanced Header */}
        <div className="relative p-6 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-700">
          {/* Animated background */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-indigo-500/5 animate-pulse" />
          
          <div className="flex items-center justify-between relative z-10">
            <div className="flex items-center space-x-4">
              <div
                className={`p-4 rounded-2xl shadow-lg transform transition-all duration-300 hover:scale-110 ${
                  appointment 
                    ? 'bg-gradient-to-r from-blue-500 to-blue-600 shadow-blue-500/30' 
                    : 'bg-gradient-to-r from-green-500 to-green-600 shadow-green-500/30'
                }`}
              >
                <CalendarIcon className="w-7 h-7 text-white" />
                <div className="absolute -top-1 -right-1">
                  <Sparkles className="w-4 h-4 text-yellow-400 animate-pulse" />
                </div>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center space-x-2">
                  <span>{appointment ? 'Edit Appointment' : 'New Appointment'}</span>
                  <Star className="w-5 h-5 text-yellow-500 animate-pulse" />
                </h2>
                <p className="text-gray-500 dark:text-gray-400 flex items-center space-x-2">
                  <Shield className="w-4 h-4 text-green-500" />
                  <span>
                    {appointment
                      ? 'Update appointment details'
                      : 'Schedule a new appointment'}
                  </span>
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-3 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-2xl transition-all duration-200 transform hover:scale-110 hover:rotate-90 group"
            >
              <X className="w-6 h-6 text-gray-600 dark:text-gray-400 group-hover:text-red-500" />
            </button>
          </div>

          {/* Progress indicator */}
          <div className="mt-4 flex items-center space-x-2">
            <div className="flex-1 h-1 bg-gray-200 dark:bg-gray-600 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full animate-pulse" style={{ width: '60%' }} />
            </div>
            <span className="text-xs text-gray-500 dark:text-gray-400">60% Complete</span>
          </div>
        </div>

        {/* Success Animation */}
        {showSuccess && (
          <div className="absolute inset-0 bg-green-500/90 backdrop-blur-sm flex items-center justify-center z-50 rounded-3xl">
            <div className="text-center text-white">
              <CheckCircle className="w-16 h-16 mx-auto mb-4 animate-bounce" />
              <h3 className="text-2xl font-bold mb-2">Success!</h3>
              <p>Appointment {appointment ? 'updated' : 'created'} successfully</p>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Enhanced Patient Selection */}
          <div className="space-y-3">
            <label className="flex items-center space-x-3 text-sm font-semibold text-gray-700 dark:text-gray-300">
              <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                <User className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              </div>
              <span>Patient Selection</span>
              <Sparkles className="w-4 h-4 text-yellow-500 animate-pulse" />
            </label>
            <div className="relative group">
              <select
                value={formData.patientId}
                onChange={(e) =>
                  setFormData({ ...formData, patientId: e.target.value })
                }
                onFocus={() => setFocusedField('patient')}
                onBlur={() => setFocusedField(null)}
                className={`form-input enhanced-select ${
                  errors.patientId ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : ''
                } ${focusedField === 'patient' ? 'ring-4 ring-blue-500/20 border-blue-500' : ''}`}
              >
                <option value="">Select a patient</option>
                {MOCK_PATIENTS.map((patient) => (
                  <option key={patient.id} value={patient.id}>
                    {patient.name} - {patient.phone}
                  </option>
                ))}
              </select>
              
              {/* Enhanced patient info display */}
              {selectedPatient && (
                <div className="mt-3 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-2xl border border-blue-200 dark:border-blue-800 transform transition-all duration-300 hover:scale-105">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-blue-500 rounded-full">
                      <User className="w-4 h-4 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-bold text-blue-800 dark:text-blue-200 flex items-center space-x-2">
                        <span>{selectedPatient.name}</span>
                        <Heart className="w-4 h-4 text-red-500 animate-pulse" />
                      </div>
                      <div className="text-xs text-blue-600 dark:text-blue-300 space-y-1">
                        <div className="flex items-center space-x-2">
                          <span>📞</span>
                          <span>{selectedPatient.phone}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span>✉️</span>
                          <span>{selectedPatient.email}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            {errors.patientId && (
              <p className="text-sm text-red-600 dark:text-red-400 flex items-center space-x-2 animate-shake">
                <Zap className="w-4 h-4" />
                <span>{errors.patientId}</span>
              </p>
            )}
          </div>

          {/* Enhanced Doctor Selection */}
          <div className="space-y-3">
            <label className="flex items-center space-x-3 text-sm font-semibold text-gray-700 dark:text-gray-300">
              <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                <UserCheck className="w-4 h-4 text-green-600 dark:text-green-400" />
              </div>
              <span>Doctor Assignment</span>
              <Star className="w-4 h-4 text-yellow-500 animate-pulse" />
            </label>
            <div className="relative group">
              <select
                value={formData.doctorId}
                onChange={(e) =>
                  setFormData({ ...formData, doctorId: e.target.value })
                }
                onFocus={() => setFocusedField('doctor')}
                onBlur={() => setFocusedField(null)}
                className={`form-input enhanced-select ${
                  errors.doctorId ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : ''
                } ${focusedField === 'doctor' ? 'ring-4 ring-green-500/20 border-green-500' : ''}`}
              >
                <option value="">Select a doctor</option>
                {MOCK_DOCTORS.map((doctor) => (
                  <option key={doctor.id} value={doctor.id}>
                    {doctor.name} - {doctor.specialty}
                  </option>
                ))}
              </select>
              
              {/* Enhanced doctor info display */}
              {selectedDoctor && (
                <div
                  className="mt-3 p-4 rounded-2xl border transform transition-all duration-300 hover:scale-105"
                  style={{ 
                    backgroundColor: selectedDoctor.color + '15',
                    borderColor: selectedDoctor.color + '40'
                  }}
                >
                  <div className="flex items-center space-x-3">
                    <div
                      className="p-3 rounded-full shadow-lg"
                      style={{ backgroundColor: selectedDoctor.color }}
                    >
                      <UserCheck className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <span 
                          className="font-bold text-lg"
                          style={{ color: selectedDoctor.color }}
                        >
                          {selectedDoctor.name}
                        </span>
                        <Sparkles className="w-4 h-4 text-yellow-500 animate-pulse" />
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400 flex items-center space-x-2">
                        <Shield className="w-4 h-4 text-green-500" />
                        <span>{selectedDoctor.specialty}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            {errors.doctorId && (
              <p className="text-sm text-red-600 dark:text-red-400 flex items-center space-x-2 animate-shake">
                <Zap className="w-4 h-4" />
                <span>{errors.doctorId}</span>
              </p>
            )}
          </div>

          {/* Enhanced Date and Time */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <label className="flex items-center space-x-3 text-sm font-semibold text-gray-700 dark:text-gray-300">
                <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                  <CalendarIcon className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                </div>
                <span>Date</span>
              </label>
              <div className="relative">
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) =>
                    setFormData({ ...formData, date: e.target.value })
                  }
                  onFocus={() => setFocusedField('date')}
                  onBlur={() => setFocusedField(null)}
                  className={`form-input ${
                    errors.date ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : ''
                  } ${focusedField === 'date' ? 'ring-4 ring-purple-500/20 border-purple-500' : ''}`}
                />
                <div className="absolute inset-0 rounded-xl border-2 pointer-events-none transition-all duration-300 opacity-0 hover:opacity-100" style={{ borderColor: selectedDoctor?.color || '#8B5CF6' }} />
              </div>
              {errors.date && (
                <p className="text-sm text-red-600 dark:text-red-400 flex items-center space-x-2 animate-shake">
                  <Zap className="w-4 h-4" />
                  <span>{errors.date}</span>
                </p>
              )}
            </div>

            <div className="space-y-3">
              <label className="flex items-center space-x-3 text-sm font-semibold text-gray-700 dark:text-gray-300">
                <div className="p-2 bg-orange-100 dark:bg-orange-900/30 rounded-lg">
                  <Clock className="w-4 h-4 text-orange-600 dark:text-orange-400" />
                </div>
                <span>Time</span>
              </label>
              <div className="relative">
                <select
                  value={formData.time}
                  onChange={(e) =>
                    setFormData({ ...formData, time: e.target.value })
                  }
                  onFocus={() => setFocusedField('time')}
                  onBlur={() => setFocusedField(null)}
                  className={`form-input enhanced-select ${
                    errors.time ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : ''
                  } ${focusedField === 'time' ? 'ring-4 ring-orange-500/20 border-orange-500' : ''}`}
                >
                  <option value="">Select time</option>
                  {generateTimeSlots().map((time) => (
                    <option key={time} value={time}>
                      {time}
                    </option>
                  ))}
                </select>
              </div>
              {errors.time && (
                <p className="text-sm text-red-600 dark:text-red-400 flex items-center space-x-2 animate-shake">
                  <Zap className="w-4 h-4" />
                  <span>{errors.time}</span>
                </p>
              )}
            </div>
          </div>

          {/* Enhanced Notes */}
          <div className="space-y-3">
            <label className="flex items-center space-x-3 text-sm font-semibold text-gray-700 dark:text-gray-300">
              <div className="p-2 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg">
                <FileText className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
              </div>
              <span>Notes (Optional)</span>
              <Sparkles className="w-4 h-4 text-yellow-500 animate-pulse" />
            </label>
            <div className="relative">
              <textarea
                value={formData.notes}
                onChange={(e) =>
                  setFormData({ ...formData, notes: e.target.value })
                }
                onFocus={() => setFocusedField('notes')}
                onBlur={() => setFocusedField(null)}
                rows={4}
                className={`form-input resize-none ${focusedField === 'notes' ? 'ring-4 ring-indigo-500/20 border-indigo-500' : ''}`}
                placeholder="Add any additional notes or special instructions..."
              />
              <div className="absolute bottom-3 right-3 text-xs text-gray-400">
                {formData.notes.length}/500
              </div>
            </div>
          </div>

          {/* Enhanced Action Buttons */}
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0 pt-6 border-t border-gray-200 dark:border-gray-700">
            {/* Enhanced Delete button */}
            <div>
              {appointment && (
                <button
                  type="button"
                  onClick={handleDelete}
                  disabled={isSubmitting}
                  className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 disabled:opacity-50 text-white px-6 py-3 rounded-2xl flex items-center space-x-2 transition-all duration-300 transform hover:scale-105 disabled:transform-none shadow-lg hover:shadow-xl group"
                >
                  <Trash2 className="w-5 h-5 group-hover:animate-bounce" />
                  <span>Delete</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-red-400 to-red-500 opacity-0 group-hover:opacity-20 rounded-2xl transition-opacity duration-300" />
                </button>
              )}
            </div>

            {/* Enhanced Save/Cancel buttons */}
            <div className="flex space-x-4">
              <button
                type="button"
                onClick={onClose}
                disabled={isSubmitting}
                className="btn-secondary disabled:opacity-50 group relative overflow-hidden"
              >
                <span className="relative z-10">Cancel</span>
                <div className="absolute inset-0 bg-gradient-to-r from-gray-400 to-gray-500 opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
              </button>
              
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-primary disabled:opacity-50 disabled:transform-none group relative overflow-hidden"
              >
                {isSubmitting ? (
                  <>
                    <div className="relative flex items-center space-x-2">
                      <div className="spinner-advanced rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                      <div className="absolute inset-0 rounded-full h-5 w-5 border-2 border-blue-300 border-t-transparent animate-spin-slow"></div>
                      <span>{appointment ? 'Updating...' : 'Saving...'}</span>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 animate-shimmer" />
                  </>
                ) : (
                  <>
                    <Save className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform duration-300" />
                    <span>{appointment ? 'Update' : 'Save'} Appointment</span>
                    <Sparkles className="w-4 h-4 ml-2 opacity-0 group-hover:opacity-100 transition-all duration-300 animate-pulse" />
                  </>
                )}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-indigo-400 opacity-0 group-hover:opacity-20 rounded-2xl transition-opacity duration-300" />
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}