import React, { createContext, useState, useContext } from 'react'

const AppContext = createContext()

export const useApp = () => {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error('useApp must be used within an AppProvider')
  }
  return context
}

export const AppProvider = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [notifications, setNotifications] = useState([])
  const [theme, setTheme] = useState('light')

  const addNotification = (notification) => {
    const newNotification = {
      id: Date.now(),
      type: notification.type || 'info',
      title: notification.title,
      message: notification.message,
      timestamp: new Date()
    }
    setNotifications(prev => [newNotification, ...prev.slice(0, 4)])
  }

  const removeNotification = (id) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id))
  }

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light')
  }

  const value = {
    sidebarOpen,
    setSidebarOpen,
    notifications,
    addNotification,
    removeNotification,
    theme,
    toggleTheme
  }

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  )
}