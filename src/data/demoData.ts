import { Lead, Referral, Reward, Notification } from '../types';

export const demoLeads: Lead[] = [
  {
    id: '1',
    name: 'Rohit Kumar',
    email: 'rohit@email.com',
    phone: '+91-9876543210',
    source: 'Referral',
    status: 'Meeting',
    createdAt: '2024-01-15T10:30:00Z',
    assignedTo: 'Admin',
    notes: 'Interested in 2BHK apartment'
  },
  {
    id: '2',
    name: 'Meena Patel',
    email: 'meena@email.com',
    phone: '+91-9876543211',
    source: 'Phone Call',
    status: 'Negotiation',
    createdAt: '2024-01-14T14:20:00Z',
    assignedTo: 'Admin',
    notes: 'Looking for investment property'
  },
  {
    id: '3',
    name: 'Alok Singh',
    email: 'alok@email.com',
    phone: '+91-9876543212',
    source: 'Website',
    status: 'Closed',
    createdAt: '2024-01-10T09:15:00Z',
    assignedTo: 'Admin',
    notes: 'Purchased 3BHK villa'
  },
  {
    id: '4',
    name: 'Priya Sharma',
    email: 'priya@email.com',
    phone: '+91-9876543213',
    source: 'Walk-in',
    status: 'Contacted',
    createdAt: '2024-01-16T11:45:00Z',
    assignedTo: 'Admin',
    notes: 'First-time buyer'
  },
  {
    id: '5',
    name: 'Vikram Rao',
    email: 'vikram@email.com',
    phone: '+91-9876543214',
    source: 'Referral',
    status: 'Visited',
    createdAt: '2024-01-12T16:30:00Z',
    assignedTo: 'Admin',
    notes: 'Impressed with project amenities'
  }
];

export const demoReferrals: Referral[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@email.com',
    phone: '+91-9876543220',
    propertyInterest: '2BHK Apartment',
    status: 'Successful',
    referredBy: 'REF001',
    reward: 5000,
    createdAt: '2024-01-10T10:30:00Z',
    notes: 'Deal closed successfully'
  },
  {
    id: '2',
    name: 'Ankit Sharma',
    email: 'ankit@email.com',
    phone: '+91-9876543221',
    propertyInterest: '3BHK Villa',
    status: 'In Progress',
    referredBy: 'REF001',
    reward: 0,
    createdAt: '2024-01-14T14:20:00Z',
    notes: 'Visit scheduled for next week'
  },
  {
    id: '3',
    name: 'Kavya Nair',
    email: 'kavya@email.com',
    phone: '+91-9876543222',
    propertyInterest: '1BHK Studio',
    status: 'Rejected',
    referredBy: 'REF002',
    reward: 0,
    createdAt: '2024-01-08T09:15:00Z',
    notes: 'Not qualified for loan'
  },
  {
    id: '4',
    name: 'Raj Patel',
    email: 'raj@email.com',
    phone: '+91-9876543223',
    propertyInterest: '4BHK Penthouse',
    status: 'New',
    referredBy: 'REF001',
    reward: 0,
    createdAt: '2024-01-16T12:00:00Z',
    notes: 'High-value prospect'
  }
];

export const demoRewards: Reward[] = [
  {
    id: '1',
    referralId: '1',
    amount: 5000,
    status: 'Paid',
    createdAt: '2024-01-10T10:30:00Z',
    paidAt: '2024-01-15T10:30:00Z'
  },
  {
    id: '2',
    referralId: '2',
    amount: 3000,
    status: 'Pending',
    createdAt: '2024-01-14T14:20:00Z'
  }
];

export const demoNotifications: Notification[] = [
  {
    id: '1',
    title: 'New Referral Received',
    message: 'John Doe has been referred by REF001',
    type: 'info',
    read: false,
    createdAt: '2024-01-16T12:00:00Z'
  },
  {
    id: '2',
    title: 'Reward Approved',
    message: 'Your reward of ₹5,000 has been approved',
    type: 'success',
    read: false,
    createdAt: '2024-01-15T10:30:00Z'
  },
  {
    id: '3',
    title: 'Meeting Reminder',
    message: 'Meeting with Meena Patel scheduled for tomorrow',
    type: 'warning',
    read: true,
    createdAt: '2024-01-14T14:20:00Z'
  }
];

export const chartData = {
  monthlyLeads: [
    { month: 'Jan', leads: 45, conversions: 12 },
    { month: 'Feb', leads: 52, conversions: 15 },
    { month: 'Mar', leads: 38, conversions: 8 },
    { month: 'Apr', leads: 63, conversions: 18 },
    { month: 'May', leads: 71, conversions: 22 },
    { month: 'Jun', leads: 58, conversions: 16 }
  ],
  leadSources: [
    { name: 'Referral', value: 35, color: '#10B981' },
    { name: 'Website', value: 28, color: '#3B82F6' },
    { name: 'Phone Call', value: 22, color: '#F59E0B' },
    { name: 'Walk-in', value: 15, color: '#EF4444' }
  ],
  conversionFunnel: [
    { stage: 'Leads', count: 120 },
    { stage: 'Contacted', count: 85 },
    { stage: 'Visited', count: 40 },
    { stage: 'Negotiation', count: 25 },
    { stage: 'Closed', count: 12 }
  ]
};