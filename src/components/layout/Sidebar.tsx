import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  CheckCircle, 
  Gift, 
  BarChart3, 
  Bell,
  UserPlus,
  TrendingUp,
  Wallet,
  Calendar,
  MessageCircle,
  User
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const Sidebar: React.FC = () => {
  const { user } = useAuth();

  const getNavigationItems = () => {
    switch (user?.role) {
      case 'admin':
        return [
          { to: '/admin', icon: LayoutDashboard, label: 'Dashboard' },
          { to: '/admin/leads', icon: Users, label: 'Lead Management' },
          { to: '/admin/referrals', icon: CheckCircle, label: 'Referral Approvals' },
          { to: '/admin/rewards', icon: Gift, label: 'Rewards Management' },
          { to: '/admin/analytics', icon: BarChart3, label: 'Analytics' },
          { to: '/admin/notifications', icon: Bell, label: 'Notifications' }
        ];
      case 'referrer':
        return [
          { to: '/referrer', icon: LayoutDashboard, label: 'Dashboard' },
        ];
      case 'referee':
        return [
          { to: '/referee', icon: LayoutDashboard, label: 'Dashboard' },
          { to: '/referee/status', icon: CheckCircle, label: 'My Status' },
          { to: '/referee/schedule', icon: Calendar, label: 'Schedule Visit' },
          { to: '/referee/callback', icon: MessageCircle, label: 'Request Callback' },
          { to: '/referee/messages', icon: MessageCircle, label: 'Messages' },
          { to: '/referee/profile', icon: User, label: 'Profile' }
        ];
      default:
        return [];
    }
  };

  const navigationItems = getNavigationItems();

  return (
    <aside className="bg-white border-r border-gray-200 w-64 flex-shrink-0 overflow-y-auto">
      <div className="p-6">
        <div className="flex items-center space-x-2 mb-8">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
            <LayoutDashboard className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold text-gray-900">RealEstate CRM</span>
        </div>
        
        <nav className="space-y-2">
          {navigationItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive
                    ? 'bg-indigo-50 text-indigo-700 border-r-2 border-indigo-700'
                    : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                }`
              }
            >
              <item.icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </NavLink>
          ))}
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;