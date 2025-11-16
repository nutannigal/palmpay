// src/components/admin/Sidebar.jsx (Enhanced with active state)
import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'

const Sidebar = () => {
  const [activeItem, setActiveItem] = useState('Dashboard')
  const location = useLocation()

  const menuItems = [
    { icon: '📌', label: 'Dashboard', path: '/admin/dashboard' },
    { icon: '📌', label: 'Manage Merchant', path: '/admin/merchants' },
    { icon: '📌', label: 'Staff', path: '/admin/staff' },
    { icon: '📌', label: 'Users', path: '/admin/users' },
    { icon: '📌', label: 'Total Order', path: '/admin/orders' },
    { icon: '📌', label: 'Revenue', path: '/admin/revenue' }
  ]

  const generalItems = [
    { icon: '📌', label: 'Setting', path: '/admin/settings' }
  ]

  const isActive = (path) => {
    return location.pathname === path
  }

  return (
    <div 
      className="w-64 h-screen flex flex-col"
      style={{
        background: 'linear-gradient(135deg, #3A41C6 0%, #4C2C96 25%, #8A2BE2 50%, #ffa8f7 75%, #f88bff 100%)',
        backgroundSize: '400% 400%',
        animation: 'gradientShift 8s ease infinite'
      }}
    >
      <style jsx>{`
        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>

      {/* Header Section */}
      <div className="p-6 border-b border-white border-opacity-20">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-1">
            PalmPay
          </h1>
          <p className="text-white text-opacity-90 text-sm">
            Pulse of Payment
          </p>
        </div>
      </div>

      {/* Menu Section */}
      <div className="flex-1 overflow-y-auto">
        {/* Menu Heading */}
        <div className="px-6 py-4">
          <h2 className="text-white font-semibold text-lg">Menu</h2>
        </div>

        {/* Main Menu Items */}
        <nav className="px-4 space-y-1">
          {menuItems.map((item, index) => (
            <button
              key={index}
              onClick={() => setActiveItem(item.label)}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                isActive(item.path) 
                  ? 'bg-white bg-opacity-20 text-white' 
                  : 'text-white hover:bg-white hover:bg-opacity-10'
              }`}
            >
              <span className="text-lg">{item.icon}</span>
              <span className="font-medium">{item.label}</span>
            </button>
          ))}
        </nav>

        {/* General Section */}
        <div className="mt-8 px-6 py-4">
          <h2 className="text-white font-semibold text-lg">General</h2>
        </div>

        <nav className="px-4 space-y-1">
          {generalItems.map((item, index) => (
            <button
              key={index}
              onClick={() => setActiveItem(item.label)}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                isActive(item.path) 
                  ? 'bg-white bg-opacity-20 text-white' 
                  : 'text-white hover:bg-white hover:bg-opacity-10'
              }`}
            >
              <span className="text-lg">{item.icon}</span>
              <span className="font-medium">{item.label}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Admin Footer Section */}
      <div className="p-6 border-t border-white border-opacity-20">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-white font-semibold">Admin</p>
            <p className="text-white text-opacity-80 text-sm">Singapore</p>
          </div>
        </div>
        
        {/* Log Out Button */}
        <button className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-white bg-opacity-10 text-white rounded-lg hover:bg-opacity-20 transition-all duration-200">
          <span className="font-medium">Log Out</span>
        </button>
      </div>
    </div>
  )
}

export default Sidebar