import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { AppProvider } from './context/AppContext'
import { NotificationProvider } from './components/common/Notification'
import ProtectedRoute from './components/common/ProtectedRoute'
import { USER_ROLES } from './utils/constants'

// Auth Pages
import UserLogin from './pages/merchant/auth/UserLogin'
import LandingPage from './pages/merchant/auth/LandingPage'
import MobileEntry from './pages/merchant/auth/MobileEntry'
import OTPVerification from './pages/merchant/auth/OTPVerification'
import ConfirmPassword from './pages/merchant/auth/ConfirmPassword'
import HandScanner from './pages/merchant/auth/CompleteRegistration'

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard'
import ManageMerchants from './pages/admin/ManageMerchants'
import ManageStaff from './pages/admin/ManageStaff'
import ManageUsers from './pages/admin/ManageUsers'
import Orders from './pages/admin/Orders'
import Revenue from './pages/admin/Revenue'

// Merchant Pages
import MerchantDashboard from './pages/merchant/MerchantDashboard'
import DashboardContent from './pages/merchant/DashboardContent '
import TransactionHistoryPage from './pages/merchant/TransactionHistoryPage '
import MerchantOrders from './pages/merchant/TotalOrderPage '
import Help from './pages/merchant/Help'
import Settings from './pages/merchant/Settings'

// Common Pages
import NotFound from './pages/common/NotFound'
import Profile from './pages/common/Profile'

// Styles
import './styles/animations.css'

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppProvider>
          <NotificationProvider>
            <div className="min-h-screen bg-gray-50">
              <Routes>
                {/* Public Routes */}
                <Route path="/" element={<LandingPage />} />
                <Route path="/User-Login" element={<UserLogin />} />
                <Route path="/register" element={<HandScanner />} />
                <Route path="/mobile-entry" element={<MobileEntry />} />
                <Route path="/verify-otp" element={<OTPVerification />} />
                <Route path="/Confirm-Password" element={<ConfirmPassword />} />

                {/* Admin Routes */}
                <Route
                  path="/admin/dashboard"
                  element={
                    <ProtectedRoute role={USER_ROLES.ADMIN}>
                      <AdminDashboard />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/admin/merchants"
                  element={
                    <ProtectedRoute role={USER_ROLES.ADMIN}>
                      <ManageMerchants />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/admin/staff"
                  element={
                    <ProtectedRoute role={USER_ROLES.ADMIN}>
                      <ManageStaff />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/admin/users"
                  element={
                    <ProtectedRoute role={USER_ROLES.ADMIN}>
                      <ManageUsers />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/admin/orders"
                  element={
                    <ProtectedRoute role={USER_ROLES.ADMIN}>
                      <Orders />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/admin/revenue"
                  element={
                    <ProtectedRoute role={USER_ROLES.ADMIN}>
                      <Revenue />
                    </ProtectedRoute>
                  }
                />

                {/* Merchant Routes */}
                <Route
                  path="/merchant/dashboard"
                  element={
                    <ProtectedRoute role={USER_ROLES.MERCHANT}>
                      <MerchantDashboard />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/transaction-history"
                  element={
                    <ProtectedRoute role={USER_ROLES.MERCHANT}>
                      <TransactionHistoryPage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/total-order"
                  element={
                    <ProtectedRoute role={USER_ROLES.MERCHANT}>
                      <MerchantOrders />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/merchant/help"
                  element={
                    <ProtectedRoute role={USER_ROLES.MERCHANT}>
                      <Help />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/merchant/settings"
                  element={
                    <ProtectedRoute role={USER_ROLES.MERCHANT}>
                      <Settings />
                    </ProtectedRoute>
                  }
                />

                {/* Common Routes */}
                <Route
                  path="/profile"
                  element={
                    <ProtectedRoute>
                      <Profile />
                    </ProtectedRoute>
                  }
                />

                {/* 404 Route */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </div>
          </NotificationProvider>
        </AppProvider>
      </AuthProvider>
    </Router>
  )
}

export default App