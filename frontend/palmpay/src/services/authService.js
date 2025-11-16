// src/services/authService.js
import api from './api'

export const authService = {
  // Login with credentials
  login: async (credentials) => {
    try {
      const response = await api.post('/auth/login', credentials)
      return response.data
    } catch (error) {
      throw error.response?.data || { message: 'Login failed' }
    }
  },

  // Register new user
  register: async (userData) => {
    try {
      const response = await api.post('/auth/register', userData)
      return response.data
    } catch (error) {
      throw error.response?.data || { message: 'Registration failed' }
    }
  },

  // Logout user
  logout: async () => {
    try {
      const response = await api.post('/auth/logout')
      return response.data
    } catch (error) {
      throw error.response?.data || { message: 'Logout failed' }
    }
  },

  // Get current user profile
  getCurrentUser: async () => {
    try {
      const response = await api.get('/auth/me')
      return response.data
    } catch (error) {
      throw error.response?.data || { message: 'Failed to get user data' }
    }
  },

  // Forgot password
  forgotPassword: async (email) => {
    try {
      const response = await api.post('/auth/forgot-password', { email })
      return response.data
    } catch (error) {
      throw error.response?.data || { message: 'Password reset failed' }
    }
  },

  // Reset password
  resetPassword: async (token, password) => {
    try {
      const response = await api.post('/auth/reset-password', { token, password })
      return response.data
    } catch (error) {
      throw error.response?.data || { message: 'Password reset failed' }
    }
  },

  // Verify OTP
  verifyOTP: async (mobile, otp) => {
    try {
      const response = await api.post('/auth/verify-otp', { mobile, otp })
      return response.data
    } catch (error) {
      throw error.response?.data || { message: 'OTP verification failed' }
    }
  },

  // Send OTP
  sendOTP: async (mobile) => {
    try {
      const response = await api.post('/auth/send-otp', { mobile })
      return response.data
    } catch (error) {
      throw error.response?.data || { message: 'Failed to send OTP' }
    }
  },

  // Refresh token
  refreshToken: async () => {
    try {
      const response = await api.post('/auth/refresh-token')
      return response.data
    } catch (error) {
      throw error.response?.data || { message: 'Token refresh failed' }
    }
  },

  // Update user profile
  updateProfile: async (profileData) => {
    try {
      const response = await api.put('/auth/profile', profileData)
      return response.data
    } catch (error) {
      throw error.response?.data || { message: 'Profile update failed' }
    }
  }
}

export default authService