import api from './api'

export const merchantService = {
  getDashboardStats: async () => {
    try {
      const response = await api.get('/merchant/dashboard')
      return response
    } catch (error) {
      throw error
    }
  },

  getTransactions: async (params = {}) => {
    try {
      const response = await api.get('/merchant/transactions', { params })
      return response
    } catch (error) {
      throw error
    }
  },

  getSettlements: async (params = {}) => {
    try {
      const response = await api.get('/merchant/settlements', { params })
      return response
    } catch (error) {
      throw error
    }
  },

  getOrders: async (params = {}) => {
    try {
      const response = await api.get('/merchant/orders', { params })
      return response
    } catch (error) {
      throw error
    }
  },

  updateProfile: async (profileData) => {
    try {
      const response = await api.put('/merchant/profile', profileData)
      return response
    } catch (error) {
      throw error
    }
  },

  getAnalytics: async (params = {}) => {
    try {
      const response = await api.get('/merchant/analytics', { params })
      return response
    } catch (error) {
      throw error
    }
  }
}