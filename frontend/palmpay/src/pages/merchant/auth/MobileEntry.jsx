// src/pages/auth/MobileEntry.jsx
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const MobileEntry = () => {
  const [mobile, setMobile] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    
    if (!isMobileValid) {
      setError('Please enter a valid 10-digit mobile number')
      return
    }

    setLoading(true)
    
    try {
      // Simulate API call to send OTP
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      // Navigate to OTP verification page with the mobile number
      navigate('/verify-otp', { 
        state: { 
          mobile: `+91-${mobile}`
        } 
      })
    } catch (error) {
      console.error('Failed to send OTP:', error)
      setError('Failed to send OTP. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleMobileChange = (e) => {
    const value = e.target.value.replace(/\D/g, '')
    if (value.length <= 10) {
      setMobile(value)
      setError('')
    }
  }

  const isMobileValid = mobile.length === 10

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
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                Welcome
              </h2>
              <p className="text-gray-600">
                Please enter your details
              </p>
            </div>

            <form className="space-y-6" onSubmit={handleSubmit}>
              {/* Mobile Number Input */}
              <div>
                <label htmlFor="mobile" className="block text-sm font-medium text-gray-700 mb-3">
                  Mobile Number
                </label>
                <div className="mt-1">
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <span className="text-gray-500 sm:text-sm">+91</span>
                    </div>
                    <input
                      id="mobile"
                      name="mobile"
                      type="tel"
                      required
                      value={mobile}
                      onChange={handleMobileChange}
                      className="w-full pl-12 pr-4 py-4 text-lg border border-gray-300 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-200 bg-gray-50"
                      placeholder="1234567890"
                      maxLength="10"
                      pattern="[0-9]{10}"
                    />
                  </div>
                  {error && (
                    <p className="mt-2 text-sm text-red-600">{error}</p>
                  )}
                </div>
              </div>

              {/* Privacy Policy Link */}
              <div className="text-center">
                <a 
                  href="/privacy-policy" 
                  className="text-purple-600 hover:text-purple-700 text-sm font-medium transition-colors duration-200"
                >
                  Privacy Policy
                </a>
              </div>

              {/* Next Button with Gradient */}
              <button
                type="submit"
                disabled={loading || !isMobileValid}
                className="w-full py-4 px-4 rounded-xl text-lg font-semibold text-white transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed button-hover"
                style={{
                  background: 'linear-gradient(135deg, #0652C5 0%, #D4418E 100%)',
                  boxShadow: '0 4px 15px rgba(6, 82, 197, 0.4)'
                }}
                onMouseOver={(e) => {
                  if (!e.target.disabled) {
                    e.target.style.transform = 'translateY(-2px)'
                    e.target.style.boxShadow = '0 8px 25px rgba(6, 82, 197, 0.6)'
                  }
                }}
                onMouseOut={(e) => {
                  e.target.style.transform = 'translateY(0)'
                  e.target.style.boxShadow = '0 4px 15px rgba(6, 82, 197, 0.4)'
                }}
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    Sending OTP...
                  </div>
                ) : (
                  'Next'
                )}
              </button>

              {/* Already have account */}
              <div className="text-center pt-4">
                <p className="text-gray-600 text-sm">
                  Already have an account?{' '}
                  <button
                    type="button"
                    onClick={() => navigate('/User-Login')}
                    className="text-purple-600 hover:text-purple-700 font-medium transition-colors duration-200"
                  >
                    Log in
                  </button>
                </p>
              </div>
            </form>
          </div>

          {/* Security Note */}
          <div className="mt-6 text-center">
            <p className="text-white text-opacity-90 text-sm font-medium">
              🔒 Your information is secure and encrypted
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MobileEntry