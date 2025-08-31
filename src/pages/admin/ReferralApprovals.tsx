import React, { useState } from 'react';
import { CheckCircle, XCircle, Clock, User } from 'lucide-react';
import { demoReferrals } from '../../data/demoData';
import { Referral } from '../../types';
import StatusBadge from '../../components/ui/StatusBadge';
import Button from '../../components/ui/Button';

const ReferralApprovals: React.FC = () => {
  const [referrals, setReferrals] = useState<Referral[]>(demoReferrals);

  const handleApproval = (referralId: string, approved: boolean) => {
    setReferrals(prev => prev.map(referral => 
      referral.id === referralId 
        ? { 
            ...referral, 
            status: approved ? 'In Progress' : 'Rejected',
            reward: approved ? 3000 : 0
          } 
        : referral
    ));

    // Show success toast
    const toast = document.createElement('div');
    toast.className = `fixed top-4 right-4 ${approved ? 'bg-green-500' : 'bg-red-500'} text-white px-6 py-3 rounded-lg shadow-lg z-50`;
    toast.textContent = `Referral ${approved ? 'approved' : 'rejected'} successfully!`;
    document.body.appendChild(toast);
    
    setTimeout(() => {
      document.body.removeChild(toast);
    }, 3000);
  };

  const pendingReferrals = referrals.filter(ref => ref.status === 'New');
  const approvedReferrals = referrals.filter(ref => ref.status !== 'New');

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Referral Management</h1>
        <p className="text-gray-600 mt-1">Review and approve incoming referrals</p>
      </div>

      {/* Pending Approvals */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200 flex items-center">
          <Clock className="w-5 h-5 text-yellow-500 mr-2" />
          <h3 className="text-lg font-semibold text-gray-900">
            Pending Approvals ({pendingReferrals.length})
          </h3>
        </div>
        
        {pendingReferrals.length === 0 ? (
          <div className="p-8 text-center">
            <CheckCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">No pending referrals to review</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {pendingReferrals.map((referral) => (
              <div key={referral.id} className="p-6">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                        <User className="w-5 h-5 text-gray-600" />
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold text-gray-900">{referral.name}</h4>
                        <p className="text-sm text-gray-500">Referred by {referral.referredBy}</p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="font-medium text-gray-700">Email:</span>
                        <span className="ml-2 text-gray-600">{referral.email}</span>
                      </div>
                      <div>
                        <span className="font-medium text-gray-700">Phone:</span>
                        <span className="ml-2 text-gray-600">{referral.phone}</span>
                      </div>
                      <div>
                        <span className="font-medium text-gray-700">Interest:</span>
                        <span className="ml-2 text-gray-600">{referral.propertyInterest}</span>
                      </div>
                      <div>
                        <span className="font-medium text-gray-700">Date:</span>
                        <span className="ml-2 text-gray-600">
                          {new Date(referral.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                    
                    {referral.notes && (
                      <div className="mt-3">
                        <span className="font-medium text-gray-700">Notes:</span>
                        <p className="text-gray-600 mt-1">{referral.notes}</p>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex space-x-3 lg:flex-col lg:space-x-0 lg:space-y-3">
                    <Button
                      variant="success"
                      size="sm"
                      icon={CheckCircle}
                      onClick={() => handleApproval(referral.id, true)}
                    >
                      Approve
                    </Button>
                    <Button
                      variant="danger"
                      size="sm"
                      icon={XCircle}
                      onClick={() => handleApproval(referral.id, false)}
                    >
                      Reject
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* All Referrals */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">All Referrals</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Referral
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Referrer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Reward
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {referrals.map((referral) => (
                <tr key={referral.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{referral.name}</div>
                      <div className="text-sm text-gray-500">{referral.propertyInterest}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <StatusBadge status={referral.status} variant="referral" />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {referral.referredBy}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    ₹{referral.reward.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(referral.createdAt).toLocaleDateString()}
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

export default ReferralApprovals;