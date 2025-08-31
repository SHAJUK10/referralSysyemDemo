import React, { useState } from 'react';
import { User, Eye, Phone, Mail } from 'lucide-react';
import { demoReferrals } from '../../data/demoData';
import { Referral } from '../../types';
import StatusBadge from '../../components/ui/StatusBadge';
import Modal from '../../components/ui/Modal';
import Button from '../../components/ui/Button';

const MyReferrals: React.FC = () => {
  const [referrals] = useState<Referral[]>(demoReferrals.filter(ref => ref.referredBy === 'REF001'));
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedReferral, setSelectedReferral] = useState<Referral | null>(null);

  const filteredReferrals = referrals.filter(referral => 
    statusFilter === 'all' || referral.status === statusFilter
  );

  const getStatusCounts = () => {
    return {
      all: referrals.length,
      'New': referrals.filter(r => r.status === 'New').length,
      'In Progress': referrals.filter(r => r.status === 'In Progress').length,
      'Successful': referrals.filter(r => r.status === 'Successful').length,
      'Rejected': referrals.filter(r => r.status === 'Rejected').length
    };
  };

  const statusCounts = getStatusCounts();

  const handleQuickAction = (action: string, referral: Referral) => {
    // Simulate action
    const toast = document.createElement('div');
    toast.className = 'fixed top-4 right-4 bg-blue-500 text-white px-6 py-3 rounded-lg shadow-lg z-50';
    toast.textContent = `${action} initiated for ${referral.name}`;
    document.body.appendChild(toast);
    
    setTimeout(() => {
      document.body.removeChild(toast);
    }, 3000);
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">My Referrals</h2>
        <p className="text-gray-600 mt-1">Track all your submitted referrals and their status</p>
      </div>

      {/* Status Filter Tabs */}
      <div className="bg-white rounded-lg border border-gray-200 p-1">
        <div className="flex flex-wrap gap-1">
          {Object.entries(statusCounts).map(([status, count]) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                statusFilter === status
                  ? 'bg-indigo-100 text-indigo-700'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              {status === 'all' ? 'All' : status} ({count})
            </button>
          ))}
        </div>
      </div>

      {/* Referrals Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredReferrals.map((referral) => (
          <div key={referral.id} className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                  <User className="w-6 h-6 text-gray-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{referral.name}</h3>
                  <p className="text-sm text-gray-500">{referral.propertyInterest}</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedReferral(referral)}
                className="text-gray-400 hover:text-gray-600 p-1 rounded hover:bg-gray-50"
              >
                <Eye className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Status:</span>
                <StatusBadge status={referral.status} variant="referral" />
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Reward:</span>
                <span className="font-semibold text-gray-900">₹{referral.reward.toLocaleString()}</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Date:</span>
                <span className="text-sm text-gray-900">
                  {new Date(referral.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="flex items-center space-x-2 text-sm text-gray-600 mb-2">
                <Mail className="w-4 h-4" />
                <span className="truncate">{referral.email}</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Phone className="w-4 h-4" />
                <span>{referral.phone}</span>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="mt-4 pt-4 border-t border-gray-200 flex space-x-2">
              <button
                onClick={() => handleQuickAction('Call', referral)}
                className="flex-1 text-xs bg-blue-50 text-blue-700 py-2 px-3 rounded-lg hover:bg-blue-100 transition-colors"
              >
                Call
              </button>
              <button
                onClick={() => handleQuickAction('Email', referral)}
                className="flex-1 text-xs bg-green-50 text-green-700 py-2 px-3 rounded-lg hover:bg-green-100 transition-colors"
              >
                Email
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredReferrals.length === 0 && (
        <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
          <User className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No referrals found</h3>
          <p className="text-gray-600 mb-6">
            {statusFilter === 'all' 
              ? "You haven't made any referrals yet."
              : `No referrals with status "${statusFilter}".`
            }
          </p>
        </div>
      )}

      {/* Referral Details Modal */}
      <Modal
        isOpen={!!selectedReferral}
        onClose={() => setSelectedReferral(null)}
        title="Referral Details"
        size="md"
      >
        {selectedReferral && (
          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
                <User className="w-8 h-8 text-gray-600" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900">{selectedReferral.name}</h3>
                <p className="text-gray-600">{selectedReferral.propertyInterest}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-700">Email</label>
                <p className="text-gray-900">{selectedReferral.email}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Phone</label>
                <p className="text-gray-900">{selectedReferral.phone}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Status</label>
                <div className="mt-1">
                  <StatusBadge status={selectedReferral.status} variant="referral" />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Reward</label>
                <p className="text-gray-900 font-semibold">₹{selectedReferral.reward.toLocaleString()}</p>
              </div>
            </div>

            {selectedReferral.notes && (
              <div>
                <label className="text-sm font-medium text-gray-700">Notes</label>
                <p className="text-gray-900 mt-1">{selectedReferral.notes}</p>
              </div>
            )}

            <div>
              <label className="text-sm font-medium text-gray-700">Submission Date</label>
              <p className="text-gray-900">{new Date(selectedReferral.createdAt).toLocaleString()}</p>
            </div>

            <div className="flex space-x-3 pt-4 border-t border-gray-200">
              <Button
                variant="outline"
                size="sm"
                icon={Phone}
                onClick={() => handleQuickAction('Call', selectedReferral)}
              >
                Call Customer
              </Button>
              <Button
                variant="outline"
                size="sm"
                icon={Mail}
                onClick={() => handleQuickAction('Email', selectedReferral)}
              >
                Send Email
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default MyReferrals;