import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Building2 } from 'lucide-react';
import Button from '../components/ui/Button';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const [selectedRole, setSelectedRole] = useState<'admin' | 'referrer' | 'referee'>(
    (location.state as any)?.selectedRole || 'admin'
  );

  const handleLogin = () => {
    login(selectedRole);
    navigate(`/${selectedRole}`);
  };

  const roles = [
    { value: 'admin', label: 'Admin - Building Management', color: 'text-indigo-600' },
    { value: 'referrer', label: 'Referrer - Sales Agent', color: 'text-green-600' },
    { value: 'referee', label: 'Referee - Customer', color: 'text-teal-600' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="flex justify-center">
            <div className="w-12 h-12 bg-indigo-600 rounded-lg flex items-center justify-center">
              <Building2 className="w-6 h-6 text-white" />
            </div>
          </div>
          <h2 className="mt-6 text-3xl font-bold text-gray-900">
            Welcome Back
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Select your role to continue to your dashboard
          </p>
        </div>
        
        <div className="bg-white py-8 px-4 shadow-lg rounded-lg border border-gray-200">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Select Role
              </label>
              <div className="space-y-3">
                {roles.map((role) => (
                  <label
                    key={role.value}
                    className="flex items-center p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
                  >
                    <input
                      type="radio"
                      name="role"
                      value={role.value}
                      checked={selectedRole === role.value}
                      onChange={(e) => setSelectedRole(e.target.value as 'admin' | 'referrer' | 'referee')}
                      className="mr-3 text-indigo-600 focus:ring-indigo-500"
                    />
                    <span className={`font-medium ${role.color}`}>
                      {role.label}
                    </span>
                  </label>
                ))}
              </div>
            </div>
            
            <Button
              onClick={handleLogin}
              variant="primary"
              size="lg"
              className="w-full"
            >
              Continue to Dashboard
            </Button>
          </div>
        </div>
        
        <div className="text-center">
          <button
            onClick={() => navigate('/')}
            className="text-indigo-600 hover:text-indigo-500 text-sm font-medium"
          >
            ← Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;