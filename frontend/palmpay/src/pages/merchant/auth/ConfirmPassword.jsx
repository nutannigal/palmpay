// src/pages/auth/ConfirmPassword.jsx
import React, { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

const ConfirmPassword = () => {
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: ''
  })
  const [acceptPrivacy, setAcceptPrivacy] = useState(false)
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()

  const mobile = location.state?.mobile || '+91-XXXXXXXXXX'

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    
    try {
      // Simulate password setup API call
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      // Navigate to Merchant Dashboard
      navigate('/admin/dashboard', { 
        state: { 
          message: 'Registration completed successfully! Welcome to your dashboard.',
          mobile: mobile
        } 
      })
    } catch (error) {
      console.error('Password setup failed:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const isFormValid = 
    formData.password.length >= 6 && 
    formData.password === formData.confirmPassword && 
    acceptPrivacy

  const passwordStrength = () => {
    const length = formData.password.length
    if (length === 0) return { text: '', color: '' }
    if (length < 6) return { text: 'Weak', color: 'text-red-600' }
    if (length < 8) return { text: 'Fair', color: 'text-yellow-600' }
    return { text: 'Strong', color: 'text-green-600' }
  }

  const strength = passwordStrength()

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
                Confirm Password
              </h2>
              <p className="text-gray-600">
                This will be your login password
              </p>
              <p className="font-semibold text-gray-800 mt-1 text-lg">
                {mobile}
              </p>
            </div>

            <form className="space-y-6" onSubmit={handleSubmit}>
              {/* Password Input */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <div className="mt-1 relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    required
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-200 bg-gray-50 pr-12"
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? '🙈' : '👁️'}
                  </button>
                </div>
                {formData.password && (
                  <p className={`mt-2 text-sm font-medium ${strength.color}`}>
                    Password strength: {strength.text}
                  </p>
                )}
              </div>

              {/* Confirm Password Input */}
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                  Confirm Password
                </label>
                <div className="mt-1 relative">
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    required
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-200 bg-gray-50 pr-12"
                    placeholder="Confirm your password"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? '🙈' : '👁️'}
                  </button>
                </div>
                {formData.confirmPassword && formData.password !== formData.confirmPassword && (
                  <p className="mt-2 text-sm text-red-600 font-medium">
                    Passwords do not match
                  </p>
                )}
              </div>

              {/* Privacy Policy Checkbox */}
              <div className="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg border border-gray-200">
                <input
                  id="privacy-policy"
                  name="privacy-policy"
                  type="checkbox"
                  required
                  checked={acceptPrivacy}
                  onChange={(e) => setAcceptPrivacy(e.target.checked)}
                  className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded mt-1"
                />
                <label htmlFor="privacy-policy" className="text-sm text-gray-700">
                  I agree to the{' '}
                  <a href="/privacy" className="text-purple-600 hover:text-purple-500 font-medium">
                    Privacy Policy
                  </a>
                </label>
              </div>

              {/* Next Button with Gradient */}
              <button
                type="submit"
                disabled={loading || !isFormValid}
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
                    Setting up...
                  </div>
                ) : (
                  'Next'
                )}
              </button>

              {/* Back Link */}
              <div className="text-center pt-2">
                <button
                  type="button"
                  onClick={() => navigate(-1)}
                  className="text-purple-600 hover:text-purple-700 font-medium transition-colors duration-200 flex items-center justify-center space-x-2 mx-auto"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                  <span>Back to OTP verification</span>
                </button>
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

export default ConfirmPassword