import api from './api'

export const adminService = {
  getDashboardStats: async () => {
    try {
      const response = await api.get('/admin/dashboard')
      return response
    } catch (error) {
      throw error
    }
  },

  getMerchants: async (params = {}) => {
    try {
      const response = await api.get('/admin/merchants', { params })
      return response
    } catch (error) {
      throw error
    }
  },

  createMerchant: async (merchantData) => {
    try {
      const response = await api.post('/admin/merchants', merchantData)
      return response
    } catch (error) {
      throw error
    }
  },

  updateMerchant: async (id, merchantData) => {
    try {
      const response = await api.put(`/admin/merchants/${id}`, merchantData)
      return response
    } catch (error) {
      throw error
    }
  },

  deleteMerchant: async (id) => {
    try {
      const response = await api.delete(`/admin/merchants/${id}`)
      return response
    } catch (error) {
      throw error
    }
  },

  getUsers: async (params = {}) => {
    try {
      const response = await api.get('/admin/users', { params })
      return response
    } catch (error) {
      throw error
    }
  },

  getStaff: async (params = {}) => {
    try {
      const response = await api.get('/admin/staff', { params })
      return response
    } catch (error) {
      throw error
    }
  },

  getOrders: async (params = {}) => {
    try {
      const response = await api.get('/admin/orders', { params })
      return response
    } catch (error) {
      throw error
    }
  },

  getRevenue: async (params = {}) => {
    try {
      const response = await api.get('/admin/revenue', { params })
      return response
    } catch (error) {
      throw error
    }
  }
}
