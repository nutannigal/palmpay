export const USER_ROLES = {
  ADMIN: 'admin',
  MERCHANT: 'merchant',
  USER: 'user',
  STAFF: 'staff'
}

export const TRANSACTION_STATUS = {
  PENDING: 'pending',
  COMPLETED: 'completed',
  FAILED: 'failed',
  REFUNDED: 'refunded'
}

export const ORDER_STATUS = {
  PENDING: 'pending',
  CONFIRMED: 'confirmed',
  PROCESSING: 'processing',
  SHIPPED: 'shipped',
  DELIVERED: 'delivered',
  CANCELLED: 'cancelled'
}

export const MERCHANT_STATUS = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  PENDING: 'pending',
  SUSPENDED: 'suspended'
}

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    LOGOUT: '/auth/logout',
    FORGOT_PASSWORD: '/auth/forgot-password',
    RESET_PASSWORD: '/auth/reset-password'
  },
  ADMIN: {
    DASHBOARD: '/admin/dashboard',
    MERCHANTS: '/admin/merchants',
    USERS: '/admin/users',
    STAFF: '/admin/staff',
    ORDERS: '/admin/orders',
    REVENUE: '/admin/revenue'
  },
  MERCHANT: {
    DASHBOARD: '/merchant/dashboard',
    TRANSACTIONS: '/merchant/transactions',
    SETTLEMENTS: '/merchant/settlements',
    ORDERS: '/merchant/orders',
    PROFILE: '/merchant/profile'
  }
}

export const BREAKPOINTS = {
  SM: 640,
  MD: 768,
  LG: 1024,
  XL: 1280,
  '2XL': 1536
}