// src/components/common/ProtectedRoute.jsx
import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import LoadingSpinner from './LoadingSpinner'

// User roles constants
export const USER_ROLES = {
  ADMIN: 'admin',
  MERCHANT: 'merchant',
  STAFF: 'staff',
  CUSTOMER: 'customer'
}

const ProtectedRoute = ({ 
  children, 
  roles = [], 
  redirectTo = '/login',
  fallback = <LoadingSpinner size="lg" text="Checking access..." />
}) => {
  const { user, isAuthenticated, loading } = useAuth()
  const location = useLocation()

  // Show loading spinner while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        {fallback}
      </div>
    )
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return (
      <Navigate 
        to={redirectTo} 
        state={{ 
          from: location,
          message: 'Please log in to access this page'
        }} 
        replace 
      />
    )
  }

  // Check role-based access if roles are specified
  if (roles.length > 0 && user?.role) {
    const hasRequiredRole = roles.includes(user.role)
    
    if (!hasRequiredRole) {
      // Redirect based on user's actual role
      let redirectPath = '/dashboard'
      
      switch (user.role) {
        case USER_ROLES.ADMIN:
          redirectPath = '/admin/dashboard'
          break
        case USER_ROLES.MERCHANT:
          redirectPath = '/merchant/dashboard'
          break
        case USER_ROLES.STAFF:
          redirectPath = '/merchant/dashboard'
          break
        default:
          redirectPath = '/dashboard'
      }

      return (
        <Navigate 
          to={redirectPath} 
          state={{ 
            from: location,
            message: 'You do not have permission to access this page'
          }} 
          replace 
        />
      )
    }
  }

  // Render children if all checks pass
  return children
}

// Specific route components for common use cases
export const AdminRoute = ({ children, ...props }) => (
  <ProtectedRoute roles={[USER_ROLES.ADMIN]} {...props}>
    {children}
  </ProtectedRoute>
)

export const MerchantRoute = ({ children, ...props }) => (
  <ProtectedRoute roles={[USER_ROLES.MERCHANT, USER_ROLES.STAFF]} {...props}>
    {children}
  </ProtectedRoute>
)

export const StaffRoute = ({ children, ...props }) => (
  <ProtectedRoute roles={[USER_ROLES.STAFF]} {...props}>
    {children}
  </ProtectedRoute>
)

// Public route component (redirects authenticated users away from login/register)
export const PublicRoute = ({ children, redirectTo = true }) => {
  const { isAuthenticated, loading, user } = useAuth()
  const location = useLocation()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <LoadingSpinner size="lg" text="Loading..." />
      </div>
    )
  }

  // If user is authenticated and trying to access public route (like login)
  // redirect them to appropriate dashboard
  if (isAuthenticated && redirectTo) {
    let dashboardPath = '/dashboard'
    
    if (user?.role === USER_ROLES.ADMIN) {
      dashboardPath = '/admin/dashboard'
    } else if (user?.role === USER_ROLES.MERCHANT || user?.role === USER_ROLES.STAFF) {
      dashboardPath = '/merchant/dashboard'
    }

    return <Navigate to={dashboardPath} replace />
  }

  return children
}

export default ProtectedRoute