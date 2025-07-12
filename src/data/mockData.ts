import { Patient, Doctor } from '../types';

export const MOCK_PATIENTS: Patient[] = [
  {
    id: '1',
    name: 'John Smith',
    phone: '(555) 123-4567',
    email: 'john@email.com',
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    phone: '(555) 234-5678',
    email: 'sarah@email.com',
  },
  {
    id: '3',
    name: 'Michael Brown',
    phone: '(555) 345-6789',
    email: 'michael@email.com',
  },
  {
    id: '4',
    name: 'Emma Davis',
    phone: '(555) 456-7890',
    email: 'emma@email.com',
  },
  {
    id: '5',
    name: 'David Wilson',
    phone: '(555) 567-8901',
    email: 'david@email.com',
  },
  {
    id: '6',
    name: 'Lisa Garcia',
    phone: '(555) 678-9012',
    email: 'lisa@email.com',
  },
  {
    id: '7',
    name: 'Robert Miller',
    phone: '(555) 789-0123',
    email: 'robert@email.com',
  },
  {
    id: '8',
    name: 'Jennifer Martinez',
    phone: '(555) 890-1234',
    email: 'jennifer@email.com',
  },
  {
    id: '9',
    name: 'Christopher Taylor',
    phone: '(555) 901-2345',
    email: 'chris@email.com',
  },
  {
    id: '10',
    name: 'Amanda Anderson',
    phone: '(555) 012-3456',
    email: 'amanda@email.com',
  },
];

export const MOCK_DOCTORS: Doctor[] = [
  {
    id: '1',
    name: 'Dr. Sarah Williams',
    specialty: 'Cardiology',
    color: '#3B82F6',
  },
  {
    id: '2',
    name: 'Dr. James Chen',
    specialty: 'Pediatrics',
    color: '#14B8A6',
  },
  {
    id: '3',
    name: 'Dr. Maria Rodriguez',
    specialty: 'Dermatology',
    color: '#F59E0B',
  },
  {
    id: '4',
    name: 'Dr. Robert Kim',
    specialty: 'Orthopedics',
    color: '#8B5CF6',
  },
  {
    id: '5',
    name: 'Dr. Lisa Thompson',
    specialty: 'Neurology',
    color: '#EF4444',
  },
  {
    id: '6',
    name: 'Dr. David Park',
    specialty: 'Gastroenterology',
    color: '#10B981',
  },
];

export const MOCK_CREDENTIALS = {
  email: 'staff@clinic.com',
  password: '123456',
};
