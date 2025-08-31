import React, { useState } from 'react';
import { Link, Copy, Share2, QrCode, CheckCircle, ExternalLink } from 'lucide-react';
import Button from '../../components/ui/Button';
import { useAuth } from '../../contexts/AuthContext';

const ShareReferralLink: React.FC = () => {
  const { user } = useAuth();
  const [copied, setCopied] = useState(false);
  
  // Generate referral link based on user ID
  const referralLink = `${window.location.origin}/refer/${user?.id || 'REF001'}`;
  
  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(referralLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = referralLink;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'RealEstate Pro - Property Referral',
          text: 'Check out these amazing properties! Fill out this form to get personalized recommendations.',
          url: referralLink
        });
      } catch (err) {
        console.log('Share cancelled');
      }
    } else {
      handleCopyLink();
    }
  };

  const shareTemplates = [
    {
      platform: 'WhatsApp',
      message: `🏠 Hi! I found some amazing properties that might interest you. Check them out and get expert consultation: ${referralLink}`,
      color: 'bg-green-500 hover:bg-green-600'
    },
    {
      platform: 'SMS',
      message: `Hi! Check out these properties from RealEstate Pro: ${referralLink}`,
      color: 'bg-blue-500 hover:bg-blue-600'
    },
    {
      platform: 'Email',
      message: `Subject: Amazing Property Opportunities\n\nHi,\n\nI wanted to share some excellent property opportunities with you. RealEstate Pro has some fantastic options that might match your requirements.\n\nClick here to explore: ${referralLink}\n\nBest regards`,
      color: 'bg-purple-500 hover:bg-purple-600'
    }
  ];

  const handleTemplateShare = (template: typeof shareTemplates[0]) => {
    if (template.platform === 'WhatsApp') {
      window.open(`https://wa.me/?text=${encodeURIComponent(template.message)}`, '_blank');
    } else if (template.platform === 'SMS') {
      window.open(`sms:?body=${encodeURIComponent(template.message)}`, '_blank');
    } else if (template.platform === 'Email') {
      const subject = 'Amazing Property Opportunities';
      const body = template.message.split('\n\n').slice(1).join('\n\n');
      window.open(`mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`, '_blank');
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Share Referral Link</h2>
        <p className="text-gray-600 mt-1">Share your unique referral link to earn rewards</p>
      </div>

      {/* Referral Link Card */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
            <Link className="w-5 h-5 text-indigo-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Your Referral Link</h3>
            <p className="text-sm text-gray-600">Share this link to earn rewards</p>
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-4 mb-4">
          <div className="flex items-center justify-between">
            <code className="text-sm text-gray-700 break-all pr-4">{referralLink}</code>
            <Button
              variant={copied ? 'success' : 'outline'}
              size="sm"
              icon={copied ? CheckCircle : Copy}
              onClick={handleCopyLink}
            >
              {copied ? 'Copied!' : 'Copy'}
            </Button>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            variant="primary"
            icon={Share2}
            onClick={handleShare}
            className="flex-1"
          >
            Share Link
          </Button>
          <Button
            variant="outline"
            icon={ExternalLink}
            onClick={() => window.open(referralLink, '_blank')}
          >
            Preview Form
          </Button>
          <Button
            variant="outline"
            icon={QrCode}
            onClick={() => {
              // Generate QR code functionality could be added here
              alert('QR Code generation coming soon!');
            }}
          >
            QR Code
          </Button>
        </div>
      </div>

      {/* Share Templates */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Share Templates</h3>
        <div className="space-y-4">
          {shareTemplates.map((template, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-medium text-gray-900">{template.platform}</h4>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => handleTemplateShare(template)}
                  className={template.color}
                >
                  Share via {template.platform}
                </Button>
              </div>
              <div className="bg-gray-50 rounded p-3">
                <p className="text-sm text-gray-700 whitespace-pre-line">{template.message}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Reward Information */}
      <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Reward Structure</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-gray-700">Site Visit Bonus:</span>
              <span className="font-semibold text-green-600">₹2,000</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-700">Successful Deal:</span>
              <span className="font-semibold text-green-600">₹10,000</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-700">Premium Properties:</span>
              <span className="font-semibold text-green-600">₹15,000</span>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-gray-700">Monthly Bonus (5+ referrals):</span>
              <span className="font-semibold text-green-600">₹5,000</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-700">Top Performer Bonus:</span>
              <span className="font-semibold text-green-600">₹25,000</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-700">Payout Schedule:</span>
              <span className="font-medium text-gray-900">Monthly</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tips for Success */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Tips for Successful Referrals</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium text-gray-900 mb-2">Best Practices</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Share with genuinely interested prospects</li>
              <li>• Provide context about the properties</li>
              <li>• Follow up after sharing the link</li>
              <li>• Be available to answer questions</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-gray-900 mb-2">Target Audience</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• First-time home buyers</li>
              <li>• Investors looking for opportunities</li>
              <li>• People planning to upgrade homes</li>
              <li>• Those relocating to the area</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShareReferralLink;