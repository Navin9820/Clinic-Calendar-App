# Clinic Staff Appointemnt Calendar Application 
# Introduction

An interactive and responsive calendar application designed for clinic staff to manage patient appointments. Built with a modern tech stack including React, Vite, TypeScript, and Tailwind CSS, this project provides a clean, fast, and intuitive user interface.

# ✨ Features

Interactive Calendar: A full-screen monthly grid view and a responsive daily view for mobile devices.
Appointment Management: Easily create, view, edit, and delete appointments.
Dynamic Filtering: Filter appointments by doctor or patient in real-time.
Secure Authentication: A complete login system with mock credentials for demonstration purposes.
Responsive Design: A seamless experience on both desktop and mobile devices, thanks to custom hooks that adapt the layout.
Theming: Switch between light and dark modes.
Toast Notifications: User-friendly feedback for actions like creating or updating appointments.

# 🛠️ Tech Stack

Framework: React
Build Tool: Vite
Language: TypeScript
Styling: Tailwind CSS
UI Components: Built with lucide-react for icons.
State Management: React Context API for both app state and authentication.
Linting & Formatting: ESLint.

# 🚀 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine.

# Prerequisites

You need to have Node.js (version 18 or higher) and npm installed on your computer.

# Installation:

# Clone the repository:

git clone https://github.com/your-username/clinic-calendar-app.git
cd clinic-calendar-app

# Install dependencies:

npm install

# Running the Application

To start the development server, run:
npm run dev

# Demo Credentials

You can use the following mock credentials to log in and test the application:

Email: staff@clinic.com
Password: 123456

# 📜 Available Scripts

In the project directory, you can run the following commands:

            Command                         Description

            npm run dev               Runs the app in development mode with hot-reloading.
            npm run build             Builds the app for production.
            npm run lint              Lints the codebase using ESLint.
            npm run preview           Serves the production build locally for preview.

# 📂 Project Structure

The project follows a standard Vite + React structure, with key directories organized as follows:

/src
├── components/       # Reusable UI components
│   ├── AppointmentForm.tsx
│   ├── CalendarGrid.tsx
│   ├── CalendarHeader.tsx
│   ├── LoginForm.tsx
│   └── MobileCalendar.tsx

├── data/             # Mock data for patients and doctors
│   └── mockData.ts

├── hooks/            # Custom React hooks
│   ├── useAppointments.ts
│   └── useLocalStorage.ts

├── types.ts          # TypeScript type definitions

├── App.tsx           # Main application component

└── main.tsx          # Application entry point
