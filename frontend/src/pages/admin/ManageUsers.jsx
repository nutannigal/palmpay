// src/pages/admin/ManageUsers.jsx
import React, { useState } from 'react'
import DataTable from '../../components/common/DataTable'

const ManageUsers = () => {
  const columns = [
    { key: 'id', header: 'ID', sortable: true },
    { key: 'name', header: 'Name', sortable: true },
    { key: 'email', header: 'Email', sortable: true },
    { key: 'phone', header: 'Phone' },
    { 
      key: 'role', 
      header: 'Role',
      render: (value) => (
        <span className={`badge ${
          value === 'admin' ? 'badge-error' :
          value === 'merchant' ? 'badge-success' :
          value === 'staff' ? 'badge-info' : 'badge-warning'
        }`}>
          {value}
        </span>
      )
    },
    { 
      key: 'status', 
      header: 'Status',
      render: (value) => (
        <span className={`badge ${value === 'active' ? 'badge-success' : 'badge-error'}`}>
          {value}
        </span>
      )
    },
    { key: 'registered', header: 'Registered', sortable: true },
    {
      key: 'actions',
      header: 'Actions',
      render: (_, row) => (
        <div className="flex space-x-2">
          <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
            Edit
          </button>
          <button className="text-red-600 hover:text-red-800 text-sm font-medium">
            Suspend
          </button>
        </div>
      )
    }
  ]

  const mockData = [
    { id: 1, name: 'John Doe', email: 'john@example.com', phone: '+91 9876543210', role: 'merchant', status: 'active', registered: '2024-01-15' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', phone: '+91 9876543211', role: 'customer', status: 'active', registered: '2024-01-20' },
    { id: 3, name: 'Admin User', email: 'admin@palmpay.com', phone: '+91 9876543212', role: 'admin', status: 'active', registered: '2024-01-10' },
    { id: 4, name: 'Bob Wilson', email: 'bob@example.com', phone: '+91 9876543213', role: 'merchant', status: 'suspended', registered: '2024-01-05' }
  ]

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-800">Manage Users</h1>
          <p className="text-gray-600 mt-2">View and manage all platform users</p>
        </div>
        <div className="flex space-x-3">
          <button className="btn btn-secondary">
            Export Users
          </button>
          <button className="btn btn-primary">
            + Add User
          </button>
        </div>
      </div>
      
      <DataTable
        columns={columns}
        data={mockData}
        searchable
        pagination
        pageSize={10}
      />
    </div>
  )
}

export default ManageUsers