import React from 'react';
import { Users, TrendingUp, Calendar, DollarSign, Award, Clock } from 'lucide-react';
import MetricCard from '../../components/ui/MetricCard';
import LeadPipelineChart from '../../components/charts/LeadPipelineChart';
import MonthlyTrendsChart from '../../components/charts/MonthlyTrendsChart';
import LeadSourceChart from '../../components/charts/LeadSourceChart';
import Button from '../../components/ui/Button';

const AdminDashboard: React.FC = () => {
  const handleExport = (type: 'excel' | 'pdf') => {
    // Simulate export functionality
    const toast = document.createElement('div');
    toast.className = 'fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 transform translate-x-full transition-transform';
    toast.textContent = `${type.toUpperCase()} export started successfully!`;
    document.body.appendChild(toast);
    
    setTimeout(() => {
      toast.style.transform = 'translateX(0)';
    }, 100);
    
    setTimeout(() => {
      toast.style.transform = 'translateX(100%)';
      setTimeout(() => document.body.removeChild(toast), 300);
    }, 3000);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
          <p className="text-gray-600 mt-1">Monitor your real estate business performance</p>
        </div>
        <div className="flex space-x-3 mt-4 sm:mt-0">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleExport('excel')}
          >
            Export Excel
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleExport('pdf')}
          >
            Export PDF
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
        <MetricCard
          title="Total Enquiries"
          value={120}
          icon={Users}
          trend={{ value: 8, isPositive: true }}
          color="blue"
        />
        <MetricCard
          title="Active Leads"
          value={85}
          icon={TrendingUp}
          trend={{ value: 12, isPositive: true }}
          color="green"
        />
        <MetricCard
          title="Site Visits"
          value={40}
          icon={Calendar}
          trend={{ value: 5, isPositive: true }}
          color="yellow"
        />
        <MetricCard
          title="Meetings"
          value={25}
          icon={Clock}
          trend={{ value: 3, isPositive: false }}
          color="indigo"
        />
        <MetricCard
          title="Closed Deals"
          value={12}
          icon={Award}
          trend={{ value: 15, isPositive: true }}
          color="teal"
        />
        <MetricCard
          title="Revenue"
          value="₹2.5L"
          icon={DollarSign}
          trend={{ value: 20, isPositive: true }}
          color="green"
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <LeadPipelineChart />
        <LeadSourceChart />
      </div>

      <div className="grid grid-cols-1 gap-6">
        <MonthlyTrendsChart />
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
        <div className="space-y-4">
          {[
            { action: 'New lead added', details: 'Rohit Kumar - Referral', time: '2 minutes ago', color: 'text-blue-600' },
            { action: 'Deal closed', details: 'Alok Singh - ₹15,000 commission', time: '1 hour ago', color: 'text-green-600' },
            { action: 'Meeting scheduled', details: 'Meena Patel - Tomorrow 3:00 PM', time: '3 hours ago', color: 'text-yellow-600' },
            { action: 'Reward approved', details: 'REF001 - ₹5,000 payout', time: '5 hours ago', color: 'text-indigo-600' }
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
};

export default AdminDashboard;