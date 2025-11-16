import React from 'react'
import { formatCurrency, formatDate } from '../../utils/helpers'

const SettlementCard = ({ settlement }) => {
  const getStatusColor = (status) => {
    const colors = {
      processed: 'bg-green-100 text-green-800',
      pending: 'bg-yellow-100 text-yellow-800',
      failed: 'bg-red-100 text-red-800'
    }
    return colors[status] || colors.pending
  }

  return (
    <div className="bg-white p-4 rounded-lg border border-gray-200 hover:shadow-md transition-shadow duration-200">
      <div className="flex items-center justify-between mb-3">
        <div>
          <h4 className="font-medium text-gray-900">Settlement #{settlement.settlementId}</h4>
          <p className="text-sm text-gray-500">{formatDate(settlement.date)}</p>
        </div>
        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(settlement.status)}`}>
          {settlement.status}
        </span>
      </div>
      
      <div className="grid grid-cols-2 gap-4 text-sm mb-3">
        <div>
          <p className="text-gray-600">Amount</p>
          <p className="font-semibold text-green-600">{formatCurrency(settlement.amount)}</p>
        </div>
        <div>
          <p className="text-gray-600">Transactions</p>
          <p className="font-medium text-gray-900">{settlement.transactionCount}</p>
        </div>
      </div>
      
      <div className="text-xs text-gray-500">
        <p>Bank: {settlement.bankName} • Account: ****{settlement.accountLast4}</p>
      </div>
    </div>
  )
}

export default SettlementCard