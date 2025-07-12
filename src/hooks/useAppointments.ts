import { useState, useCallback } from 'react';
import { Appointment } from '../types';
import { useLocalStorage } from './useLocalStorage';

export function useAppointments() {
  const [appointments, setAppointments] = useLocalStorage<Appointment[]>(
    'clinic-appointments',
    []
  );
  const [selectedDate, setSelectedDate] = useState<string>(
    new Date().toISOString().split('T')[0]
  );
  const [filters, setFilters] = useState({
    doctor: '',
    patient: '',
  });

  const addAppointment = useCallback(
    (appointment: Omit<Appointment, 'id'>) => {
      const newAppointment: Appointment = {
        ...appointment,
        id: Date.now().toString(),
      };
      setAppointments((prev) => [...prev, newAppointment]);
    },
    [setAppointments]
  );

  const updateAppointment = useCallback(
    (id: string, updates: Partial<Appointment>) => {
      setAppointments((prev) =>
        prev.map((apt) => (apt.id === id ? { ...apt, ...updates } : apt))
      );
    },
    [setAppointments]
  );

  const deleteAppointment = useCallback(
    (id: string) => {
      setAppointments((prev) => prev.filter((apt) => apt.id !== id));
    },
    [setAppointments]
  );

  const getAppointmentsForDate = useCallback(
    (date: string) => {
      return appointments.filter((apt) => {
        const matchesDate = apt.date === date;
        const matchesDoctor =
          !filters.doctor || apt.doctorId === filters.doctor;
        const matchesPatient =
          !filters.patient || apt.patientId === filters.patient;
        return matchesDate && matchesDoctor && matchesPatient;
      });
    },
    [appointments, filters]
  );

  const getAppointmentsForMonth = useCallback(
    (year: number, month: number) => {
      return appointments.filter((apt) => {
        const aptDate = new Date(apt.date);
        const matchesMonth =
          aptDate.getFullYear() === year && aptDate.getMonth() === month;
        const matchesDoctor =
          !filters.doctor || apt.doctorId === filters.doctor;
        const matchesPatient =
          !filters.patient || apt.patientId === filters.patient;
        return matchesMonth && matchesDoctor && matchesPatient;
      });
    },
    [appointments, filters]
  );

  return {
    appointments,
    selectedDate,
    setSelectedDate,
    filters,
    setFilters,
    addAppointment,
    updateAppointment,
    deleteAppointment,
    getAppointmentsForDate,
    getAppointmentsForMonth,
  };
}
