
// src/components/admin/CreateMerchant.jsx
import React, { useState } from 'react'

const CreateMerchant = ({ isOpen, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    businessName: '',
    businessType: '',
    address: ''
  })
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      console.log('Merchant created:', formData)
      onSuccess?.()
      onClose()
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        businessName: '',
        businessType: '',
        address: ''
      })
    } catch (error) {
      console.error('Failed to create merchant:', error)
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

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-800">Add New Merchant</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors text-xl"
            >
              ✕
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="form-label">Full Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="input"
                placeholder="Enter full name"
                required
              />
            </div>

            <div>
              <label className="form-label">Email Address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="input"
                placeholder="Enter email address"
                required
              />
            </div>

            <div>
              <label className="form-label">Phone Number</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="input"
                placeholder="Enter phone number"
                required
              />
            </div>

            <div>
              <label className="form-label">Business Name</label>
              <input
                type="text"
                name="businessName"
                value={formData.businessName}
                onChange={handleChange}
                className="input"
                placeholder="Enter business name"
                required
              />
            </div>

            <div>
              <label className="form-label">Business Type</label>
              <select
                name="businessType"
                value={formData.businessType}
                onChange={handleChange}
                className="input"
                required
              >
                <option value="">Select business type</option>
                <option value="retail">Retail</option>
                <option value="ecommerce">E-commerce</option>
                <option value="service">Service</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label className="form-label">Business Address</label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="input resize-none"
                rows="3"
                placeholder="Enter business address"
                required
              />
            </div>

            <div className="flex space-x-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="btn btn-secondary flex-1"
                disabled={loading}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn btn-primary flex-1"
                disabled={loading}
              >
                {loading ? 'Creating...' : 'Create Merchant'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default CreateMerchant