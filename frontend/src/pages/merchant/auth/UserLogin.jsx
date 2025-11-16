import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useAuth from '../../../context/AuthContext'
// import { useAuth } from '../../context/AuthContext'

const UsernameLogin = () => {
  const [formData, setFormData] = useState({
    mobile: '',
    password: ''
  })
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const { mobileLogin } = useAuth()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    
    try {
      const result = await mobileLogin(formData.mobile, formData.password)
      
      if (result.success) {
        // Login successful - navigate to mobile-entry
        console.log('Login successful:', result.data.user)
        
        // Navigate to mobile-entry with user data
        navigate('/mobile-entry', { 
          state: { 
            user: result.data.user,
            token: result.data.token
          } 
        })
      } else {
        // Login failed - show error
        setError(result.message || 'Login failed. Please try again.')
      }
    } catch (error) {
      console.error('Login error:', error)
      setError('An unexpected error occurred. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
    // Clear error when user starts typing
    if (error) setError('')
  }

  const isFormValid = formData.mobile.length === 10 && formData.password.length >= 6

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
                Welcome Back
              </h2>
              <p className="text-gray-600">
                Please enter your details
              </p>
            </div>

            {/* Error Message */}
            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
                {error}
              </div>
            )}

            <form className="space-y-6" onSubmit={handleSubmit}>
              {/* Mobile Number Input */}
              <div>
                <label htmlFor="mobile" className="block text-sm font-medium text-gray-700 mb-2">
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
                      value={formData.mobile}
                      onChange={(e) => setFormData(prev => ({...prev, mobile: e.target.value.replace(/\D/g, '')}))}
                      className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-200 bg-gray-50"
                      placeholder="1234567890"
                      maxLength="10"
                      pattern="[0-9]{10}"
                    />
                  </div>
                </div>
              </div>

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
                    minLength="6"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? '🙈' : '👁️'}
                  </button>
                </div>
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                    Remember me
                  </label>
                </div>

                <div className="text-sm">
                  <a href="/forgot-password" className="font-medium text-purple-600 hover:text-purple-500">
                    Forgot your password?
                  </a>
                </div>
              </div>

              {/* Login Button with Gradient */}
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
                    Signing in...
                  </div>
                ) : (
                  'Login'
                )}
              </button>

              {/* Register Link */}
              <div className="text-center pt-4">
                <p className="text-gray-600 text-sm">
                  Don't have an account?{' '}
                  <button
                    type="button"
                    onClick={() => navigate('/mobile-entry')}
                    className="font-semibold text-purple-600 hover:text-purple-700 transition-colors duration-200"
                  >
                    Register now
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

export default UsernameLogin