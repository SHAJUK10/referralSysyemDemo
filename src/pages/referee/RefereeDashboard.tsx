import React from 'react';
import { CheckCircle, Calendar, MessageCircle, User, Clock, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/ui/Button';

const RefereeDashboard: React.FC = () => {
  const navigate = useNavigate();

  const currentStatus = {
    stage: 'Visit Scheduled',
    nextStep: 'Attend site visit on Jan 20, 2024 at 3:00 PM',
    progress: 60
  };

  const quickActions = [
    {
      title: 'Schedule Site Visit',
      description: 'Book a convenient time to visit the property',
      icon: Calendar,
      color: 'bg-blue-500',
      action: () => navigate('/referee/schedule')
    },
    {
      title: 'Request Callback',
      description: 'Get a call from our sales team',
      icon: MessageCircle,
      color: 'bg-green-500',
      action: () => navigate('/referee/callback')
    },
    {
      title: 'Send Message',
      description: 'Chat with your assigned agent',
      icon: MessageCircle,
      color: 'bg-purple-500',
      action: () => navigate('/referee/messages')
    },
    {
      title: 'Update Profile',
      description: 'Manage your personal information',
      icon: User,
      color: 'bg-teal-500',
      action: () => navigate('/referee/profile')
    }
  ];

  const recentActivity = [
    { action: 'Site visit scheduled', time: '2 hours ago', icon: Calendar, color: 'text-blue-600' },
    { action: 'Document uploaded', time: '1 day ago', icon: CheckCircle, color: 'text-green-600' },
    { action: 'Callback requested', time: '2 days ago', icon: MessageCircle, color: 'text-purple-600' },
    { action: 'Profile updated', time: '3 days ago', icon: User, color: 'text-teal-600' }
  ];

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Welcome Back!</h1>
        <p className="text-gray-600 mt-1">Track your property journey and upcoming activities</p>
      </div>

      {/* Current Status */}
      <div className="bg-gradient-to-r from-indigo-50 to-blue-50 rounded-lg border border-indigo-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Current Status</h3>
          <span className="bg-indigo-100 text-indigo-800 text-sm font-medium px-3 py-1 rounded-full">
            {currentStatus.stage}
          </span>
        </div>
        
        <div className="mb-4">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Progress</span>
            <span>{currentStatus.progress}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-indigo-600 h-2 rounded-full transition-all duration-500"
              style={{ width: `${currentStatus.progress}%` }}
            />
          </div>
        </div>
        
        <p className="text-gray-700 mb-4">{currentStatus.nextStep}</p>
        
        <Button variant="primary" size="sm">
          View Full Timeline
        </Button>
      </div>

      {/* Quick Actions */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action, index) => (
            <div
              key={index}
              onClick={action.action}
              className="bg-white rounded-lg border border-gray-200 p-6 cursor-pointer hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 group"
            >
              <div className={`w-12 h-12 ${action.color} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <action.icon className="w-6 h-6 text-white" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">{action.title}</h4>
              <p className="text-sm text-gray-600 mb-4">{action.description}</p>
              <div className="flex items-center text-indigo-600 text-sm font-medium group-hover:text-indigo-700">
                Get Started
                <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
        <div className="space-y-4">
          {recentActivity.map((activity, index) => (
            <div key={index} className="flex items-center space-x-4 p-3 hover:bg-gray-50 rounded-lg transition-colors">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center bg-gray-100`}>
                <activity.icon className={`w-4 h-4 ${activity.color}`} />
              </div>
              <div className="flex-1">
                <p className="font-medium text-gray-900">{activity.action}</p>
                <p className="text-sm text-gray-500">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Next Steps */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">What's Next?</h3>
        <div className="space-y-4">
          <div className="flex items-center space-x-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
              <Calendar className="w-4 h-4 text-white" />
            </div>
            <div className="flex-1">
              <h4 className="font-medium text-gray-900">Upcoming Site Visit</h4>
              <p className="text-sm text-gray-600">January 20, 2024 at 3:00 PM</p>
            </div>
            <Button variant="outline" size="sm">
              Reschedule
            </Button>
          </div>
          
          <div className="flex items-center space-x-4 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
            <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center">
              <Clock className="w-4 h-4 text-white" />
            </div>
            <div className="flex-1">
              <h4 className="font-medium text-gray-900">Document Verification</h4>
              <p className="text-sm text-gray-600">Upload required documents for loan processing</p>
            </div>
            <Button variant="outline" size="sm">
              Upload
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RefereeDashboard;