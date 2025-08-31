import React from 'react';

interface StatusBadgeProps {
  status: string;
  variant?: 'lead' | 'referral';
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status, variant = 'lead' }) => {
  const getStatusColor = (status: string, variant: string) => {
    if (variant === 'referral') {
      switch (status.toLowerCase()) {
        case 'successful':
          return 'bg-green-100 text-green-800 border-green-200';
        case 'in progress':
          return 'bg-yellow-100 text-yellow-800 border-yellow-200';
        case 'rejected':
          return 'bg-red-100 text-red-800 border-red-200';
        case 'new':
          return 'bg-gray-100 text-gray-800 border-gray-200';
        default:
          return 'bg-gray-100 text-gray-800 border-gray-200';
      }
    }
    
    // Lead statuses
    switch (status.toLowerCase()) {
      case 'new':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'contacted':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'meeting':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'visited':
        return 'bg-indigo-100 text-indigo-800 border-indigo-200';
      case 'negotiation':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'closed':
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusEmoji = (status: string, variant: string) => {
    if (variant === 'referral') {
      switch (status.toLowerCase()) {
        case 'successful':
          return '🟢';
        case 'in progress':
          return '🟡';
        case 'rejected':
          return '🔴';
        case 'new':
          return '⚪';
        default:
          return '⚪';
      }
    }
    return '';
  };

  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(status, variant)}`}>
      {variant === 'referral' && (
        <span className="mr-1">{getStatusEmoji(status, variant)}</span>
      )}
      {status}
    </span>
  );
};

export default StatusBadge;