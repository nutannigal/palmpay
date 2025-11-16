import React, { useState, useEffect } from 'react'
import { merchantService } from '../../services/merchantService'
import DataTable from '../../components/common/DataTable'
import LoadingSpinner from '../../components/common/LoadingSpinner'
import { formatCurrency, formatDate } from '../../utils/helpers'

const TransactionHistoryPage  = () => {
  const [transactions, setTransactions] = useState([])
  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState({
    status: '',
    dateRange: ''
  })

  useEffect(() => {
    fetchTransactions()
  }, [filters])

  const fetchTransactions = async () => {
    try {
      const response = await merchantService.getTransactions(filters)
      setTransactions(response.data || [])
    } catch (error) {
      console.error('Error fetching transactions:', error)
      // Mock data for demonstration
      const mockTransactions = [
        {
          id: '1',
          transactionId: 'TXN20240115001',
          amount: 2500,
          customerName: 'John Doe',
          customerMobile: '+91 9876543210',
          status: 'completed',
          date: '2024-01-15T10:30:00Z',
          type: 'payment'
        },
        {
          id: '2',
          transactionId: 'TXN20240115002',
          amount: 1800,
          customerName: 'Jane Smith',
          customerMobile: '+91 9876543211',
          status: 'completed',
          date: '2024-01-15T09:15:00Z',
          type: 'payment'
        },
        {
          id: '3',
          transactionId: 'TXN20240114001',
          amount: 3200,
          customerName: 'Mike Johnson',
          customerMobile: '+91 9876543212',
          status: 'pending',
          date: '2024-01-14T16:45:00Z',
          type: 'refund'
        }
      ]
      setTransactions(mockTransactions)
    } finally {
      setLoading(false)
    }
  }

  const columns = [
    {
      key: 'transactionId',
      header: 'Transaction ID',
      render: (value) => (
        <span className="font-mono text-sm font-medium text-gray-900">#{value}</span>
      )
    },
    {
      key: 'customerName',
      header: 'Customer',
      render: (value, row) => (
        <div>
          <div className="font-medium text-gray-900">{value}</div>
          <div className="text-sm text-gray-500">{row.customerMobile}</div>
        </div>
      )
    },
    {
      key: 'amount',
      header: 'Amount',
      render: (value) => formatCurrency(value)
    },
    {
      key: 'type',
      header: 'Type',
      render: (value) => (
        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
          value === 'payment' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
        }`}>
          {value}
        </span>
      )
    },
    {
      key: 'status',
      header: 'Status',
      render: (value) => (
        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
          value === 'completed' ? 'bg-green-100 text-green-800' : 
          value === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
          'bg-red-100 text-red-800'
        }`}>
          {value}
        </span>
      )
    },
    {
      key: 'date',
      header: 'Date',
      render: (value) => formatDate(value, {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    }
  ]

  const actions = [
    {
      label: 'View',
      onClick: (row) => {
        console.log('View transaction:', row)
        // Implement view transaction details
      }
    },
    {
      label: 'Refund',
      variant: 'secondary',
      onClick: (row) => {
        console.log('Refund transaction:', row)
        // Implement refund functionality
      }
    }
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-800">Transaction History</h1>
          <p className="text-gray-600 mt-2">View and manage all your transactions</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <select
            value={filters.status}
            onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value }))}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
          >
            <option value="">All Status</option>
            <option value="completed">Completed</option>
            <option value="pending">Pending</option>
            <option value="failed">Failed</option>
          </select>
          <select
            value={filters.dateRange}
            onChange={(e) => setFilters(prev => ({ ...prev, dateRange: e.target.value }))}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
          >
            <option value="">All Time</option>
            <option value="today">Today</option>
            <option value="week">This Week</option>
            <option value="month">This Month</option>
          </select>
          <button className="bg-purple-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-purple-700 transition duration-200 whitespace-nowrap">
            Export
          </button>
        </div>
      </div>

      {/* Transaction Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 text-center">
          <div className="text-2xl font-bold text-green-600">{formatCurrency(4500)}</div>
          <p className="text-sm text-gray-600">Today's Revenue</p>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 text-center">
          <div className="text-2xl font-bold text-blue-600">23</div>
          <p className="text-sm text-gray-600">Total Transactions</p>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 text-center">
          <div className="text-2xl font-bold text-purple-600">98.5%</div>
          <p className="text-sm text-gray-600">Success Rate</p>
        </div>
      </div>

      {/* Transactions Table */}
      <DataTable
        columns={columns}
        data={transactions}
        loading={loading}
        searchable={true}
        pagination={true}
        actions={actions}
      />
    </div>
  )
}

export default TransactionHistoryPage 