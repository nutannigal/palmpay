import React, { useState } from 'react';
import HandScanner from './HandScanner';

const MerchantRegistration = () => {
  const [mobileNumber, setMobileNumber] = useState('+91-1234567890');
  const [otp, setOtp] = useState('129009');
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isOtpVerified, setIsOtpVerified] = useState(false);
  const [currentStep, setCurrentStep] = useState('otp'); // 'otp' or 'handScan'
  const [otpError, setOtpError] = useState('');

  const handleSendOtp = () => {
    setIsOtpSent(true);
    setOtpError('');
    // In real app, this would call an API to send OTP
    console.log('OTP sent to:', mobileNumber);
  };

  const handleContinue = () => {
    console.log('Verifying OTP:', otp);
    
    // OTP Verification Logic
    const correctOtp = '129009'; // This should come from your backend in real app
    
    if (otp === correctOtp) {
      console.log('OTP verified successfully');
      setIsOtpVerified(true);
      setOtpError('');
      // Navigate to hand scanner after successful OTP verification
      setCurrentStep('handScan');
    } else {
      console.log('Invalid OTP');
      setOtpError('Invalid OTP. Please enter the correct code.');
      setIsOtpVerified(false);
    }
  };

  const handleResendOtp = () => {
    setOtp('');
    setIsOtpSent(true);
    setOtpError('');
    // In real app, this would call an API to resend OTP
    console.log('Resending OTP to:', mobileNumber);
  };

  const handleBackToOtp = () => {
    setCurrentStep('otp');
  };

  // If we're on the hand scanner step, show the HandScanner component
  if (currentStep === 'handScan') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-white">
        {/* Top Navigation */}
        <nav className="bg-white shadow-sm border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              {/* Left side - Logo */}
              <div className="flex items-center">
                <h1 className="text-2xl font-bold text-purple-900">PalmPay</h1>
                <span className="ml-2 text-sm text-gray-500">Merchant Portal</span>
              </div>

              {/* Right side - Back button and User info */}
              <div className="flex items-center space-x-4">
                <button
                  onClick={handleBackToOtp}
                  className="flex items-center text-gray-600 hover:text-purple-600 transition-colors"
                >
                  <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                  Back to OTP
                </button>
                
                {/* User Profile */}
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                    M
                  </div>
                  <span className="text-gray-700">Merchant User</span>
                </div>
              </div>
            </div>
          </div>
        </nav>

        {/* Hand Scanner Component */}
        <HandScanner onComplete={() => console.log('Hand scan completed')} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-white">
      {/* Top Navigation */}
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Left side - Logo */}
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-purple-900">PalmPay</h1>
              <span className="ml-2 text-sm text-gray-500">Merchant Portal</span>
            </div>

            {/* Right side - Search, Notification, User */}
            <div className="flex items-center space-x-4">
              {/* Search Field */}
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent w-64"
                />
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>

              {/* Notification Bell */}
              <button className="relative p-2 text-gray-600 hover:text-purple-600 transition-colors">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5zM10.5 3.75a6 6 0 00-6 6v2.25l-2 2.25h16.5l-2-2.25V9.75a6 6 0 00-6-6v0z" />
                </svg>
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>

              {/* User Profile with Register Button */}
              <div className="flex items-center space-x-3">
                <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors font-medium">
                  Register User
                </button>
                <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                  M
                </div>
                <span className="text-gray-700">Merchant User</span>
                {/* Arrow Down */}
                <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Registration Content */}
      <div className="flex items-center justify-center p-4 py-8">
        <div className="max-w-md w-full">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-purple-900 mb-2">PalmPay</h1>
            <p className="text-gray-600">Price of Payment</p>
          </div>

          {/* Registration Card */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            {/* Welcome Section */}
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Hello...</h2>
              <p className="text-gray-600">User Registration</p>
            </div>

            {/* Mobile Number Section */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Mobile Number
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={mobileNumber}
                  onChange={(e) => setMobileNumber(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-all duration-200"
                  placeholder="+91-1234567890"
                />
                {!isOtpSent && (
                  <button
                    onClick={handleSendOtp}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-purple-600 text-white px-4 py-2 rounded-md text-sm hover:bg-purple-700 transition-colors font-medium"
                  >
                    Send OTP
                  </button>
                )}
              </div>
            </div>

            {/* OTP Section */}
            {isOtpSent && (
              <div className="mb-6">
                <div className="flex justify-between items-center mb-3">
                  <label className="block text-sm font-medium text-gray-700">
                    OTP
                  </label>
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center space-x-1">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="text-xs text-green-600">OTP Sent</span>
                    </div>
                    <button 
                      onClick={handleResendOtp}
                      className="text-purple-600 text-sm hover:text-purple-700 transition-colors font-medium"
                    >
                      Resend OTP
                    </button>
                  </div>
                </div>
                
                <div className="relative">
                  <input
                    type="text"
                    value={otp}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, '').slice(0, 6);
                      setOtp(value);
                      setOtpError(''); // Clear error when user types
                    }}
                    className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-purple-600 transition-all duration-200 text-center text-lg font-semibold tracking-widest ${
                      otpError 
                        ? 'border-red-300 bg-red-50 focus:border-red-400' 
                        : 'border-purple-200 bg-purple-50 focus:border-purple-400'
                    }`}
                    placeholder="Enter OTP"
                    maxLength={6}
                  />
                  
                  {/* OTP Countdown Timer */}
                  <div className="absolute -bottom-6 left-0 right-0 text-center">
                    <span className="text-xs text-gray-500 bg-white px-2">
                      OTP expires in: <span className="font-semibold text-purple-600">02:59</span>
                    </span>
                  </div>
                </div>

                {/* OTP Error Message */}
                {otpError && (
                  <div className="mt-2 text-sm text-red-600 text-center bg-red-50 py-2 rounded-lg">
                    {otpError}
                  </div>
                )}
                
                <p className="text-xs text-gray-500 mt-8 text-center">
                  OTP sent to <span className="font-semibold text-purple-600">{mobileNumber}</span>
                </p>
              </div>
            )}

            {/* Continue Button */}
            <button
              onClick={handleContinue}
              disabled={!isOtpSent || otp.length !== 6}
              className="w-full bg-purple-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-purple-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 mb-4 flex items-center justify-center"
            >
              Verify & Continue
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            {/* Alternative Options */}
            <div className="text-center mb-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">Or continue with</span>
                </div>
              </div>
            </div>

            {/* Social Login Options */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              <button className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                <svg className="w-5 h-5 mr-2 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                </svg>
                Twitter
              </button>
              <button className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                <svg className="w-5 h-5 mr-2 text-red-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                GitHub
              </button>
            </div>

            {/* Footer Links */}
            <div className="text-center">
              <p className="text-sm text-gray-600">
                Already have an account?{' '}
                <button className="text-purple-600 hover:text-purple-700 font-medium">
                  Sign In
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MerchantRegistration;