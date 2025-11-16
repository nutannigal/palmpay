import React from 'react'
import { formatCurrency } from '../../utils/helpers'

const StatsCards = ({ stats }) => {
  const statItems = [
    {
      title: 'Today\'s Revenue',
      value: formatCurrency(stats.todayRevenue || 0),
      icon: '💰',
      color: 'green',
      change: '+12%',
      description: 'From yesterday'
    },
    {
      title: 'Total Orders',
      value: stats.totalOrders || '0',
      icon: '📦',
      color: 'blue',
      change: '+8%',
      description: 'From last week'
    },
    {
      title: 'Pending Settlements',
      value: formatCurrency(stats.pendingSettlements || 0),
      icon: '🏦',
      color: 'orange',
      change: '-5%',
      description: 'From yesterday'
    },
    {
      title: 'Success Rate',
      value: '98.5%',
      icon: '📈',
      color: 'purple',
      change: '+1.2%',
      description: 'Transaction success'
    }
  ]

  const getColorClasses = (color) => {
    const colors = {
      blue: 'bg-blue-100 text-blue-600',
      green: 'bg-green-100 text-green-600',
      purple: 'bg-purple-100 text-purple-600',
      orange: 'bg-orange-100 text-orange-600'
    }
    return colors[color] || colors.blue
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
      {statItems.map((stat, index) => (
        <div 
          key={index} 
          className="bg-white p-4 lg:p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200"
        >
          <div className="flex items-center justify-between">
            <div className="flex-1 min-w-0">
              <p className="text-xs lg:text-sm font-medium text-gray-600 truncate">{stat.title}</p>
              <p className="text-xl lg:text-2xl font-bold text-gray-900 mt-1 truncate">{stat.value}</p>
              <div className="flex items-center mt-1 lg:mt-2">
                <span className={`text-xs font-medium ${
                  stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'
                }`}>
                  {stat.change}
                </span>
                <span className="text-xs text-gray-500 ml-1 truncate">{stat.description}</span>
              </div>
            </div>
            <div className={`p-2 lg:p-3 rounded-lg ${getColorClasses(stat.color)} flex-shrink-0 ml-3`}>
              <span className="text-lg lg:text-2xl">{stat.icon}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default StatsCards