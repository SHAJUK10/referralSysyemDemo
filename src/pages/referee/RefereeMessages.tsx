import React, { useState } from 'react';
import { MessageCircle, Send, User, Clock, Paperclip } from 'lucide-react';
import Button from '../../components/ui/Button';

interface Message {
  id: string;
  sender: 'agent' | 'customer';
  content: string;
  timestamp: string;
  type: 'text' | 'file';
  fileName?: string;
}

const RefereeMessages: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'agent',
      content: 'Hello! Welcome to RealEstate Pro. I\'m Priya, your assigned agent. How can I help you today?',
      timestamp: '2025-01-15T09:00:00Z',
      type: 'text'
    },
    {
      id: '2',
      sender: 'customer',
      content: 'Hi Priya! I\'m interested in the 2BHK apartment. Can you share more details about the amenities?',
      timestamp: '2025-01-15T09:15:00Z',
      type: 'text'
    },
    {
      id: '3',
      sender: 'agent',
      content: 'Absolutely! The project includes a swimming pool, gym, children\'s play area, and 24/7 security. I\'ll send you the detailed brochure.',
      timestamp: '2025-01-15T09:20:00Z',
      type: 'text'
    },
    {
      id: '4',
      sender: 'agent',
      content: 'Property_Brochure_LuxuryApartments.pdf',
      timestamp: '2025-01-15T09:21:00Z',
      type: 'file',
      fileName: 'Property_Brochure_LuxuryApartments.pdf'
    },
    {
      id: '5',
      sender: 'customer',
      content: 'Thank you! The amenities look great. When can we schedule a site visit?',
      timestamp: '2025-01-15T10:30:00Z',
      type: 'text'
    },
    {
      id: '6',
      sender: 'agent',
      content: 'I have availability this weekend. Would Saturday at 3:00 PM work for you?',
      timestamp: '2025-01-15T10:35:00Z',
      type: 'text'
    }
  ]);

  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const message: Message = {
      id: Date.now().toString(),
      sender: 'customer',
      content: newMessage,
      timestamp: new Date().toISOString(),
      type: 'text'
    };

    setMessages(prev => [...prev, message]);
    setNewMessage('');

    // Simulate agent typing
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      const agentResponse: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'agent',
        content: 'Thank you for your message. I\'ll get back to you shortly with the information you requested.',
        timestamp: new Date().toISOString(),
        type: 'text'
      };
      setMessages(prev => [...prev, agentResponse]);
    }, 2000);
  };

  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Messages</h1>
          <p className="text-gray-600 mt-1">Chat with your assigned sales agent</p>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 flex flex-col h-96">
          {/* Chat Header */}
          <div className="px-6 py-4 border-b border-gray-200 flex items-center space-x-3">
            <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center">
              <User className="w-5 h-5 text-indigo-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Priya Sharma</h3>
              <p className="text-sm text-green-600">Online</p>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'customer' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                  message.sender === 'customer'
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-100 text-gray-900'
                }`}>
                  {message.type === 'file' ? (
                    <div className="flex items-center space-x-2">
                      <Paperclip className="w-4 h-4" />
                      <span className="text-sm">{message.fileName}</span>
                    </div>
                  ) : (
                    <p className="text-sm">{message.content}</p>
                  )}
                  <p className={`text-xs mt-1 ${
                    message.sender === 'customer' ? 'text-indigo-200' : 'text-gray-500'
                  }`}>
                    {formatTime(message.timestamp)}
                  </p>
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-gray-100 text-gray-900 px-4 py-2 rounded-lg">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Message Input */}
          <div className="px-6 py-4 border-t border-gray-200">
            <form onSubmit={handleSendMessage} className="flex space-x-3">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
              <Button
                type="submit"
                variant="primary"
                size="sm"
                icon={Send}
                disabled={!newMessage.trim()}
              >
                Send
              </Button>
            </form>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-6 bg-gray-50 rounded-lg p-6">
          <h3 className="font-semibold text-gray-900 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button variant="outline" size="sm" icon={Phone}>
              Request Callback
            </Button>
            <Button variant="outline" size="sm" icon={Calendar}>
              Schedule Meeting
            </Button>
            <Button variant="outline" size="sm" icon={Paperclip}>
              Share Documents
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RefereeMessages;