import React, { useState, useEffect } from 'react'
// import { merchantService } from './src/services/merchantService'
// import DataTable from './src/components/common/DataTable'
// import LoadingSpinner from './src/components/common/LoadingSpinner'
// import { formatCurrency, formatDate } from './src/utils/helpers'

const SettlementHistoryPage = () => {
  const [settlements, setSettlements] = useState([])
  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState({
    status: '',
    dateRange: ''
  })
  const [pagination, setPagination] = useState({
    currentPage: 1,
    pageSize: 10,
    totalItems: 0,
    totalPages: 0
  })

  useEffect(() => {
    fetchSettlements()
  }, [filters, pagination.currentPage, pagination.pageSize])

  const fetchSettlements = async () => {
    try {
      setLoading(true)
      const response = await merchantService.getSettlements({
        ...filters,
        page: pagination.currentPage,
        limit: pagination.pageSize
      })
      
      // If API returns paginated response
      if (response.data && response.pagination) {
        setSettlements(response.data)
        setPagination(prev => ({
          ...prev,
          totalItems: response.pagination.total,
          totalPages: response.pagination.totalPages
        }))
      } else {
        // Mock data for demonstration with pagination
        const allMockSettlements = [
          {
            id: '1',
            settlementId: 'SET20240115001',
            userName: 'John Doe',
            date: '2024-01-15T10:30:00Z',
            actualAmount: 2500,
            palmPayFees: 25,
            settlementAmount: 2475,
            status: 'completed'
          },
          {
            id: '2',
            settlementId: 'SET20240115002',
            userName: 'Jane Smith',
            date: '2024-01-15T09:15:00Z',
            actualAmount: 1800,
            palmPayFees: 18,
            settlementAmount: 1782,
            status: 'completed'
          },
          {
            id: '3',
            settlementId: 'SET20240114001',
            userName: 'Mike Johnson',
            date: '2024-01-14T16:45:00Z',
            actualAmount: 3200,
            palmPayFees: 32,
            settlementAmount: 3168,
            status: 'pending'
          },
          {
            id: '4',
            settlementId: 'SET20240113001',
            userName: 'Sarah Wilson',
            date: '2024-01-13T14:20:00Z',
            actualAmount: 1500,
            palmPayFees: 15,
            settlementAmount: 1485,
            status: 'completed'
          },
          {
            id: '5',
            settlementId: 'SET20240112001',
            userName: 'David Brown',
            date: '2024-01-12T11:45:00Z',
            actualAmount: 2800,
            palmPayFees: 28,
            settlementAmount: 2772,
            status: 'failed'
          },
          {
            id: '6',
            settlementId: 'SET20240111001',
            userName: 'Emily Davis',
            date: '2024-01-11T16:30:00Z',
            actualAmount: 1200,
            palmPayFees: 12,
            settlementAmount: 1188,
            status: 'completed'
          },
          {
            id: '7',
            settlementId: 'SET20240110001',
            userName: 'Robert Wilson',
            date: '2024-01-10T13:15:00Z',
            actualAmount: 3500,
            palmPayFees: 35,
            settlementAmount: 3465,
            status: 'completed'
          },
          {
            id: '8',
            settlementId: 'SET20240109001',
            userName: 'Lisa Anderson',
            date: '2024-01-09T10:00:00Z',
            actualAmount: 900,
            palmPayFees: 9,
            settlementAmount: 891,
            status: 'pending'
          },
          {
            id: '9',
            settlementId: 'SET20240108001',
            userName: 'Michael Clark',
            date: '2024-01-08T15:45:00Z',
            actualAmount: 2200,
            palmPayFees: 22,
            settlementAmount: 2178,
            status: 'completed'
          },
          {
            id: '10',
            settlementId: 'SET20240107001',
            userName: 'Jennifer Lee',
            date: '2024-01-07T12:30:00Z',
            actualAmount: 1800,
            palmPayFees: 18,
            settlementAmount: 1782,
            status: 'completed'
          },
          {
            id: '11',
            settlementId: 'SET20240106001',
            userName: 'Christopher Martin',
            date: '2024-01-06T09:15:00Z',
            actualAmount: 3000,
            palmPayFees: 30,
            settlementAmount: 2970,
            status: 'completed'
          },
          {
            id: '12',
            settlementId: 'SET20240105001',
            userName: 'Amanda Taylor',
            date: '2024-01-05T17:20:00Z',
            actualAmount: 1400,
            palmPayFees: 14,
            settlementAmount: 1386,
            status: 'failed'
          }
        ]

        // Apply filters
        let filteredData = allMockSettlements
        if (filters.status) {
          filteredData = filteredData.filter(st => st.status === filters.status)
        }
        if (filters.dateRange) {
          // Simple date filtering for demo
          const today = new Date()
          const startDate = new Date()
          switch (filters.dateRange) {
            case 'today':
              startDate.setDate(today.getDate() - 1)
              break
            case 'week':
              startDate.setDate(today.getDate() - 7)
              break
            case 'month':
              startDate.setDate(today.getDate() - 30)
              break
            default:
              break
          }
          filteredData = filteredData.filter(st => new Date(st.date) >= startDate)
        }

        // Apply pagination
        const startIndex = (pagination.currentPage - 1) * pagination.pageSize
        const endIndex = startIndex + pagination.pageSize
        const paginatedData = filteredData.slice(startIndex, endIndex)

        setSettlements(paginatedData)
        setPagination(prev => ({
          ...prev,
          totalItems: filteredData.length,
          totalPages: Math.ceil(filteredData.length / pagination.pageSize)
        }))
      }
    } catch (error) {
      console.error('Error fetching settlements:', error)
      // Fallback to empty array
      setSettlements([])
    } finally {
      setLoading(false)
    }
  }

  const handlePageChange = (newPage) => {
    setPagination(prev => ({
      ...prev,
      currentPage: newPage
    }))
  }

  const handlePageSizeChange = (newSize) => {
    setPagination(prev => ({
      ...prev,
      pageSize: parseInt(newSize),
      currentPage: 1 // Reset to first page when changing page size
    }))
  }

  const columns = [
    {
      key: 'settlementId',
      header: 'Settlement ID',
      sortable: true,
      render: (value) => (
        <span className="font-mono text-sm font-medium text-gray-900">#{value}</span>
      )
    },
    {
      key: 'userName',
      header: 'Username',
      sortable: true,
      render: (value) => (
        <div className="font-medium text-gray-900">{value}</div>
      )
    },
    {
      key: 'date',
      header: 'Date & Time',
      sortable: true,
      render: (value) => formatDate(value, {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    },
    {
      key: 'actualAmount',
      header: 'Actual Amount',
      sortable: true,
      render: (value) => (
        <span className="font-semibold text-gray-900">
          {formatCurrency(value)}
        </span>
      )
    },
    {
      key: 'palmPayFees',
      header: 'PalmPay Fees',
      sortable: true,
      render: (value) => (
        <span className="font-semibold text-red-600">
          -{formatCurrency(value)}
        </span>
      )
    },
    {
      key: 'settlementAmount',
      header: 'Settlement Amount',
      sortable: true,
      render: (value) => (
        <span className="font-semibold text-green-600">
          {formatCurrency(value)}
        </span>
      )
    },
    {
      key: 'status',
      header: 'Status',
      sortable: true,
      render: (value) => (
        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
          value === 'completed' 
            ? 'bg-green-100 text-green-800 border border-green-200' : 
          value === 'pending' 
            ? 'bg-yellow-100 text-yellow-800 border border-yellow-200' : 
            'bg-red-100 text-red-800 border border-red-200'
        }`}>
          {value.charAt(0).toUpperCase() + value.slice(1)}
        </span>
      )
    }
  ]

  const actions = [
    {
      label: 'View Details',
      onClick: (row) => {
        console.log('View settlement:', row)
        // Implement view settlement details
      },
      className: 'text-blue-600 hover:text-blue-800'
    },
    {
      label: 'Download Receipt',
      variant: 'secondary',
      onClick: (row) => {
        if (row.status === 'completed') {
          console.log('Download receipt for:', row)
          // Implement download receipt functionality
        }
      },
      disabled: (row) => row.status !== 'completed',
      className: 'text-green-600 hover:text-green-800'
    }
  ]

  // Pagination component
  const PaginationControls = () => (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-6 p-4 bg-gray-50 rounded-lg">
      <div className="flex items-center gap-4">
        <span className="text-sm text-gray-700">
          Showing {((pagination.currentPage - 1) * pagination.pageSize) + 1} to{' '}
          {Math.min(pagination.currentPage * pagination.pageSize, pagination.totalItems)} of{' '}
          {pagination.totalItems} entries
        </span>
        
        <select
          value={pagination.pageSize}
          onChange={(e) => handlePageSizeChange(e.target.value)}
          className="px-3 py-1 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
        >
          <option value="5">5 per page</option>
          <option value="10">10 per page</option>
          <option value="20">20 per page</option>
          <option value="50">50 per page</option>
        </select>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={() => handlePageChange(1)}
          disabled={pagination.currentPage === 1}
          className="px-3 py-1 text-sm border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
        >
          First
        </button>
        
        <button
          onClick={() => handlePageChange(pagination.currentPage - 1)}
          disabled={pagination.currentPage === 1}
          className="px-3 py-1 text-sm border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
        >
          Previous
        </button>

        <div className="flex gap-1">
          {[...Array(Math.min(5, pagination.totalPages))].map((_, index) => {
            let pageNum;
            if (pagination.totalPages <= 5) {
              pageNum = index + 1;
            } else if (pagination.currentPage <= 3) {
              pageNum = index + 1;
            } else if (pagination.currentPage >= pagination.totalPages - 2) {
              pageNum = pagination.totalPages - 4 + index;
            } else {
              pageNum = pagination.currentPage - 2 + index;
            }

            return (
              <button
                key={pageNum}
                onClick={() => handlePageChange(pageNum)}
                className={`w-8 h-8 text-sm border rounded-md ${
                  pagination.currentPage === pageNum
                    ? 'bg-purple-600 text-white border-purple-600'
                    : 'border-gray-300 hover:bg-gray-100'
                }`}
              >
                {pageNum}
              </button>
            );
          })}
        </div>

        <button
          onClick={() => handlePageChange(pagination.currentPage + 1)}
          disabled={pagination.currentPage === pagination.totalPages}
          className="px-3 py-1 text-sm border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
        >
          Next
        </button>
        
        <button
          onClick={() => handlePageChange(pagination.totalPages)}
          disabled={pagination.currentPage === pagination.totalPages}
          className="px-3 py-1 text-sm border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
        >
          Last
        </button>
      </div>
    </div>
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-800">Settlement History</h1>
          <p className="text-gray-600 mt-2">View and manage all your settlements</p>
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
          <div className="flex gap-2">
            <button className="bg-red-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-red-700 transition duration-200 whitespace-nowrap flex items-center gap-2">
              <span>🗑️</span>
              Delete
            </button>
            <button className="bg-purple-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-purple-700 transition duration-200 whitespace-nowrap flex items-center gap-2">
              <span>📤</span>
              Export
            </button>
          </div>
        </div>
      </div>

      {/* Settlement Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 text-center">
          <div className="text-2xl font-bold text-green-600">{formatCurrency(24750)}</div>
          <p className="text-sm text-gray-600">Total Settled</p>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 text-center">
          <div className="text-2xl font-bold text-blue-600">{pagination.totalItems}</div>
          <p className="text-sm text-gray-600">Total Settlements</p>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 text-center">
          <div className="text-2xl font-bold text-purple-600">{formatCurrency(250)}</div>
          <p className="text-sm text-gray-600">Total Fees</p>
        </div>
      </div>

      {/* Settlements Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <DataTable
          columns={columns}
          data={settlements}
          loading={loading}
          searchable={true}
          searchPlaceholder="Search settlements, usernames..."
          pagination={false} // We're using custom pagination
          actions={actions}
        />
        
        {/* Custom Pagination Controls */}
        {!loading && settlements.length > 0 && (
          <PaginationControls />
        )}
      </div>

      {/* Empty State */}
      {!loading && settlements.length === 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
          <div className="text-gray-400 text-6xl mb-4">💰</div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No settlements found</h3>
          <p className="text-gray-600 mb-4">
            {filters.status || filters.dateRange 
              ? "No settlements match your current filters. Try adjusting your filters."
              : "You haven't processed any settlements yet."
            }
          </p>
          {(filters.status || filters.dateRange) && (
            <button
              onClick={() => setFilters({ status: '', dateRange: '' })}
              className="bg-purple-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-purple-700 transition duration-200"
            >
              Clear Filters
            </button>
          )}
        </div>
      )}
    </div>
  )
}

export default SettlementHistoryPage