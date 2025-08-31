import React, { useState } from 'react';
import { Calendar, Clock, MapPin, CheckCircle } from 'lucide-react';
import Button from '../../components/ui/Button';

const ScheduleVisit: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedProperty, setSelectedProperty] = useState('');
  const [specialRequests, setSpecialRequests] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const availableSlots = [
    '09:00 AM', '10:00 AM', '11:00 AM', '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM'
  ];

  const properties = [
    'Luxury Apartments - Phase 1',
    'Premium Villas - Gated Community',
    'Commercial Spaces - Business Park',
    'Affordable Housing - Phase 2'
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedDate || !selectedTime || !selectedProperty) {
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
      // Reset form
      setSelectedDate('');
      setSelectedTime('');
      setSelectedProperty('');
      setSpecialRequests('');
    }, 3000);
  };

  if (showSuccess) {
    return (
      <div className="p-6">
        <div className="max-w-md mx-auto bg-white rounded-lg border border-gray-200 p-8 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Visit Scheduled!</h3>
          <p className="text-gray-600 mb-6">
            Your site visit has been confirmed. You'll receive a confirmation email shortly.
          </p>
          <Button
            variant="primary"
            onClick={() => setShowSuccess(false)}
          >
            Schedule Another Visit
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Schedule Site Visit</h1>
          <p className="text-gray-600 mt-1">Book a convenient time to visit our properties</p>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Property Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <MapPin className="w-4 h-4 inline mr-2" />
                Select Property *
              </label>
              <select
                value={selectedProperty}
                onChange={(e) => setSelectedProperty(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                required
              >
                <option value="">Choose a property to visit</option>
                {properties.map((property) => (
                  <option key={property} value={property}>{property}</option>
                ))}
              </select>
            </div>

            {/* Date Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Calendar className="w-4 h-4 inline mr-2" />
                Preferred Date *
              </label>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                min={new Date().toISOString().split('T')[0]}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                required
              />
            </div>

            {/* Time Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Clock className="w-4 h-4 inline mr-2" />
                Preferred Time *
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {availableSlots.map((time) => (
                  <button
                    key={time}
                    type="button"
                    onClick={() => setSelectedTime(time)}
                    className={`p-3 border rounded-lg text-sm font-medium transition-colors ${
                      selectedTime === time
                        ? 'bg-indigo-100 border-indigo-300 text-indigo-700'
                        : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>

            {/* Special Requests */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Special Requests or Questions
              </label>
              <textarea
                value={specialRequests}
                onChange={(e) => setSpecialRequests(e.target.value)}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Any specific areas you'd like to focus on, accessibility needs, or questions you have..."
              />
            </div>

            {/* Information Box */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-medium text-blue-900 mb-2">What to Expect:</h4>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Guided tour of the selected property</li>
                <li>• Meeting with our sales representative</li>
                <li>• Discussion of pricing and payment plans</li>
                <li>• Answer any questions you may have</li>
              </ul>
            </div>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="w-full"
              loading={isSubmitting}
              disabled={!selectedDate || !selectedTime || !selectedProperty}
            >
              {isSubmitting ? 'Scheduling...' : 'Schedule Visit'}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ScheduleVisit;