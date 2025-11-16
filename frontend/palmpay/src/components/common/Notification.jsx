// src/components/common/Notification.jsx
import React, { createContext, useContext, useState } from 'react'
import { toast, Toaster } from 'react-hot-toast'

// Create the context
const NotificationContext = createContext()

// Custom hook to use notification
export const useNotification = () => {
  const context = useContext(NotificationContext)
  if (!context) {
    throw new Error('useNotification must be used within a NotificationProvider')
  }
  return context
}

// Provider component
export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([])

  // Toast methods using react-hot-toast
  const toastMethods = {
    success: (message) => toast.success(message),
    error: (message) => toast.error(message),
    loading: (message) => toast.loading(message),
    info: (message) => toast(message),
    dismiss: (toastId) => toast.dismiss(toastId),
    promise: (promise, messages) => toast.promise(promise, messages)
  }

  const value = {
    toast: toastMethods
  }

  return (
    <NotificationContext.Provider value={value}>
      {children}
      {/* Toast container */}
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#363636',
            color: '#fff',
          },
          success: {
            duration: 3000,
            theme: {
              primary: 'green',
              secondary: 'black',
            },
          },
          error: {
            duration: 5000,
          },
        }}
      />
    </NotificationContext.Provider>
  )
}

export default NotificationContext