import React, { useState } from 'react';
import { UserPlus, CheckCircle } from 'lucide-react';
import { User } from '../../types';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';

interface FormData {
  fullName: string;
  phone: string;
  email: string;
  propertyInterest: string;
  notes: string;
}

interface FormErrors {
  fullName?: string;
  phone?: string;
  email?: string;
  propertyInterest?: string;
}

const AddReferral: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    phone: '',
    email: '',
    propertyInterest: '',
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
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setShowSuccess(true);
    
    // Auto-hide success message after 3 seconds
    setTimeout(() => {
      setShowSuccess(false);
      // Clear form
      setFormData({
        fullName: '',
        phone: '',
        email: '',
        propertyInterest: '',
        notes: ''
      });
    }, 3000);
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  if (showSuccess) {
    return (
      <div className="p-6">
        <div className="max-w-md mx-auto bg-white rounded-lg border border-gray-200 p-8 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Referral Added Successfully!</h3>
          <p className="text-gray-600 mb-6">
            Your referral has been submitted and is pending approval. You'll be notified once it's reviewed.
          </p>
          <Button
            variant="primary"
            onClick={() => setShowSuccess(false)}
          >
            Add Another Referral
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900">Submit New Referral</h2>
          <p className="text-gray-600 mt-1">Add a new customer referral to earn rewards</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              label="Full Name *"
              type="text"
              value={formData.fullName}
              onChange={(e) => handleInputChange('fullName', e.target.value)}
              error={errors.fullName}
              placeholder="Enter customer's full name"
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
            placeholder="customer@email.com"
          />

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
              Additional Notes
            </label>
            <textarea
              value={formData.notes}
              onChange={(e) => handleInputChange('notes', e.target.value)}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Any additional information about the customer..."
            />
          </div>

          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-4 sm:space-y-0">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-sm text-blue-800">
                <strong>Reward:</strong> ₹2,000 for site visit + ₹10,000 for successful deal
              </p>
            </div>
            
            <Button
              type="submit"
              variant="primary"
              size="lg"
              icon={UserPlus}
              loading={isSubmitting}
              className="sm:ml-4"
            >
              {isSubmitting ? 'Submitting...' : 'Submit Referral'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddReferral;