import React, { useState, useEffect } from 'react';
import { X, Save, Trash2, Clock, User, UserCheck, FileText, Calendar as CalendarIcon } from 'lucide-react';
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
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800));

    if (appointment) {
      onUpdate(appointment.id, formData);
    } else {
      onSave(formData);
    }
    
    setIsSubmitting(false);
    onClose();
  };

  const handleDelete = async () => {
    if (appointment && window.confirm('Are you sure you want to delete this appointment? This action cannot be undone.')) {
      setIsSubmitting(true);
      await new Promise(resolve => setTimeout(resolve, 500));
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

  const selectedDoctor = MOCK_DOCTORS.find(doc => doc.id === formData.doctorId);
  const selectedPatient = MOCK_PATIENTS.find(pat => pat.id === formData.patientId);

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50 modal-overlay">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto modal-content">
        {/* Header */}
        <div className="relative p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className={`p-3 rounded-xl ${appointment ? 'bg-blue-100 dark:bg-blue-900/30' : 'bg-green-100 dark:bg-green-900/30'}`}>
                <CalendarIcon className={`w-6 h-6 ${appointment ? 'text-blue-600 dark:text-blue-400' : 'text-green-600 dark:text-green-400'}`} />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {appointment ? 'Edit Appointment' : 'New Appointment'}
                </h2>
                <p className="text-gray-500 dark:text-gray-400">
                  {appointment ? 'Update appointment details' : 'Schedule a new appointment'}
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl transition-all duration-200 transform hover:scale-105"
            >
              <X className="w-6 h-6 text-gray-600 dark:text-gray-400" />
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Patient Selection */}
          <div className="space-y-2">
            <label className="flex items-center space-x-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
              <User className="w-4 h-4" />
              <span>Patient</span>
            </label>
            <div className="relative">
              <select
                value={formData.patientId}
                onChange={(e) => setFormData({ ...formData, patientId: e.target.value })}
                className={`form-input ${errors.patientId ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : ''}`}
              >
                <option value="">Select a patient</option>
                {MOCK_PATIENTS.map(patient => (
                  <option key={patient.id} value={patient.id}>
                    {patient.name} - {patient.phone}
                  </option>
                ))}
              </select>
              {selectedPatient && (
                <div className="mt-2 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <div className="text-sm text-blue-800 dark:text-blue-200">
                    <strong>{selectedPatient.name}</strong><br />
                    📞 {selectedPatient.phone}<br />
                    ✉️ {selectedPatient.email}
                  </div>
                </div>
              )}
            </div>
            {errors.patientId && (
              <p className="text-sm text-red-600 dark:text-red-400 flex items-center space-x-1">
                <span>⚠️</span>
                <span>{errors.patientId}</span>
              </p>
            )}
          </div>

          {/* Doctor Selection */}
          <div className="space-y-2">
            <label className="flex items-center space-x-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
              <UserCheck className="w-4 h-4" />
              <span>Doctor</span>
            </label>
            <div className="relative">
              <select
                value={formData.doctorId}
                onChange={(e) => setFormData({ ...formData, doctorId: e.target.value })}
                className={`form-input ${errors.doctorId ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : ''}`}
              >
                <option value="">Select a doctor</option>
                {MOCK_DOCTORS.map(doctor => (
                  <option key={doctor.id} value={doctor.id}>
                    {doctor.name} - {doctor.specialty}
                  </option>
                ))}
              </select>
              {selectedDoctor && (
                <div className="mt-2 p-3 rounded-lg" style={{ backgroundColor: selectedDoctor.color + '15' }}>
                  <div className="flex items-center space-x-3">
                    <div 
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: selectedDoctor.color }}
                    />
                    <div className="text-sm">
                      <strong style={{ color: selectedDoctor.color }}>{selectedDoctor.name}</strong><br />
                      <span className="text-gray-600 dark:text-gray-400">{selectedDoctor.specialty}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
            {errors.doctorId && (
              <p className="text-sm text-red-600 dark:text-red-400 flex items-center space-x-1">
                <span>⚠️</span>
                <span>{errors.doctorId}</span>
              </p>
            )}
          </div>

          {/* Date and Time */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="flex items-center space-x-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
                <CalendarIcon className="w-4 h-4" />
                <span>Date</span>
              </label>
              <input
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className={`form-input ${errors.date ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : ''}`}
              />
              {errors.date && (
                <p className="text-sm text-red-600 dark:text-red-400 flex items-center space-x-1">
                  <span>⚠️</span>
                  <span>{errors.date}</span>
                </p>
              )}
            </div>

            <div className="space-y-2">
              <label className="flex items-center space-x-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
                <Clock className="w-4 h-4" />
                <span>Time</span>
              </label>
              <select
                value={formData.time}
                onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                className={`form-input ${errors.time ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : ''}`}
              >
                <option value="">Select time</option>
                {generateTimeSlots().map(time => (
                  <option key={time} value={time}>
                    {time}
                  </option>
                ))}
              </select>
              {errors.time && (
                <p className="text-sm text-red-600 dark:text-red-400 flex items-center space-x-1">
                  <span>⚠️</span>
                  <span>{errors.time}</span>
                </p>
              )}
            </div>
          </div>

          {/* Notes */}
          <div className="space-y-2">
            <label className="flex items-center space-x-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
              <FileText className="w-4 h-4" />
              <span>Notes (Optional)</span>
            </label>
            <textarea
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              rows={4}
              className="form-input resize-none"
              placeholder="Add any additional notes or special instructions..."
            />
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-3 sm:space-y-0 pt-6 border-t border-gray-200 dark:border-gray-700">
            {/* Delete button */}
            <div>
              {appointment && (
                <button
                  type="button"
                  onClick={handleDelete}
                  disabled={isSubmitting}
                  className="bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white px-6 py-3 rounded-xl flex items-center space-x-2 transition-all duration-200 transform hover:scale-105 disabled:transform-none"
                >
                  <Trash2 className="w-5 h-5" />
                  <span>Delete</span>
                </button>
              )}
            </div>
            
            {/* Save/Cancel buttons */}
            <div className="flex space-x-3">
              <button
                type="button"
                onClick={onClose}
                disabled={isSubmitting}
                className="btn-secondary disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-primary disabled:opacity-50 disabled:transform-none"
              >
                {isSubmitting ? (
                  <>
                    <div className="spinner rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    <span>{appointment ? 'Updating...' : 'Saving...'}</span>
                  </>
                ) : (
                  <>
                    <Save className="w-5 h-5 mr-2" />
                    <span>{appointment ? 'Update' : 'Save'} Appointment</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}