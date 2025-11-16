// src/pages/auth/LandingPage.jsx
import React from 'react'
import { useNavigate } from 'react-router-dom'

const LandingPage = () => {
  const navigate = useNavigate()

  const handleLogin = () => {
    navigate('/User-Login')
  }

  const handleRegister = () => {
    navigate('/')
  }

  return (
    <div 
      className="min-h-screen flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 relative"
      style={{
        background: 'linear-gradient(135deg, #0652C5 0%, #D4418E 100%)',
        backgroundSize: '400% 400%',
        animation: 'gradientShift 8s ease infinite'
      }}
    >
      <style jsx>{`
        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        .button-hover {
          transition: all 0.3s ease;
        }

        .button-hover:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(6, 82, 197, 0.3);
        }
      `}</style>

      {/* Logo in top left corner */}
      <div className="absolute top-6 left-6 sm:top-8 sm:left-8">
        <div className="flex items-center space-x-3">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
            <span style={{ color: '#0652C5' }}>Palm</span>
            <span style={{ color: '#D4418E' }}>Pay</span>
          </h1>
        </div>
        <p className="mt-1 text-sm sm:text-lg font-medium text-white opacity-90">
          Pulse of Payment
        </p>
      </div>

      {/* Main Content Centered */}
      <div className="flex-1 flex flex-col justify-center items-center">
        <div className="w-full max-w-md">
          {/* Main Card */}
          <div 
            className="bg-white rounded-2xl shadow-xl p-8 backdrop-blur-sm bg-opacity-95 border border-white border-opacity-20"
            style={{
              boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1), 0 8px 24px rgba(6, 82, 197, 0.15)'
            }}
          >
            {/* Header */}
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                Welcome to <span style={{ color: '#0652C5' }}>Palm</span><span style={{ color: '#D4418E' }}>Pay</span>
              </h2>
              <p className="text-gray-600 text-lg">
                Please enter your detail
              </p>
            </div>

            {/* Action Buttons */}
            <div className="space-y-4">
              {/* Login Button */}
              <button
                onClick={handleLogin}
                className="w-full py-4 px-4 rounded-xl text-lg font-semibold text-white transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-opacity-50 button-hover"
                style={{
                  background: 'linear-gradient(135deg, #0652C5 0%, #D4418E 100%)',
                  boxShadow: '0 4px 15px rgba(6, 82, 197, 0.4)'
                }}
                onMouseOver={(e) => {
                  e.target.style.transform = 'translateY(-2px)'
                  e.target.style.boxShadow = '0 8px 25px rgba(6, 82, 197, 0.6)'
                }}
                onMouseOut={(e) => {
                  e.target.style.transform = 'translateY(0)'
                  e.target.style.boxShadow = '0 4px 15px rgba(6, 82, 197, 0.4)'
                }}
              >
                Login
              </button>

              {/* Register Button */}
              <button
                onClick={handleRegister}
                className="w-full py-4 px-4 rounded-xl text-lg font-semibold text-white transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-opacity-50 button-hover"
                style={{
                  background: 'linear-gradient(135deg, #0652C5 0%, #7c1778 100%)',
                  boxShadow: '0 4px 15px rgba(6, 82, 197, 0.4)'
                }}
                onMouseOver={(e) => {
                  e.target.style.transform = 'translateY(-2px)'
                  e.target.style.boxShadow = '0 8px 25px rgba(6, 82, 197, 0.6)'
                }}
                onMouseOut={(e) => {
                  e.target.style.transform = 'translateY(0)'
                  e.target.style.boxShadow = '0 4px 15px rgba(6, 82, 197, 0.4)'
                }}
              >
                Register
              </button>
            </div>

            {/* Additional Info */}
            <div className="mt-8 text-center">
              <p className="text-gray-600 text-sm">
                By creating account you agree to our terms of services
              </p>
            </div>
          </div>

          {/* Security Note */}
          <div className="mt-6 text-center">
            
          </div>
        </div>
      </div>
    </div>
  )
}

export default LandingPage