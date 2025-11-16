// src/pages/auth/UsernameLogin.jsx
import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../../../hooks/useAuth'
import frontImg from '../../../assets/frontimg.jpg' // Import the image

const UsernameLogin = () => {
  const [formData, setFormData] = useState({
    username: '', // Changed from email to username
    password: ''
  })
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate()
  const { login } = useAuth()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    
    try {
      const result = await login(formData)
      
      if (result.success) {
        if (result.role === 'admin') {
          navigate('/admin/dashboard')
        } else if (result.role === 'merchant' || result.role === 'staff') {
          navigate('/merchant/dashboard')
        } else {
          navigate('/dashboard')
        }
      } else {
        console.log('Login failed:', result.message)
      }
    } catch (error) {
      console.error('Login error:', error)
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

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Login Form Section - Left Side */}
      <div className="flex-1 flex flex-col justify-center py-12 px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900">Welcome Back</h1>
            <p className="mt-2 text-gray-600">Please enter your details</p>
          </div>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
                  Username
                </label>
                <div className="mt-1">
                  <input
                    id="username"
                    name="username"
                    type="text"
                    autoComplete="username"
                    required
                    value={formData.username}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                    placeholder="Enter your username"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <div className="mt-1 relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    required
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 pr-12"
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? '🙈' : '👁️'}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
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

              <div>
  <button
    type="submit"
    disabled={loading}
    className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50 disabled:cursor-not-allowed transition duration-200"
  >
    {loading ? 'Signing in...' : 'Next'}
  </button>
</div>
            </form>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
               
              </div>

              <div className="mt-6">
               
              </div>
            </div>

            {/* Additional Links */}
            <div className="mt-6 text-center">
              <div className="text-xs text-gray-500 space-y-1">
                <p>
                  <a href="/terms" className="text-purple-600 hover:text-purple-500">Terms of Service</a>
                  {' '}and{' '}
                  <a href="/privacy" className="text-purple-600 hover:text-purple-500">Privacy Policy</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Image Section - Right Side - FULL SIZE */}
      <div className="hidden lg:flex flex-1">
        <div className="w-full h-full relative">
          <img 
            src={frontImg}
            alt="PalmPay Secure Payments"
            className="w-full h-full object-cover"
          />
         
            
          
        </div>
      </div>
    </div>
  )
}

export default UsernameLogin