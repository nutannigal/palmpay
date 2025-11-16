// src/components/admin/StatsCards.jsx
import React from 'react'

const StatsCards = () => {
  const stats = [
    {
      title: 'Total Revenue',
      value: '₹12,45,800',
      change: '+12.5%',
      trend: 'up',
      icon: '💰',
      color: 'green'
    },
    {
      title: 'Active Merchants',
      value: '1,247',
      change: '+8.2%',
      trend: 'up',
      icon: '🏪',
      color: 'blue'
    },
    {
      title: 'Total Transactions',
      value: '45,678',
      change: '+15.3%',
      trend: 'up',
      icon: '💳',
      color: 'purple'
    },
    {
      title: 'Pending Settlements',
      value: '₹2,34,500',
      change: '-2.1%',
      trend: 'down',
      icon: '🏦',
      color: 'yellow'
    }
  ]

  const getColorClass = (color) => {
    switch (color) {
      case 'green': return 'bg-green-100 text-green-600'
      case 'blue': return 'bg-blue-100 text-blue-600'
      case 'purple': return 'bg-purple-100 text-purple-600'
      case 'yellow': return 'bg-yellow-100 text-yellow-600'
      default: return 'bg-gray-100 text-gray-600'
    }
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className={`w-12 h-12 rounded-lg ${getColorClass(stat.color)} flex items-center justify-center`}>
              <span className="text-2xl">{stat.icon}</span>
            </div>
            <span className={`text-sm font-medium ${
              stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
            }`}>
              {stat.change}
            </span>
          </div>
          <h3 className="text-gray-600 text-sm font-medium mb-2">{stat.title}</h3>
          <div className="flex items-baseline justify-between">
            <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

export default StatsCards