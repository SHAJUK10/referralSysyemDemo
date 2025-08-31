import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { UserPlus, Users, TrendingUp, Wallet, Bell } from 'lucide-react';
import AddReferral from './AddReferral';
import MyReferrals from './MyReferrals';
import PerformanceMetrics from './PerformanceMetrics';
import ReferrerWallet from './ReferrerWallet';
import ReferrerNotifications from './ReferrerNotifications';

const ReferrerDashboard: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'overview' | 'add-referral' | 'referrals' | 'performance' | 'wallet' | 'notifications'>('overview');

  const stats = {
    totalReferrals: 12,
    successfulReferrals: 3,
    pendingReferrals: 4,
    totalEarnings: 25000,
    thisMonthEarnings: 8000
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'add-referral':
        return <AddReferral />;
      case 'referrals':
        return <MyReferrals />;
      case 'performance':
        return <PerformanceMetrics />;
      case 'wallet':
        return <ReferrerWallet />;
      case 'notifications':
        return <ReferrerNotifications />;
      default:
        return (
          <div className="space-y-6">
            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Referrals</p>
                    <p className="text-3xl font-bold text-gray-900 mt-2">{stats.totalReferrals}</p>
                  </div>
                  <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
                    <Users className="w-6 h-6 text-blue-600" />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Successful</p>
                    <p className="text-3xl font-bold text-gray-900 mt-2">{stats.successfulReferrals}</p>
                  </div>
                  <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-green-600" />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Earnings</p>
                    <p className="text-3xl font-bold text-gray-900 mt-2">₹{stats.totalEarnings.toLocaleString()}</p>
                  </div>
                  <div className="w-12 h-12 bg-indigo-50 rounded-lg flex items-center justify-center">
                    <Wallet className="w-6 h-6 text-indigo-600" />
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <button
                  onClick={() => setActiveTab('add-referral')}
                  className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left"
                >
                  <UserPlus className="w-8 h-8 text-blue-600 mb-2" />
                  <h4 className="font-medium text-gray-900">Add Referral</h4>
                  <p className="text-sm text-gray-600">Submit a new customer</p>
                </button>

                <button
                  onClick={() => setActiveTab('referrals')}
                  className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left"
                >
                  <Users className="w-8 h-8 text-green-600 mb-2" />
                  <h4 className="font-medium text-gray-900">My Referrals</h4>
                  <p className="text-sm text-gray-600">View all referrals</p>
                </button>

                <button
                  onClick={() => setActiveTab('performance')}
                  className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left"
                >
                  <TrendingUp className="w-8 h-8 text-purple-600 mb-2" />
                  <h4 className="font-medium text-gray-900">Performance</h4>
                  <p className="text-sm text-gray-600">View metrics</p>
                </button>

                <button
                  onClick={() => setActiveTab('wallet')}
                  className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left"
                >
                  <Wallet className="w-8 h-8 text-indigo-600 mb-2" />
                  <h4 className="font-medium text-gray-900">Wallet</h4>
                  <p className="text-sm text-gray-600">View earnings</p>
                </button>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
              <div className="space-y-4">
                {[
                  { action: 'New referral submitted', details: 'Raj Patel - 4BHK Penthouse', time: '2 hours ago', color: 'text-blue-600' },
                  { action: 'Reward earned', details: 'John Doe referral - ₹5,000', time: '1 day ago', color: 'text-green-600' },
                  { action: 'Referral approved', details: 'Ankit Sharma - In Progress', time: '2 days ago', color: 'text-yellow-600' },
                  { action: 'Payment received', details: '₹3,000 transferred to wallet', time: '3 days ago', color: 'text-indigo-600' }
                ].map((activity, index) => (
                  <div key={index} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
                    <div>
                      <p className="font-medium text-gray-900">{activity.action}</p>
                      <p className="text-sm text-gray-500">{activity.details}</p>
                    </div>
                    <span className={`text-xs font-medium ${activity.color}`}>
                      {activity.time}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Message */}
        <div className="bg-gradient-to-r from-indigo-50 to-blue-50 rounded-xl p-6 mb-8 border border-indigo-200">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Welcome, {user?.name}!</h1>
          <p className="text-gray-700">
            Manage your referrals, track performance, and grow your earnings with our comprehensive referral system.
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="border-b border-gray-200 mb-8 bg-white rounded-t-xl shadow-sm">
          <nav className="flex space-x-8 overflow-x-auto">
            {[
              { key: 'overview', label: 'Dashboard Overview' },
              { key: 'add-referral', label: 'Add Referral' },
              { key: 'referrals', label: 'My Referrals' },
              { key: 'performance', label: 'Performance' },
              { key: 'wallet', label: 'Wallet' },
              { key: 'notifications', label: 'Notifications' }
            ].map(({ key, label }) => (
              <button
                key={key}
                onClick={() => setActiveTab(key as any)}
                className={`py-4 px-6 border-b-2 font-semibold text-sm transition-colors duration-200 whitespace-nowrap ${
                  activeTab === key
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {label}
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="bg-white rounded-b-xl shadow-sm min-h-96">
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
};

export default ReferrerDashboard;