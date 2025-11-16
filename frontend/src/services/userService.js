import api from './api'

export const userService = {
  getProfile: async () => {
    try {
      const response = await api.get('/users/profile')
      return response
    } catch (error) {
      throw error
    }
  },

  updateProfile: async (profileData) => {
    try {
      const response = await api.put('/users/profile', profileData)
      return response
    } catch (error) {
      throw error
    }
  },

  changePassword: async (passwordData) => {
    try {
      const response = await api.put('/users/change-password', passwordData)
      return response
    } catch (error) {
      throw error
    }
  },

  uploadAvatar: async (file) => {
    try {
      const formData = new FormData()
      formData.append('avatar', file)
      const response = await api.post('/users/avatar', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      return response
    } catch (error) {
      throw error
    }
  }
}