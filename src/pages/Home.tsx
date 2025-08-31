import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Building2, Handshake, User } from 'lucide-react';

const Home: React.FC = () => {
  const navigate = useNavigate();

  const roles = [
    {
      id: 'admin',
      title: 'Admin',
      description: 'Manage leads, referrals, and team performance',
      icon: Building2,
      color: 'bg-indigo-500 hover:bg-indigo-600',
      textColor: 'text-indigo-700'
    },
    {
      id: 'referrer',
      title: 'Referrer',
      description: 'Refer customers and earn rewards',
      icon: Handshake,
      color: 'bg-green-500 hover:bg-green-600',
      textColor: 'text-green-700'
    },
    {
      id: 'referee',
      title: 'Referee',
      description: 'Track your property journey',
      icon: User,
      color: 'bg-teal-500 hover:bg-teal-600',
      textColor: 'text-teal-700'
    }
  ];

  const handleRoleSelect = (role: string) => {
    navigate('/login', { state: { selectedRole: role } });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div 
        className="relative bg-cover bg-center h-screen flex items-center justify-center"
        style={{
          backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url("https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")'
        }}
      >
        <div className="text-center text-white max-w-4xl mx-auto px-6">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            Your Gateway to 
            <span className="text-indigo-400"> Smart Real Estate</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 font-light leading-relaxed">
            Connect, refer, and grow with our comprehensive CRM platform designed for modern real estate professionals
          </p>
          <button
            onClick={() => document.getElementById('role-selection')?.scrollIntoView({ behavior: 'smooth' })}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-4 px-8 rounded-lg text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
          >
            Get Started Today
          </button>
        </div>
      </div>

      {/* Role Selection Section */}
      <div id="role-selection" className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Choose Your Role</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Select your role to access personalized features and dashboard tailored to your needs
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {roles.map((role) => (
              <div
                key={role.id}
                onClick={() => handleRoleSelect(role.id)}
                className="group cursor-pointer"
              >
                <div className="bg-white rounded-2xl p-8 text-center shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
                  <div className={`w-20 h-20 ${role.color} rounded-full flex items-center justify-center mx-auto mb-6 transition-all duration-300 group-hover:scale-110`}>
                    <role.icon className="w-10 h-10 text-white" />
                  </div>
                  <h3 className={`text-2xl font-bold ${role.textColor} mb-4`}>
                    {role.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {role.description}
                  </p>
                  <div className={`mt-6 inline-flex items-center text-sm font-semibold ${role.textColor} group-hover:text-opacity-80`}>
                    Continue as {role.title}
                    <svg className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-white py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Powerful Features</h2>
            <p className="text-xl text-gray-600">Everything you need to manage your real estate business</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: 'Lead Management', description: 'Track and manage all your leads in one place', icon: '📊' },
              { title: 'Referral System', description: 'Build a network of referrers and track performance', icon: '🤝' },
              { title: 'Reward Management', description: 'Automate rewards and track payouts', icon: '💰' },
              { title: 'Analytics Dashboard', description: 'Get insights with detailed reports and charts', icon: '📈' },
              { title: 'Mobile Responsive', description: 'Access your CRM from any device, anywhere', icon: '📱' },
              { title: 'Customer Portal', description: 'Provide customers with self-service options', icon: '👤' }
            ].map((feature, index) => (
              <div key={index} className="text-center p-6">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;