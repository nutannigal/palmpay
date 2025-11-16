import React, { useState, useEffect } from 'react'
import { merchantService } from '../../services/merchantService'
import DataTable from '../../components/common/DataTable'
import LoadingSpinner from '../../components/common/LoadingSpinner'
import { formatCurrency, formatDate } from '../../utils/helpers'

const TotalOrderPage  = () => {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchOrders()
  }, [])

  const fetchOrders = async () => {
    try {
      const response = await merchantService.getOrders()
      setOrders(response.data || [])
    } catch (error) {
      console.error('Error fetching orders:', error)
      // Mock data for demonstration
      const mockOrders = [
        {
          id: '1',
          orderId: 'ORD20240115001',
          customerName: 'John Doe',
          amount: 2500,
          status: 'completed',
          date: '2024-01-15T10:30:00Z',
          items: 3
        },
        {
          id: '2',
          orderId: 'ORD20240115002',
          customerName: 'Jane Smith',
          amount: 1800,
          status: 'processing',
          date: '2024-01-15T09:15:00Z',
          items: 2
        },
        {
          id: '3',
          orderId: 'ORD20240114001',
          customerName: 'Mike Johnson',
          amount: 3200,
          status: 'pending',
          date: '2024-01-14T16:45:00Z',
          items: 4
        }
      ]
      setOrders(mockOrders)
    } finally {
      setLoading(false)
    }
  }

  const columns = [
    {
      key: 'orderId',
      header: 'Order ID',
      render: (value) => (
        <span className="font-mono text-sm font-medium text-gray-900">#{value}</span>
      )
    },
    {
      key: 'customerName',
      header: 'Customer'
    },
    {
      key: 'amount',
      header: 'Amount',
      render: (value) => formatCurrency(value)
    },
    {
      key: 'items',
      header: 'Items'
    },
    {
      key: 'status',
      header: 'Status',
      render: (value) => (
        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
          value === 'completed' ? 'bg-green-100 text-green-800' : 
          value === 'processing' ? 'bg-blue-100 text-blue-800' : 
          'bg-yellow-100 text-yellow-800'
        }`}>
          {value}
        </span>
      )
    },
    {
      key: 'date',
      header: 'Order Date',
      render: (value) => formatDate(value)
    }
  ]

  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-800">Order Management</h1>
          <p className="text-gray-600 mt-2">Manage and track customer orders</p>
        </div>
        <div className="flex gap-3">
          <button className="bg-purple-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-purple-700 transition duration-200">
            New Order
          </button>
        </div>
      </div>

      <DataTable
        columns={columns}
        data={orders}
        loading={loading}
        searchable={true}
        pagination={true}
      />
    </div>
  )
}

export default TotalOrderPage 