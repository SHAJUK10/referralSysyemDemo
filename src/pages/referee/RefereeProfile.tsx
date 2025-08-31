import React, { useState } from 'react';
import { User, Mail, Phone, MapPin, Calendar, Edit, Save, X } from 'lucide-react';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';

const RefereeProfile: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    fullName: 'John Customer',
    email: 'john.customer@email.com',
    phone: '+91-9876543210',
    address: '123 Main Street, Mumbai, Maharashtra',
    dateOfBirth: '1990-05-15',
    occupation: 'Software Engineer',
    annualIncome: '₹12,00,000',
    propertyPreference: '2BHK Apartment',
    budgetRange: '₹80L - ₹1Cr'
  });

  const [editData, setEditData] = useState(profileData);

  const handleEdit = () => {
    setEditData(profileData);
    setIsEditing(true);
  };

  const handleSave = () => {
    setProfileData(editData);
    setIsEditing(false);
    
    const toast = document.createElement('div');
    toast.className = 'fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50';
    toast.textContent = 'Profile updated successfully!';
    document.body.appendChild(toast);
    
    setTimeout(() => {
      document.body.removeChild(toast);
    }, 3000);
  };

  const handleCancel = () => {
    setEditData(profileData);
    setIsEditing(false);
  };

  return (
    <div className="p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">My Profile</h1>
            <p className="text-gray-600 mt-1">Manage your personal information and preferences</p>
          </div>
          {!isEditing ? (
            <Button variant="outline" icon={Edit} onClick={handleEdit}>
              Edit Profile
            </Button>
          ) : (
            <div className="flex space-x-3">
              <Button variant="outline" icon={X} onClick={handleCancel}>
                Cancel
              </Button>
              <Button variant="primary" icon={Save} onClick={handleSave}>
                Save Changes
              </Button>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Picture & Basic Info */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="text-center">
              <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <User className="w-12 h-12 text-gray-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">{profileData.fullName}</h3>
              <p className="text-gray-600">{profileData.occupation}</p>
              
              <div className="mt-6 space-y-3">
                <div className="flex items-center justify-center space-x-2 text-gray-600">
                  <Mail className="w-4 h-4" />
                  <span className="text-sm">{profileData.email}</span>
                </div>
                <div className="flex items-center justify-center space-x-2 text-gray-600">
                  <Phone className="w-4 h-4" />
                  <span className="text-sm">{profileData.phone}</span>
                </div>
                <div className="flex items-center justify-center space-x-2 text-gray-600">
                  <MapPin className="w-4 h-4" />
                  <span className="text-sm text-center">{profileData.address}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Personal Information */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Personal Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                  label="Full Name"
                  value={isEditing ? editData.fullName : profileData.fullName}
                  onChange={(e) => setEditData(prev => ({ ...prev, fullName: e.target.value }))}
                  disabled={!isEditing}
                />
                <Input
                  label="Email Address"
                  type="email"
                  value={isEditing ? editData.email : profileData.email}
                  onChange={(e) => setEditData(prev => ({ ...prev, email: e.target.value }))}
                  disabled={!isEditing}
                />
                <Input
                  label="Phone Number"
                  value={isEditing ? editData.phone : profileData.phone}
                  onChange={(e) => setEditData(prev => ({ ...prev, phone: e.target.value }))}
                  disabled={!isEditing}
                />
                <Input
                  label="Date of Birth"
                  type="date"
                  value={isEditing ? editData.dateOfBirth : profileData.dateOfBirth}
                  onChange={(e) => setEditData(prev => ({ ...prev, dateOfBirth: e.target.value }))}
                  disabled={!isEditing}
                />
              </div>
              
              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                <textarea
                  value={isEditing ? editData.address : profileData.address}
                  onChange={(e) => setEditData(prev => ({ ...prev, address: e.target.value }))}
                  disabled={!isEditing}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 disabled:bg-gray-50"
                />
              </div>
            </div>

            {/* Property Preferences */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Property Preferences</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Property Type</label>
                  <select
                    value={isEditing ? editData.propertyPreference : profileData.propertyPreference}
                    onChange={(e) => setEditData(prev => ({ ...prev, propertyPreference: e.target.value }))}
                    disabled={!isEditing}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 disabled:bg-gray-50"
                  >
                    <option value="1BHK Apartment">1BHK Apartment</option>
                    <option value="2BHK Apartment">2BHK Apartment</option>
                    <option value="3BHK Apartment">3BHK Apartment</option>
                    <option value="4BHK Apartment">4BHK Apartment</option>
                    <option value="Villa">Villa</option>
                    <option value="Penthouse">Penthouse</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Budget Range</label>
                  <select
                    value={isEditing ? editData.budgetRange : profileData.budgetRange}
                    onChange={(e) => setEditData(prev => ({ ...prev, budgetRange: e.target.value }))}
                    disabled={!isEditing}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 disabled:bg-gray-50"
                  >
                    <option value="Under ₹50L">Under ₹50L</option>
                    <option value="₹50L - ₹1Cr">₹50L - ₹1Cr</option>
                    <option value="₹1Cr - ₹2Cr">₹1Cr - ₹2Cr</option>
                    <option value="₹2Cr - ₹5Cr">₹2Cr - ₹5Cr</option>
                    <option value="Above ₹5Cr">Above ₹5Cr</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Financial Information */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Financial Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                  label="Occupation"
                  value={isEditing ? editData.occupation : profileData.occupation}
                  onChange={(e) => setEditData(prev => ({ ...prev, occupation: e.target.value }))}
                  disabled={!isEditing}
                />
                <Input
                  label="Annual Income"
                  value={isEditing ? editData.annualIncome : profileData.annualIncome}
                  onChange={(e) => setEditData(prev => ({ ...prev, annualIncome: e.target.value }))}
                  disabled={!isEditing}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RefereeProfile;