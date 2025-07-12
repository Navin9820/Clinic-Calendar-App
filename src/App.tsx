import React, { useState } from 'react';
import { LoginForm } from './components/LoginForm';
import { CalendarHeader } from './components/CalendarHeader';
import { CalendarGrid } from './components/CalendarGrid';
import { MobileCalendar } from './components/MobileCalendar';
import { AppointmentForm } from './components/AppointmentForm';
import { useAppointments } from './hooks/useAppointments';
import { useLocalStorage } from './hooks/useLocalStorage';
import { User, Appointment } from './types';

function App() {
  const [user, setUser] = useLocalStorage<User | null>('clinic-user', null);
  const [darkMode, setDarkMode] = useLocalStorage<boolean>('dark-mode', false);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [showAppointmentForm, setShowAppointmentForm] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState<
    Appointment | undefined
  >();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  const {
    selectedDate,
    setSelectedDate,
    filters,
    setFilters,
    addAppointment,
    updateAppointment,
    deleteAppointment,
    getAppointmentsForDate,
    getAppointmentsForMonth,
  } = useAppointments();

  React.useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  React.useEffect(() => {
    // Enhanced dark mode implementation
    const root = document.documentElement;
    const body = document.body;

    if (darkMode) {
      root.classList.add('dark');
      body.classList.add('dark');
      root.style.colorScheme = 'dark';
    } else {
      root.classList.remove('dark');
      body.classList.remove('dark');
      root.style.colorScheme = 'light';
    }

    // Force a repaint to ensure smooth transition
    requestAnimationFrame(() => {
      root.offsetHeight;
    });
  }, [darkMode]);

  const handleLogin = (userData: User) => {
    setUser(userData);
  };

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      setUser(null);
      // Clear any sensitive data
      localStorage.removeItem('clinic-user');
      // Reset to current date
      setCurrentDate(new Date());
      setSelectedDate(new Date().toISOString().split('T')[0]);
      // Close any open forms
      setShowAppointmentForm(false);
      setSelectedAppointment(undefined);
    }
  };

  const handlePrevMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
    );
  };

  const handleNextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
    );
  };

  const handleDayClick = (date: string) => {
    setSelectedDate(date);
    setSelectedAppointment(undefined);
    setShowAppointmentForm(true);
  };

  const handleAppointmentClick = (appointment: Appointment) => {
    setSelectedAppointment(appointment);
    setShowAppointmentForm(true);
  };

  const handleAddAppointment = () => {
    setSelectedAppointment(undefined);
    setShowAppointmentForm(true);
  };

  const handleFormClose = () => {
    setShowAppointmentForm(false);
    setSelectedAppointment(undefined);
  };

  if (!user) {
    return <LoginForm onLogin={handleLogin} />;
  }

  const monthAppointments = getAppointmentsForMonth(
    currentDate.getFullYear(),
    currentDate.getMonth()
  );
  const dayAppointments = getAppointmentsForDate(selectedDate);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-all duration-300 page-transition">
      <CalendarHeader
        currentDate={currentDate}
        onPrevMonth={handlePrevMonth}
        onNextMonth={handleNextMonth}
        filters={filters}
        onFilterChange={setFilters}
        darkMode={darkMode}
        onToggleDarkMode={() => setDarkMode(!darkMode)}
        user={user}
        onLogout={handleLogout}
      />

      <div className="p-4 md:p-6">
        {isMobile ? (
          <MobileCalendar
            selectedDate={selectedDate}
            onDateChange={setSelectedDate}
            appointments={dayAppointments}
            onAddAppointment={handleAddAppointment}
            onAppointmentClick={handleAppointmentClick}
          />
        ) : (
          <CalendarGrid
            currentDate={currentDate}
            appointments={monthAppointments}
            onDayClick={handleDayClick}
            onAppointmentClick={handleAppointmentClick}
          />
        )}
      </div>

      {showAppointmentForm && (
        <AppointmentForm
          appointment={selectedAppointment}
          selectedDate={selectedDate}
          onSave={addAppointment}
          onUpdate={updateAppointment}
          onDelete={deleteAppointment}
          onClose={handleFormClose}
        />
      )}
    </div>
  );
}

export default App;
