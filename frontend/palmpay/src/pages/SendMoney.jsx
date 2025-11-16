import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

const SendMoney = () => {
  const { user } = useAuth();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [recipients, setRecipients] = useState([]);
  const [recentContacts, setRecentContacts] = useState([]);

  // Form state
  const [formData, setFormData] = useState({
    recipientType: 'phone', // 'phone', 'email', 'account'
    phone: '',
    email: '',
    accountNumber: '',
    amount: '',
    description: '',
    pin: ''
  });

  // Mock recent contacts data
  useEffect(() => {
    // Simulate fetching recent contacts
    setRecentContacts([
      {
        id: 1,
        name: 'John Doe',
        phone: '+1234567890',
        avatar: 'JD',
        type: 'phone'
      },
      {
        id: 2,
        name: 'Jane Smith',
        phone: '+0987654321',
        avatar: 'JS',
        type: 'phone'
      },
      {
        id: 3,
        name: 'Mike Johnson',
        email: 'mike@example.com',
        avatar: 'MJ',
        type: 'email'
      }
    ]);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleRecipientTypeChange = (type) => {
    setFormData(prev => ({
      ...prev,
      recipientType: type,
      phone: '',
      email: '',
      accountNumber: ''
    }));
  };

  const handleQuickSelect = (contact) => {
    setFormData(prev => ({
      ...prev,
      recipientType: contact.type,
      phone: contact.phone || '',
      email: contact.email || '',
      accountNumber: contact.accountNumber || ''
    }));
    setStep(2);
  };

  const validateStep1 = () => {
    const { recipientType, phone, email, accountNumber } = formData;
    
    if (recipientType === 'phone' && !phone) {
      alert('Please enter phone number');
      return false;
    }
    if (recipientType === 'email' && !email) {
      alert('Please enter email address');
      return false;
    }
    if (recipientType === 'account' && !accountNumber) {
      alert('Please enter account number');
      return false;
    }
    
    return true;
  };

  const validateStep2 = () => {
    const { amount, description } = formData;
    
    if (!amount || amount <= 0) {
      alert('Please enter a valid amount');
      return false;
    }
    if (amount > (user?.balance || 0)) {
      alert('Insufficient balance');
      return false;
    }
    if (!description.trim()) {
      alert('Please enter a description');
      return false;
    }
    
    return true;
  };

  const handleNext = () => {
    if (step === 1 && validateStep1()) {
      setStep(2);
    } else if (step === 2 && validateStep2()) {
      setStep(3);
    }
  };

  const handleBack = () => {
    setStep(step - 1);
  };

  const handleSendMoney = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock successful transaction
      console.log('Transaction details:', formData);
      alert('Money sent successfully!');
      
      // Reset form
      setFormData({
        recipientType: 'phone',
        phone: '',
        email: '',
        accountNumber: '',
        amount: '',
        description: '',
        pin: ''
      });
      setStep(1);
      
    } catch (error) {
      alert('Failed to send money. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const getRecipientField = () => {
    switch (formData.recipientType) {
      case 'phone':
        return (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Phone Number
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              placeholder="Enter recipient's phone number"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00D2B8] focus:border-transparent outline-none"
              required
            />
          </div>
        );
      case 'email':
        return (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Enter recipient's email address"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00D2B8] focus:border-transparent outline-none"
              required
            />
          </div>
        );
      case 'account':
        return (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Account Number
            </label>
            <input
              type="text"
              name="accountNumber"
              value={formData.accountNumber}
              onChange={handleInputChange}
              placeholder="Enter recipient's account number"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00D2B8] focus:border-transparent outline-none"
              required
            />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Send Money</h1>
        <p className="text-gray-600">Transfer money securely to anyone</p>
      </div>

      {/* Progress Steps */}
      <div className="flex justify-center mb-8">
        <div className="flex items-center space-x-4">
          {[1, 2, 3].map((stepNumber) => (
            <React.Fragment key={stepNumber}>
              <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                step >= stepNumber 
                  ? 'bg-[#00D2B8] border-[#00D2B8] text-white' 
                  : 'border-gray-300 text-gray-500'
              } font-semibold`}>
                {stepNumber}
              </div>
              {stepNumber < 3 && (
                <div className={`w-16 h-1 ${
                  step > stepNumber ? 'bg-[#00D2B8]' : 'bg-gray-300'
                }`} />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-center mb-4">
        <div className="text-sm text-gray-600">
          {step === 1 && 'Recipient Details'}
          {step === 2 && 'Amount & Description'}
          {step === 3 && 'Confirmation'}
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
        {/* Step 1: Recipient Details */}
        {step === 1 && (
          <div className="space-y-6">
            {/* Recent Contacts */}
            {recentContacts.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Contacts</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {recentContacts.map((contact) => (
                    <button
                      key={contact.id}
                      onClick={() => handleQuickSelect(contact)}
                      className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:border-[#00D2B8] hover:bg-blue-50 transition-colors duration-200 text-left"
                    >
                      <div className="w-12 h-12 bg-[#00D2B8] rounded-full flex items-center justify-center">
                        <span className="text-white font-semibold text-sm">
                          {contact.avatar}
                        </span>
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">{contact.name}</div>
                        <div className="text-sm text-gray-500">
                          {contact.phone || contact.email}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
                <div className="text-center my-6">
                  <div className="text-gray-500">or</div>
                </div>
              </div>
            )}

            {/* Recipient Type Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-4">
                Send to:
              </label>
              <div className="grid grid-cols-3 gap-4 mb-6">
                {[
                  { type: 'phone', label: 'Phone', icon: '📱' },
                  { type: 'email', label: 'Email', icon: '📧' },
                  { type: 'account', label: 'Account', icon: '🏦' }
                ].map((option) => (
                  <button
                    key={option.type}
                    type="button"
                    onClick={() => handleRecipientTypeChange(option.type)}
                    className={`p-4 border-2 rounded-lg text-center transition-colors duration-200 ${
                      formData.recipientType === option.type
                        ? 'border-[#00D2B8] bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="text-2xl mb-2">{option.icon}</div>
                    <div className="font-medium text-gray-900">{option.label}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Recipient Input Field */}
            {getRecipientField()}
          </div>
        )}

        {/* Step 2: Amount & Description */}
        {step === 2 && (
          <div className="space-y-6">
            {/* Current Balance */}
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="text-sm text-gray-600">Available Balance</div>
              <div className="text-2xl font-bold text-gray-900">
                ${user?.balance?.toLocaleString() || '0.00'}
              </div>
            </div>

            {/* Amount Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Amount
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 font-semibold">
                  $
                </span>
                <input
                  type="number"
                  name="amount"
                  value={formData.amount}
                  onChange={handleInputChange}
                  placeholder="0.00"
                  min="0"
                  step="0.01"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00D2B8] focus:border-transparent outline-none"
                  required
                />
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description (Optional)
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Add a note for the recipient"
                rows="3"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00D2B8] focus:border-transparent outline-none resize-none"
              />
            </div>

            {/* Quick Amount Buttons */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Quick Amount
              </label>
              <div className="grid grid-cols-4 gap-2">
                {[10, 25, 50, 100].map((amount) => (
                  <button
                    key={amount}
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, amount: amount.toString() }))}
                    className="p-2 border border-gray-300 rounded-lg hover:border-[#00D2B8] hover:bg-blue-50 transition-colors duration-200 text-sm font-medium"
                  >
                    ${amount}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Confirmation */}
        {step === 3 && (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">💰</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Confirm Transfer
              </h3>
              <p className="text-gray-600">Please review the transaction details</p>
            </div>

            {/* Transaction Details */}
            <div className="bg-gray-50 rounded-lg p-6 space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Recipient:</span>
                <span className="font-semibold text-gray-900">
                  {formData.phone || formData.email || formData.accountNumber}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Amount:</span>
                <span className="text-2xl font-bold text-[#00D2B8]">
                  ${parseFloat(formData.amount || 0).toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Description:</span>
                <span className="font-semibold text-gray-900">
                  {formData.description || 'No description'}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Fee:</span>
                <span className="font-semibold text-gray-900">$0.00</span>
              </div>
              <div className="border-t pt-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Total:</span>
                  <span className="text-xl font-bold text-gray-900">
                    ${parseFloat(formData.amount || 0).toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            {/* Security PIN */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Enter Security PIN
              </label>
              <input
                type="password"
                name="pin"
                value={formData.pin}
                onChange={handleInputChange}
                placeholder="Enter your 4-digit PIN"
                maxLength="4"
                pattern="[0-9]{4}"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00D2B8] focus:border-transparent outline-none text-center text-2xl tracking-widest"
                required
              />
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-200">
          {step > 1 ? (
            <button
              type="button"
              onClick={handleBack}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200 font-medium"
            >
              Back
            </button>
          ) : (
            <div></div> // Empty div for spacing
          )}

          {step < 3 ? (
            <button
              type="button"
              onClick={handleNext}
              className="bg-[#00D2B8] text-white px-8 py-3 rounded-lg hover:bg-[#00A896] transition-colors duration-200 font-medium"
            >
              Continue
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSendMoney}
              disabled={loading || !formData.pin}
              className="bg-[#00D2B8] text-white px-8 py-3 rounded-lg hover:bg-[#00A896] disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors duration-200 font-medium"
            >
              {loading ? (
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Processing...</span>
                </div>
              ) : (
                'Send Money'
              )}
            </button>
          )}
        </div>
      </div>

      {/* Security Notice */}
      <div className="mt-6 text-center">
        <p className="text-sm text-gray-500">
          🔒 Your transactions are secured with bank-level encryption
        </p>
      </div>
    </div>
  );
};

export default SendMoney;