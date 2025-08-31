import React, { useState } from 'react';
import { Gift, DollarSign, CheckCircle, Clock, User, Filter } from 'lucide-react';
import { demoRewards } from '../../data/demoData';
import { Reward } from '../../types';
import Button from '../../components/ui/Button';
import StatusBadge from '../../components/ui/StatusBadge';

const RewardsManagement: React.FC = () => {
  const [rewards, setRewards] = useState<Reward[]>(demoRewards);
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredRewards = rewards.filter(reward => 
    statusFilter === 'all' || reward.status === statusFilter
  );

  const handleStatusChange = (rewardId: string, newStatus: Reward['status']) => {
    setRewards(prev => prev.map(reward => 
      reward.id === rewardId 
        ? { ...reward, status: newStatus, paidAt: newStatus === 'Paid' ? new Date().toISOString() : undefined }
        : reward
    ));

    const toast = document.createElement('div');
    toast.className = 'fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50';
    toast.textContent = `Reward status updated to ${newStatus}`;
    document.body.appendChild(toast);
    
    setTimeout(() => {
      document.body.removeChild(toast);
    }, 3000);
  };

  const totalRewards = rewards.reduce((sum, reward) => sum + reward.amount, 0);
  const paidRewards = rewards.filter(r => r.status === 'Paid').reduce((sum, reward) => sum + reward.amount, 0);
  const pendingRewards = rewards.filter(r => r.status === 'Pending').reduce((sum, reward) => sum + reward.amount, 0);

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Rewards Management</h1>
          <p className="text-gray-600 mt-1">Manage referral rewards and payouts</p>
        </div>
        <Button variant="primary">
          Process Payouts
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Rewards</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">₹{totalRewards.toLocaleString()}</p>
            </div>
            <div className="w-12 h-12 bg-indigo-50 rounded-lg flex items-center justify-center">
              <Gift className="w-6 h-6 text-indigo-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Paid Out</p>
              <p className="text-3xl font-bold text-green-600 mt-2">₹{paidRewards.toLocaleString()}</p>
            </div>
            <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Pending</p>
              <p className="text-3xl font-bold text-yellow-600 mt-2">₹{pendingRewards.toLocaleString()}</p>
            </div>
            <div className="w-12 h-12 bg-yellow-50 rounded-lg flex items-center justify-center">
              <Clock className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="flex items-center space-x-4">
          <Filter className="w-5 h-5 text-gray-400" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="all">All Rewards</option>
            <option value="Pending">Pending</option>
            <option value="Approved">Approved</option>
            <option value="Paid">Paid</option>
          </select>
        </div>
      </div>

      {/* Rewards Table */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Reward Transactions</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Referral ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Created
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredRewards.map((reward) => (
                <tr key={reward.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {reward.referralId}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    ₹{reward.amount.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <select
                      value={reward.status}
                      onChange={(e) => handleStatusChange(reward.id, e.target.value as Reward['status'])}
                      className="text-sm border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    >
                      <option value="Pending">Pending</option>
                      <option value="Approved">Approved</option>
                      <option value="Paid">Paid</option>
                    </select>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(reward.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    {reward.status === 'Pending' && (
                      <Button
                        variant="success"
                        size="sm"
                        onClick={() => handleStatusChange(reward.id, 'Approved')}
                      >
                        Approve
                      </Button>
                    )}
                    {reward.status === 'Approved' && (
                      <Button
                        variant="primary"
                        size="sm"
                        onClick={() => handleStatusChange(reward.id, 'Paid')}
                      >
                        Mark Paid
                      </Button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default RewardsManagement;