import React from 'react';
import { CheckCircle, Clock, Calendar, User, FileText, Phone } from 'lucide-react';
import Button from '../../components/ui/Button';

const RefereeStatus: React.FC = () => {
  const statusData = {
    currentStage: 'Site Visit Scheduled',
    progress: 60,
    timeline: [
      { stage: 'Initial Contact', status: 'completed', date: '2025-01-10', description: 'Welcome call completed' },
      { stage: 'Document Submission', status: 'completed', date: '2025-01-12', description: 'KYC documents verified' },
      { stage: 'Site Visit', status: 'current', date: '2025-01-20', description: 'Scheduled for 3:00 PM' },
      { stage: 'Loan Processing', status: 'pending', date: 'TBD', description: 'Awaiting site visit completion' },
      { stage: 'Final Approval', status: 'pending', date: 'TBD', description: 'Final documentation and approval' },
      { stage: 'Property Handover', status: 'pending', date: 'TBD', description: 'Keys and possession' }
    ],
    assignedAgent: {
      name: 'Priya Sharma',
      phone: '+91-9876543210',
      email: 'priya.sharma@realestatepro.com'
    },
    propertyDetails: {
      type: '2BHK Apartment',
      project: 'Luxury Apartments - Phase 1',
      unit: 'A-1204',
      price: '₹85,00,000'
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'current':
        return <Clock className="w-5 h-5 text-blue-600" />;
      default:
        return <Clock className="w-5 h-5 text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-50 border-green-200';
      case 'current':
        return 'bg-blue-50 border-blue-200';
      default:
        return 'bg-gray-50 border-gray-200';
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">My Application Status</h1>
        <p className="text-gray-600 mt-1">Track your property purchase journey</p>
      </div>

      {/* Current Status Overview */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Current Status</h3>
          <span className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
            {statusData.currentStage}
          </span>
        </div>
        
        <div className="mb-4">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Overall Progress</span>
            <span>{statusData.progress}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div 
              className="bg-blue-600 h-3 rounded-full transition-all duration-500"
              style={{ width: `${statusData.progress}%` }}
            />
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Application Timeline</h3>
        <div className="space-y-6">
          {statusData.timeline.map((item, index) => (
            <div key={index} className={`flex items-start space-x-4 p-4 rounded-lg border ${getStatusColor(item.status)}`}>
              <div className="flex-shrink-0 mt-1">
                {getStatusIcon(item.status)}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-gray-900">{item.stage}</h4>
                  <span className="text-sm text-gray-500">{item.date}</span>
                </div>
                <p className="text-gray-600">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Property Details */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Property Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-700">Property Type</label>
              <p className="text-gray-900 mt-1">{statusData.propertyDetails.type}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">Project</label>
              <p className="text-gray-900 mt-1">{statusData.propertyDetails.project}</p>
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-700">Unit Number</label>
              <p className="text-gray-900 mt-1">{statusData.propertyDetails.unit}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">Price</label>
              <p className="text-gray-900 mt-1 text-xl font-semibold">{statusData.propertyDetails.price}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Assigned Agent */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Assigned Agent</h3>
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
            <User className="w-8 h-8 text-gray-600" />
          </div>
          <div className="flex-1">
            <h4 className="font-semibold text-gray-900">{statusData.assignedAgent.name}</h4>
            <p className="text-gray-600">Senior Sales Executive</p>
            <div className="flex items-center space-x-4 mt-2">
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-gray-500" />
                <span className="text-sm text-gray-600">{statusData.assignedAgent.phone}</span>
              </div>
              <div className="flex items-center space-x-2">
                <FileText className="w-4 h-4 text-gray-500" />
                <span className="text-sm text-gray-600">{statusData.assignedAgent.email}</span>
              </div>
            </div>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm" icon={Phone}>
              Call
            </Button>
            <Button variant="outline" size="sm" icon={FileText}>
              Email
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RefereeStatus;