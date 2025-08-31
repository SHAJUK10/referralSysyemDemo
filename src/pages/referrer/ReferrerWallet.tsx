import React, { useState } from 'react';
import { Wallet, DollarSign, TrendingUp, Download, Calendar, CreditCard } from 'lucide-react';
import Button from '../../components/ui/Button';

const ReferrerWallet: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('all');

  const walletData = {
    currentBalance: 8000,
    totalEarnings: 25000,
    pendingPayments: 3000,
    lastPayout: 12000,
    nextPayoutDate: '2025-02-01'
  };

  const transactions = [
    {
      id: '1',
      type: 'earning',
      description: 'Referral reward - John Doe',
      amount: 5000,
      date: '2025-01-10',
      status: 'completed'
    },
    {
      id: '2',
      type: 'earning',
      description: 'Site visit bonus - Ankit Sharma',
      amount: 2000,
      date: '2025-01-08',
      status: 'completed'
    },
    {
      id: '3',
      type: 'payout',
      description: 'Bank transfer to account ending 1234',
      amount: -12000,
      date: '2025-01-05',
      status: 'completed'
    },
    {
      id: '4',
      type: 'earning',
      description: 'Referral reward - Previous customer',
      amount: 8000,
      date: '2024-12-28',
      status: 'completed'
    },
    {
      id: '5',
      type: 'earning',
      description: 'Pending reward - Raj Patel',
      amount: 3000,
      date: '2025-01-15',
      status: 'pending'
    }
  ];

  const filteredTransactions = transactions.filter(transaction => {
    if (selectedPeriod === 'all') return true;
    if (selectedPeriod === 'earnings') return transaction.type === 'earning';
    if (selectedPeriod === 'payouts') return transaction.type === 'payout';
    return true;
  });

  const handleWithdraw = () => {
    // Simulate withdrawal process
    const toast = document.createElement('div');
    toast.className = 'fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50';
    toast.textContent = 'Withdrawal request submitted successfully!';
    document.body.appendChild(toast);
    
    setTimeout(() => {
      document.body.removeChild(toast);
    }, 3000);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Wallet & Earnings</h2>
          <p className="text-gray-600 mt-1">Manage your earnings and withdrawal requests</p>
        </div>
        <Button
          variant="primary"
          icon={Download}
          onClick={handleWithdraw}
          disabled={walletData.currentBalance < 1000}
        >
          Request Withdrawal
        </Button>
      </div>

      {/* Wallet Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-sm font-medium">Available Balance</p>
              <p className="text-3xl font-bold mt-2">₹{walletData.currentBalance.toLocaleString()}</p>
            </div>
            <Wallet className="w-8 h-8 text-green-200" />
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Earnings</p>
              <p className="text-2xl font-bold text-gray-900 mt-2">₹{walletData.totalEarnings.toLocaleString()}</p>
            </div>
            <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
              <DollarSign className="w-5 h-5 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Pending Payments</p>
              <p className="text-2xl font-bold text-gray-900 mt-2">₹{walletData.pendingPayments.toLocaleString()}</p>
            </div>
            <div className="w-10 h-10 bg-yellow-50 rounded-lg flex items-center justify-center">
              <Calendar className="w-5 h-5 text-yellow-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Last Payout</p>
              <p className="text-2xl font-bold text-gray-900 mt-2">₹{walletData.lastPayout.toLocaleString()}</p>
            </div>
            <div className="w-10 h-10 bg-indigo-50 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-indigo-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Payout Information */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <div className="flex items-start space-x-4">
          <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
            <Calendar className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-blue-900">Next Payout Schedule</h3>
            <p className="text-blue-800 mt-1">
              Your next payout is scheduled for <strong>{new Date(walletData.nextPayoutDate).toLocaleDateString()}</strong>
            </p>
            <p className="text-sm text-blue-700 mt-2">
              Minimum withdrawal amount: ₹1,000 • Processing time: 3-5 business days
            </p>
          </div>
        </div>
      </div>

      {/* Transaction History */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">Transaction History</h3>
          <div className="flex space-x-2">
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="all">All Transactions</option>
              <option value="earnings">Earnings Only</option>
              <option value="payouts">Payouts Only</option>
            </select>
            <Button variant="outline" size="sm" icon={Download}>
              Export
            </Button>
          </div>
        </div>
        
        <div className="divide-y divide-gray-200">
          {filteredTransactions.map((transaction) => (
            <div key={transaction.id} className="px-6 py-4 hover:bg-gray-50">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    transaction.type === 'earning' 
                      ? 'bg-green-100' 
                      : 'bg-blue-100'
                  }`}>
                    {transaction.type === 'earning' ? (
                      <TrendingUp className={`w-5 h-5 ${transaction.type === 'earning' ? 'text-green-600' : 'text-blue-600'}`} />
                    ) : (
                      <CreditCard className="w-5 h-5 text-blue-600" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{transaction.description}</p>
                    <p className="text-sm text-gray-500">
                      {new Date(transaction.date).toLocaleDateString()} • 
                      <span className={`ml-2 ${
                        transaction.status === 'completed' ? 'text-green-600' : 'text-yellow-600'
                      }`}>
                        {transaction.status === 'completed' ? 'Completed' : 'Pending'}
                      </span>
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`font-semibold ${
                    transaction.amount > 0 ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {transaction.amount > 0 ? '+' : ''}₹{Math.abs(transaction.amount).toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Withdrawal Guidelines */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Withdrawal Guidelines</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium text-gray-900 mb-2">Requirements</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Minimum withdrawal: ₹1,000</li>
              <li>• Maximum withdrawal: ₹50,000 per month</li>
              <li>• Valid bank account required</li>
              <li>• KYC verification completed</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-gray-900 mb-2">Processing Time</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Bank transfer: 3-5 business days</li>
              <li>• UPI transfer: 1-2 business days</li>
              <li>• Processing fee: ₹25 per transaction</li>
              <li>• Auto-payout available for amounts ≥ ₹5,000</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReferrerWallet;