// context/AuthContext.js
import React, { useState, useContext, createContext, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  // Check if user is logged in on app start
  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = () => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    if (token && userData) {
      try {
        setUser(JSON.parse(userData));
      } catch (error) {
        console.error('Error parsing user data:', error);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      }
    }
  };

  // Mobile login function
  const mobileLogin = async (mobile, password) => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/auth/mobile-login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ mobile, password }),
      });

      const data = await response.json();

      if (data.success) {
        setUser(data.data.user);
        localStorage.setItem('token', data.data.token);
        localStorage.setItem('user', JSON.stringify(data.data.user));
        return { success: true, data: data.data };
      } else {
        return { success: false, message: data.message };
      }
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, message: 'Network error. Please try again.' };
    } finally {
      setLoading(false);
    }
  };

  // Verify OTP function
 
  // Complete registration function
  const completeRegistration = async (mobile, password, acceptPrivacy = true) => {
    try {
      const response = await fetch('http://localhost:5000/api/auth/complete-registration', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ mobile, password, acceptPrivacy }),
      });

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Complete registration error:', error);
      return { 
        success: false, 
        message: 'Network error. Please try again.',
        code: 'NETWORK_ERROR'
      };
    }
  };

  // Logout function - removed navigate
  const logout = () => {
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    // Navigation will be handled by components
  };

  const value = {
    user,
    loading,
    mobileLogin,
    verifyOTP,
    completeRegistration,
    logout,
    checkAuth,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default useAuth;