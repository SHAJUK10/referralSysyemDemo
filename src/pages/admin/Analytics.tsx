import React from 'react';
import { BarChart3, TrendingUp, Users, DollarSign, Calendar, Target } from 'lucide-react';
import MetricCard from '../../components/ui/MetricCard';
import MonthlyTrendsChart from '../../components/charts/MonthlyTrendsChart';
import LeadSourceChart from '../../components/charts/LeadSourceChart';
import LeadPipelineChart from '../../components/charts/LeadPipelineChart';

const Analytics: React.FC = () => {
  const analyticsData = {
    overview: {
      totalLeads: 320,
      conversionRate: 18.5,
      averageDealValue: 125000,
      monthlyGrowth: 12.3
    },
    performance: {
      topReferrer: 'REF001',
      bestMonth: 'November 2024',
      highestConversion: 'Referral Source',
      avgResponseTime: '2.4 hours'
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Analytics & Reports</h1>
        <p className="text-gray-600 mt-1">Comprehensive insights into your business performance</p>
      </div>

      {/* Key Performance Indicators */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Total Leads"
          value={analyticsData.overview.totalLeads}
          icon={Users}
          trend={{ value: 8, isPositive: true }}
          color="blue"
        />
        <MetricCard
          title="Conversion Rate"
          value={`${analyticsData.overview.conversionRate}%`}
          icon={Target}
          trend={{ value: 2.1, isPositive: true }}
          color="green"
        />
        <MetricCard
          title="Avg Deal Value"
          value={`₹${(analyticsData.overview.averageDealValue / 1000).toFixed(0)}K`}
          icon={DollarSign}
          trend={{ value: 5.2, isPositive: true }}
          color="indigo"
        />
        <MetricCard
          title="Monthly Growth"
          value={`${analyticsData.overview.monthlyGrowth}%`}
          icon={TrendingUp}
          trend={{ value: 3.1, isPositive: true }}
          color="teal"
        />
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <LeadPipelineChart />
        <LeadSourceChart />
      </div>

      <div className="grid grid-cols-1 gap-6">
        <MonthlyTrendsChart />
      </div>

      {/* Performance Insights */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Performance Insights</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="text-center p-4 bg-blue-50 rounded-lg border border-blue-200">
            <h4 className="font-semibold text-blue-900">Top Referrer</h4>
            <p className="text-2xl font-bold text-blue-600 mt-2">{analyticsData.performance.topReferrer}</p>
            <p className="text-sm text-blue-700">15 successful referrals</p>
          </div>
          <div className="text-center p-4 bg-green-50 rounded-lg border border-green-200">
            <h4 className="font-semibold text-green-900">Best Month</h4>
            <p className="text-lg font-bold text-green-600 mt-2">{analyticsData.performance.bestMonth}</p>
            <p className="text-sm text-green-700">22 conversions</p>
          </div>
          <div className="text-center p-4 bg-purple-50 rounded-lg border border-purple-200">
            <h4 className="font-semibold text-purple-900">Best Source</h4>
            <p className="text-lg font-bold text-purple-600 mt-2">{analyticsData.performance.highestConversion}</p>
            <p className="text-sm text-purple-700">35% conversion rate</p>
          </div>
          <div className="text-center p-4 bg-yellow-50 rounded-lg border border-yellow-200">
            <h4 className="font-semibold text-yellow-900">Avg Response</h4>
            <p className="text-lg font-bold text-yellow-600 mt-2">{analyticsData.performance.avgResponseTime}</p>
            <p className="text-sm text-yellow-700">Lead response time</p>
          </div>
        </div>
      </div>

      {/* Detailed Reports */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Detailed Reports</h3>
          <div className="flex space-x-3">
            <Button variant="outline" size="sm">
              Export Excel
            </Button>
            <Button variant="outline" size="sm">
              Export PDF
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h4 className="font-medium text-gray-900">Lead Performance</h4>
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="text-gray-700">Total Leads Generated</span>
                <span className="font-semibold text-gray-900">320</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="text-gray-700">Qualified Leads</span>
                <span className="font-semibold text-gray-900">245</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="text-gray-700">Converted Leads</span>
                <span className="font-semibold text-gray-900">59</span>
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <h4 className="font-medium text-gray-900">Revenue Metrics</h4>
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="text-gray-700">Total Revenue</span>
                <span className="font-semibold text-gray-900">₹7.4Cr</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="text-gray-700">Commission Paid</span>
                <span className="font-semibold text-gray-900">₹2.1L</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="text-gray-700">ROI on Referrals</span>
                <span className="font-semibold text-gray-900">350%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;