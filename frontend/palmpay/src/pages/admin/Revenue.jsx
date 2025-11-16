import React, { useState, useEffect } from 'react'
import { adminService } from '../../services/adminService'
import DataTable from '../../components/common/DataTable'
import LoadingSpinner from '../../components/common/LoadingSpinner'
import { formatCurrency, formatDate } from '../../utils/helpers'

const Revenue = () => {
  const [revenueData, setRevenueData] = useState({})
  const [transactions, setTransactions] = useState([])
  const [loading, setLoading] = useState(true)
  const [timeRange, setTimeRange] = useState('month')

  useEffect(() => {
    fetchRevenueData()
    fetchTransactions()
  }, [timeRange])

  const fetchRevenueData = async () => {
    try {
      const response = await adminService.getRevenue({ range: timeRange })
      setRevenueData(response.data || {})
    } catch (error) {
      console.error('Error fetching revenue data:', error)
    } finally {
      setLoading(false)
    }
  }

  const fetchTransactions = async () => {
    try {
      // Mock data for transactions
      const mockTransactions = [
        {
          id: '1',
          transactionId: 'TXN001',
          amount: 2500,
          fee: 25,
          netAmount: 2475,
          merchant: 'ABC Store',
          status: 'completed',
          date: '2024-01-15T10:30:00Z'
        },
        {
          id: '2',
          transactionId: 'TXN002',
          amount: 1800,
          fee: 18,
          netAmount: 1782,
          merchant: 'XYZ Electronics',
          status: 'completed',
          date: '2024-01-15T09:15:00Z'
        },
        {
          id: '3',
          transactionId: 'TXN003',
          amount: 3200,
          fee: 32,
          netAmount: 3168,
          merchant: 'Quick Service Restaurant',
          status: 'pending',
          date: '2024-01-14T16:45:00Z'
        }
      ]
      setTransactions(mockTransactions)
    } catch (error) {
      console.error('Error fetching transactions:', error)
    }
  }

  const revenueStats = [
    {
      title: 'Total Revenue',
      value: formatCurrency(revenueData.totalRevenue || 0),
      change: '+15.2%',
      description: 'From last month',
      color: 'green',
      icon: '💰'
    },
    {
      title: 'Platform Fees',
      value: formatCurrency(revenueData.platformFees || 0),
      change: '+8.5%',
      description: 'From last month',
      color: 'blue',
      icon: '💳'
    },
    {
      title: 'Net Revenue',
      value: formatCurrency(revenueData.netRevenue || 0),
      change: '+16.8%',
      description: 'From last month',
      color: 'purple',
      icon: '📈'
    },
    {
      title: 'Transactions',
      value: revenueData.totalTransactions || '0',
      change: '+12.3%',
      description: 'From last month',
      color: 'orange',
      icon: '🔄'
    }
  ]

  const columns = [
    {
      key: 'transactionId',
      header: 'Transaction ID',
      render: (value) => (
        <span className="font-mono text-sm font-medium text-gray-900">#{value}</span>
      )
    },
    {
      key: 'merchant',
      header: 'Merchant'
    },
    {
      key: 'amount',
      header: 'Amount',
      render: (value) => formatCurrency(value)
    },
    {
      key: 'fee',
      header: 'Fee',
      render: (value) => formatCurrency(value)
    },
    {
      key: 'netAmount',
      header: 'Net Amount',
      render: (value) => (
        <span className="font-semibold text-green-600">{formatCurrency(value)}</span>
      )
    },
    {
      key: 'status',
      header: 'Status',
      render: (value) => (
        <span className={`badge ${
          value === 'completed' ? 'badge-success' : 
          value === 'pending' ? 'badge-warning' : 
          'badge-error'
        }`}>
          {value}
        </span>
      )
    },
    {
      key: 'date',
      header: 'Date',
      render: (value) => formatDate(value)
    }
  ]

  if (loading) {
    return <LoadingSpinner text="Loading revenue data..." />
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-800">Revenue Analytics</h1>
          <p className="text-gray-600 mt-2">Track and analyze revenue performance</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
          >
            <option value="week">Last 7 days</option>
            <option value="month">Last 30 days</option>
            <option value="quarter">Last 90 days</option>
            <option value="year">This year</option>
          </select>
          <button className="btn btn-primary whitespace-nowrap">
            Export Report
          </button>
        </div>
      </div>

      {/* Revenue Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        {revenueStats.map((stat, index) => (
          <div key={index} className="bg-white p-4 lg:p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-600 truncate">{stat.title}</p>
                <p className="text-xl lg:text-2xl font-bold text-gray-900 mt-1 truncate">{stat.value}</p>
                <div className="flex items-center mt-2">
                  <span className={`text-sm font-medium ${
                    stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {stat.change}
                  </span>
                  <span className="text-sm text-gray-500 ml-2">{stat.description}</span>
                </div>
              </div>
              <div className={`p-3 rounded-lg ${
                stat.color === 'green' ? 'bg-green-100 text-green-600' :
                stat.color === 'blue' ? 'bg-blue-100 text-blue-600' :
                stat.color === 'purple' ? 'bg-purple-100 text-purple-600' :
                'bg-orange-100 text-orange-600'
              } flex-shrink-0 ml-3`}>
                <span className="text-2xl">{stat.icon}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts and Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-800">Revenue Trend</h3>
            <div className="flex items-center space-x-2 text-sm">
              <span className="flex items-center">
                <div className="w-3 h-3 bg-purple-500 rounded-full mr-2"></div>
                Revenue
              </span>
              <span className="flex items-center">
                <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                Fees
              </span>
            </div>
          </div>
          <div className="h-80 flex items-center justify-center bg-gradient-to-br from-purple-50 to-blue-50 rounded-lg">
            <div className="text-center">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
                <span className="text-2xl text-purple-600">📊</span>
              </div>
              <p className="text-gray-600">Revenue chart visualization</p>
              <p className="text-gray-500 text-sm mt-1">Interactive charts coming soon</p>
            </div>
          </div>
        </div>

        {/* Revenue Distribution */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-6">Revenue Distribution</h3>
          <div className="space-y-4">
            {[
              { category: 'Retail', amount: 45000, percentage: 45, color: 'bg-purple-500' },
              { category: 'Food & Beverage', amount: 28000, percentage: 28, color: 'bg-blue-500' },
              { category: 'Services', amount: 18000, percentage: 18, color: 'bg-green-500' },
              { category: 'Other', amount: 9000, percentage: 9, color: 'bg-orange-500' }
            ].map((item, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="font-medium text-gray-700">{item.category}</span>
                  <span className="text-gray-600">{formatCurrency(item.amount)} ({item.percentage}%)</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${item.color} transition-all duration-500`}
                    style={{ width: `${item.percentage}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800">Recent Revenue Transactions</h3>
        </div>
        <DataTable
          columns={columns}
          data={transactions}
          searchable={true}
          pagination={true}
        />
      </div>
    </div>
  )
}

export default Revenue