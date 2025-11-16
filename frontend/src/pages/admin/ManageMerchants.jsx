// src/pages/admin/ManageMerchants.jsx
import React, { useState } from 'react'
import DataTable from '../../components/common/DataTable'
import CreateMerchant from '../../components/admin/CreateMerchant' // Correct import

const ManageMerchants = () => {
  const [showCreateModal, setShowCreateModal] = useState(false)

  const columns = [
    { key: 'id', header: 'ID', sortable: true },
    { key: 'name', header: 'Business Name', sortable: true },
    { key: 'email', header: 'Email', sortable: true },
    { key: 'phone', header: 'Phone' },
    { 
      key: 'status', 
      header: 'Status',
      render: (value) => (
        <span className={`badge ${value === 'active' ? 'badge-success' : value === 'pending' ? 'badge-warning' : 'badge-error'}`}>
          {value}
        </span>
      )
    },
    { key: 'joinDate', header: 'Join Date', sortable: true },
    {
      key: 'actions',
      header: 'Actions',
      render: (_, row) => (
        <div className="flex space-x-2">
          <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
            Edit
          </button>
          <button className="text-red-600 hover:text-red-800 text-sm font-medium">
            Delete
          </button>
        </div>
      )
    }
  ]

  const mockData = [
    { id: 1, name: 'ABC Store', email: 'abc@store.com', phone: '+91 9876543210', status: 'active', joinDate: '2024-01-15' },
    { id: 2, name: 'XYZ Mart', email: 'xyz@mart.com', phone: '+91 9876543211', status: 'pending', joinDate: '2024-01-20' },
    { id: 3, name: 'Super Shop', email: 'super@shop.com', phone: '+91 9876543212', status: 'active', joinDate: '2024-01-10' },
    { id: 4, name: 'Mega Store', email: 'mega@store.com', phone: '+91 9876543213', status: 'suspended', joinDate: '2024-01-05' }
  ]

  const handleCreateSuccess = () => {
    setShowCreateModal(false)
    // Refresh merchants list or show success message
    console.log('Merchant created successfully')
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-800">Manage Merchants</h1>
          <p className="text-gray-600 mt-2">View and manage all registered merchants</p>
        </div>
        <button 
          className="btn btn-primary"
          onClick={() => setShowCreateModal(true)}
        >
          + Add Merchant
        </button>
      </div>
      
      <DataTable
        columns={columns}
        data={mockData}
        searchable
        pagination
        pageSize={10}
      />

      {/* Create Merchant Modal */}
      <CreateMerchant
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onSuccess={handleCreateSuccess}
      />
    </div>
  )
}

export default ManageMerchants