import React from 'react';
import { TrendingUp, Users, Award, DollarSign, Calendar, BarChart3 } from 'lucide-react';

const PerformanceMetrics: React.FC = () => {
  const performanceData = {
    overview: {
      totalReferrals: 12,
      successfulReferrals: 3,
      pendingReferrals: 4,
      rejectedReferrals: 2,
      totalEarnings: 25000,
      averageReward: 8333
    },
    monthlyBreakdown: [
      { month: 'October 2024', referrals: 2, conversions: 1, earnings: 5000, rate: 50 },
      { month: 'November 2024', referrals: 3, conversions: 2, earnings: 12000, rate: 67 },
      { month: 'December 2024', referrals: 3, conversions: 0, earnings: 0, rate: 0 },
      { month: 'January 2025', referrals: 4, conversions: 1, earnings: 8000, rate: 25 }
    ],
    topCategories: [
      { category: '2BHK Apartments', referrals: 5, conversions: 2, earnings: 10000 },
      { category: '3BHK Villas', referrals: 4, conversions: 1, earnings: 8000 },
      { category: '4BHK Penthouses', referrals: 2, conversions: 0, earnings: 0 },
      { category: '1BHK Studios', referrals: 1, conversions: 0, earnings: 0 }
    ]
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Performance Analytics</h2>
        <p className="text-gray-600 mt-1">Detailed insights into your referral performance</p>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Referrals</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{performanceData.overview.totalReferrals}</p>
              <p className="text-sm text-gray-500 mt-1">All time submissions</p>
            </div>
            <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Success Rate</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">
                {Math.round((performanceData.overview.successfulReferrals / performanceData.overview.totalReferrals) * 100)}%
              </p>
              <p className="text-sm text-gray-500 mt-1">{performanceData.overview.successfulReferrals} successful</p>
            </div>
            <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center">
              <Award className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Average Reward</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">₹{performanceData.overview.averageReward.toLocaleString()}</p>
              <p className="text-sm text-gray-500 mt-1">Per successful referral</p>
            </div>
            <div className="w-12 h-12 bg-indigo-50 rounded-lg flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-indigo-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Status Breakdown */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Referral Status Breakdown</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-green-50 rounded-lg border border-green-200">
            <div className="text-2xl font-bold text-green-600">{performanceData.overview.successfulReferrals}</div>
            <div className="text-sm text-green-700 font-medium">Successful</div>
          </div>
          <div className="text-center p-4 bg-yellow-50 rounded-lg border border-yellow-200">
            <div className="text-2xl font-bold text-yellow-600">{performanceData.overview.pendingReferrals}</div>
            <div className="text-sm text-yellow-700 font-medium">In Progress</div>
          </div>
          <div className="text-center p-4 bg-red-50 rounded-lg border border-red-200">
            <div className="text-2xl font-bold text-red-600">{performanceData.overview.rejectedReferrals}</div>
            <div className="text-sm text-red-700 font-medium">Rejected</div>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg border border-gray-200">
            <div className="text-2xl font-bold text-gray-600">3</div>
            <div className="text-sm text-gray-700 font-medium">New</div>
          </div>
        </div>
      </div>

      {/* Monthly Performance */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Monthly Performance</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-medium text-gray-700">Month</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Referrals</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Conversions</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Rate</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Earnings</th>
              </tr>
            </thead>
            <tbody>
              {performanceData.monthlyBreakdown.map((data, index) => (
                <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4 font-medium text-gray-900">{data.month}</td>
                  <td className="py-3 px-4 text-gray-600">{data.referrals}</td>
                  <td className="py-3 px-4 text-gray-600">{data.conversions}</td>
                  <td className="py-3 px-4">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                      data.rate >= 50 ? 'bg-green-100 text-green-800' :
                      data.rate >= 25 ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {data.rate}%
                    </span>
                  </td>
                  <td className="py-3 px-4 font-semibold text-gray-900">₹{data.earnings.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Property Category Performance */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance by Property Type</h3>
        <div className="space-y-4">
          {performanceData.topCategories.map((category, index) => (
            <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div>
                <h4 className="font-medium text-gray-900">{category.category}</h4>
                <p className="text-sm text-gray-600">
                  {category.referrals} referrals • {category.conversions} conversions
                </p>
              </div>
              <div className="text-right">
                <p className="font-semibold text-gray-900">₹{category.earnings.toLocaleString()}</p>
                <p className="text-sm text-gray-600">
                  {category.referrals > 0 ? Math.round((category.conversions / category.referrals) * 100) : 0}% rate
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Goals and Targets */}
      <div className="bg-gradient-to-r from-indigo-50 to-blue-50 rounded-lg border border-indigo-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Monthly Goals</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-700">Referrals Goal</span>
              <span className="text-sm text-gray-600">4 / 10</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-blue-600 h-2 rounded-full" style={{ width: '40%' }}></div>
            </div>
          </div>
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-700">Earnings Goal</span>
              <span className="text-sm text-gray-600">₹8,000 / ₹20,000</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-green-600 h-2 rounded-full" style={{ width: '40%' }}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PerformanceMetrics;