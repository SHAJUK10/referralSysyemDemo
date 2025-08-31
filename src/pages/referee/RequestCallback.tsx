import React, { useState } from 'react';
import { Phone, Clock, CheckCircle, Calendar } from 'lucide-react';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';

const RequestCallback: React.FC = () => {
  const [formData, setFormData] = useState({
    preferredTime: '',
    preferredDate: '',
    topic: '',
    urgency: 'normal',
    notes: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setShowSuccess(true);
    
    setTimeout(() => {
      setShowSuccess(false);
      setFormData({
        preferredTime: '',
        preferredDate: '',
        topic: '',
        urgency: 'normal',
        notes: ''
      });
    }, 3000);
  };

  if (showSuccess) {
    return (
      <div className="p-6">
        <div className="max-w-md mx-auto bg-white rounded-lg border border-gray-200 p-8 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Callback Requested!</h3>
          <p className="text-gray-600 mb-6">
            Your callback request has been submitted. Our team will contact you within the specified timeframe.
          </p>
          <Button
            variant="primary"
            onClick={() => setShowSuccess(false)}
          >
            Request Another Callback
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Request Callback</h1>
          <p className="text-gray-600 mt-1">Schedule a convenient time for our team to call you</p>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Calendar className="w-4 h-4 inline mr-2" />
                  Preferred Date
                </label>
                <input
                  type="date"
                  value={formData.preferredDate}
                  onChange={(e) => setFormData(prev => ({ ...prev, preferredDate: e.target.value }))}
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Clock className="w-4 h-4 inline mr-2" />
                  Preferred Time
                </label>
                <select
                  value={formData.preferredTime}
                  onChange={(e) => setFormData(prev => ({ ...prev, preferredTime: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="">Select time slot</option>
                  <option value="09:00-10:00">9:00 AM - 10:00 AM</option>
                  <option value="10:00-11:00">10:00 AM - 11:00 AM</option>
                  <option value="11:00-12:00">11:00 AM - 12:00 PM</option>
                  <option value="14:00-15:00">2:00 PM - 3:00 PM</option>
                  <option value="15:00-16:00">3:00 PM - 4:00 PM</option>
                  <option value="16:00-17:00">4:00 PM - 5:00 PM</option>
                  <option value="17:00-18:00">5:00 PM - 6:00 PM</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Call Topic
              </label>
              <select
                value={formData.topic}
                onChange={(e) => setFormData(prev => ({ ...prev, topic: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="">Select topic</option>
                <option value="property-inquiry">Property Inquiry</option>
                <option value="pricing-discussion">Pricing Discussion</option>
                <option value="loan-assistance">Loan Assistance</option>
                <option value="documentation">Documentation Help</option>
                <option value="site-visit">Site Visit Scheduling</option>
                <option value="general-support">General Support</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Urgency Level
              </label>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { value: 'low', label: 'Low', color: 'border-gray-300 text-gray-700' },
                  { value: 'normal', label: 'Normal', color: 'border-blue-300 text-blue-700' },
                  { value: 'high', label: 'High', color: 'border-red-300 text-red-700' }
                ].map((urgency) => (
                  <button
                    key={urgency.value}
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, urgency: urgency.value }))}
                    className={`p-3 border rounded-lg text-sm font-medium transition-colors ${
                      formData.urgency === urgency.value
                        ? `${urgency.color} bg-opacity-10`
                        : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    {urgency.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Additional Notes
              </label>
              <textarea
                value={formData.notes}
                onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Any specific questions or topics you'd like to discuss..."
              />
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-medium text-blue-900 mb-2">Callback Information</h4>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Our team will call you at your registered number</li>
                <li>• Callback will be within 2 hours during business hours</li>
                <li>• For urgent matters, we'll prioritize your request</li>
                <li>• You can reschedule if the time doesn't work</li>
              </ul>
            </div>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="w-full"
              icon={Phone}
              loading={isSubmitting}
            >
              {isSubmitting ? 'Requesting...' : 'Request Callback'}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RequestCallback;