import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Building2, CheckCircle, UserPlus } from 'lucide-react';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';

interface FormData {
  fullName: string;
  phone: string;
  email: string;
  propertyInterest: string;
  budget: string;
  notes: string;
}

interface FormErrors {
  fullName?: string;
  phone?: string;
  email?: string;
  propertyInterest?: string;
  budget?: string;
}

const PublicReferralForm: React.FC = () => {
  const { referrerId } = useParams<{ referrerId: string }>();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    phone: '',
    email: '',
    propertyInterest: '',
    budget: '',
    notes: ''
  });
  
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\+?[\d\s-()]+$/.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData.propertyInterest.trim()) {
      newErrors.propertyInterest = 'Property interest is required';
    }
    
    if (!formData.budget.trim()) {
      newErrors.budget = 'Budget range is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call to save referral
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Store the referral data in localStorage for demo purposes
    const existingReferrals = JSON.parse(localStorage.getItem('publicReferrals') || '[]');
    const newReferral = {
      id: Date.now().toString(),
      ...formData,
      referredBy: referrerId,
      status: 'New',
      reward: 0,
      createdAt: new Date().toISOString()
    };
    
    localStorage.setItem('publicReferrals', JSON.stringify([...existingReferrals, newReferral]));
    
    setIsSubmitting(false);
    setShowSuccess(true);
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  if (showSuccess) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
        <div className="max-w-md w-full bg-white rounded-lg border border-gray-200 p-8 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Thank You!</h3>
          <p className="text-gray-600 mb-6">
            Your information has been submitted successfully. Our team will contact you within 24 hours to discuss your property requirements.
          </p>
          <div className="space-y-3">
            <Button
              variant="primary"
              onClick={() => {
                setShowSuccess(false);
                setFormData({
                  fullName: '',
                  phone: '',
                  email: '',
                  propertyInterest: '',
                  budget: '',
                  notes: ''
                });
              }}
            >
              Submit Another Referral
            </Button>
            <Button
              variant="outline"
              onClick={() => navigate('/login')}
            >
              Go to Dashboard
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="w-12 h-12 bg-indigo-600 rounded-lg flex items-center justify-center">
              <Building2 className="w-6 h-6 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">RealEstate Pro</h1>
          <p className="text-gray-600">
            You've been referred by one of our trusted partners. Fill out the form below to get started with your property journey.
          </p>
          {referrerId && (
            <div className="mt-4 inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800">
              Referred by: {referrerId}
            </div>
          )}
        </div>

        {/* Form */}
        <div className="bg-white rounded-lg border border-gray-200 p-8 shadow-sm">
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Property Interest Form</h2>
            <p className="text-gray-600">Tell us about your property requirements</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                label="Full Name *"
                type="text"
                value={formData.fullName}
                onChange={(e) => handleInputChange('fullName', e.target.value)}
                error={errors.fullName}
                placeholder="Enter your full name"
              />
              
              <Input
                label="Phone Number *"
                type="tel"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                error={errors.phone}
                placeholder="+91-9876543210"
              />
            </div>

            <Input
              label="Email Address *"
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              error={errors.email}
              placeholder="your.email@example.com"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Property Interest *
                </label>
                <select
                  value={formData.propertyInterest}
                  onChange={(e) => handleInputChange('propertyInterest', e.target.value)}
                  className={`
                    w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500
                    ${errors.propertyInterest ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300'}
                  `}
                >
                  <option value="">Select property type</option>
                  <option value="1BHK Apartment">1BHK Apartment</option>
                  <option value="2BHK Apartment">2BHK Apartment</option>
                  <option value="3BHK Apartment">3BHK Apartment</option>
                  <option value="4BHK Apartment">4BHK Apartment</option>
                  <option value="Villa">Villa</option>
                  <option value="Penthouse">Penthouse</option>
                  <option value="Commercial Space">Commercial Space</option>
                </select>
                {errors.propertyInterest && (
                  <p className="mt-1 text-sm text-red-600">{errors.propertyInterest}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Budget Range *
                </label>
                <select
                  value={formData.budget}
                  onChange={(e) => handleInputChange('budget', e.target.value)}
                  className={`
                    w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500
                    ${errors.budget ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300'}
                  `}
                >
                  <option value="">Select budget range</option>
                  <option value="Under ₹50L">Under ₹50L</option>
                  <option value="₹50L - ₹1Cr">₹50L - ₹1Cr</option>
                  <option value="₹1Cr - ₹2Cr">₹1Cr - ₹2Cr</option>
                  <option value="₹2Cr - ₹5Cr">₹2Cr - ₹5Cr</option>
                  <option value="Above ₹5Cr">Above ₹5Cr</option>
                </select>
                {errors.budget && (
                  <p className="mt-1 text-sm text-red-600">{errors.budget}</p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Additional Requirements
              </label>
              <textarea
                value={formData.notes}
                onChange={(e) => handleInputChange('notes', e.target.value)}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Any specific requirements, preferred location, amenities, or questions..."
              />
            </div>

            {/* Benefits Section */}
            <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4">
              <h4 className="font-medium text-indigo-900 mb-2">What happens next?</h4>
              <ul className="text-sm text-indigo-800 space-y-1">
                <li>• Our expert will contact you within 24 hours</li>
                <li>• Free property consultation and site visit</li>
                <li>• Personalized property recommendations</li>
                <li>• Assistance with documentation and financing</li>
              </ul>
            </div>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="w-full"
              icon={UserPlus}
              loading={isSubmitting}
            >
              {isSubmitting ? 'Submitting...' : 'Submit Interest'}
            </Button>
          </form>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-sm text-gray-500">
          <p>© 2025 RealEstate Pro. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default PublicReferralForm;