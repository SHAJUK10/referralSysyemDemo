export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'referrer' | 'referee';
  phone?: string;
  avatar?: string;
}

export interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  source: 'Phone Call' | 'Referral' | 'Website' | 'Walk-in';
  status: 'New' | 'Contacted' | 'Meeting' | 'Visited' | 'Negotiation' | 'Closed';
  createdAt: string;
  assignedTo?: string;
  notes?: string;
}

export interface Referral {
  id: string;
  name: string;
  email: string;
  phone: string;
  propertyInterest: string;
  status: 'New' | 'In Progress' | 'Successful' | 'Rejected';
  referredBy: string;
  reward: number;
  createdAt: string;
  notes?: string;
}

export interface Reward {
  id: string;
  referralId: string;
  amount: number;
  status: 'Pending' | 'Approved' | 'Paid';
  createdAt: string;
  paidAt?: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  read: boolean;
  createdAt: string;
}