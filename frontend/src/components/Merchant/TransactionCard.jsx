import React from 'react'
import { formatCurrency, formatDate } from '../../utils/helpers'

const TransactionCard = ({ transaction }) => {
  const getStatusColor = (status) => {
    const colors = {
      completed: 'bg-green-100 text-green-800',
      pending: 'bg-yellow-100 text-yellow-800',
      failed: 'bg-red-100 text-red-800',
      refunded: 'bg-blue-100 text-blue-800'
    }
    return colors[status] || colors.pending
  }

  const getStatusIcon = (status) => {
    const icons = {
      completed: '✅',
      pending: '⏳',
      failed: '❌',
      refunded: '↩️'
    }
    return icons[status] || '⏳'
  }

  return (
    <div className="bg-white p-4 rounded-lg border border-gray-200 hover:shadow-md transition-shadow duration-200">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-3">
          <span className="text-lg">{getStatusIcon(transaction.status)}</span>
          <div>
            <h4 className="font-medium text-gray-900">#{transaction.transactionId}</h4>
            <p className="text-sm text-gray-500">{formatDate(transaction.date)}</p>
          </div>
        </div>
        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(transaction.status)}`}>
          {transaction.status}
        </span>
      </div>
      
      <div className="grid grid-cols-2 gap-4 text-sm">
        <div>
          <p className="text-gray-600">Amount</p>
          <p className="font-semibold text-gray-900">{formatCurrency(transaction.amount)}</p>
        </div>
        <div>
          <p className="text-gray-600">Customer</p>
          <p className="font-medium text-gray-900 truncate">{transaction.customerName}</p>
        </div>
      </div>
      
      {transaction.description && (
        <p className="text-sm text-gray-600 mt-3">{transaction.description}</p>
      )}
    </div>
  )
}

export default TransactionCard