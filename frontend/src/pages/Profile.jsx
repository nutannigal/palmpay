import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

const Profile = () => {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  // Profile form state
  const [profileData, setProfileData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    address: '',
    city: '',
    country: '',
    postalCode: ''
  });

  // Security settings state
  const [securityData, setSecurityData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    twoFactorEnabled: false,
    biometricEnabled: false
  });

  // Notification settings state
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    smsNotifications: true,
    pushNotifications: true,
    transactionAlerts: true,
    securityAlerts: true,
    marketingEmails: false
  });

  // Mock transaction history for the profile
  const [recentActivity, setRecentActivity] = useState([]);

  // Initialize form data with user data
  useEffect(() => {
    if (user) {
      setProfileData({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        email: user.email || '',
        phone: user.phone || '',
        dateOfBirth: user.dateOfBirth || '',
        address: user.address || '',
        city: user.city || '',
        country: user.country || '',
        postalCode: user.postalCode || ''
      });
    }

    // Mock recent activity
    setRecentActivity([
      {
        id: 1,
        type: 'profile_update',
        description: 'Updated profile information',
        date: '2024-01-15T14:30:00Z',
        icon: '👤'
      },
      {
        id: 2,
        type: 'password_change',
        description: 'Changed password',
        date: '2024-01-10T09:15:00Z',
        icon: '🔒'
      },
      {
        id: 3,
        type: 'login',
        description: 'Logged in from new device',
        date: '2024-01-08T16:45:00Z',
        icon: '📱'
      },
      {
        id: 4,
        type: 'transaction',
        description: 'Sent $50 to John Doe',
        date: '2024-01-05T11:20:00Z',
        icon: '💸'
      }
    ]);
  }, [user]);

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSecurityChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSecurityData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleNotificationChange = (e) => {
    const { name, checked } = e.target;
    setNotificationSettings(prev => ({
      ...prev,
      [name]: checked
    }));
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      // Simulate API call to update profile
      await new Promise(resolve => setTimeout(resolve, 1500));
      console.log('Profile updated:', profileData);
      setIsEditing(false);
      alert('Profile updated successfully!');
    } catch (error) {
      alert('Failed to update profile. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const handleSecuritySubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      // Simulate API call to update security settings
      await new Promise(resolve => setTimeout(resolve, 1500));
      console.log('Security settings updated:', securityData);
      
      // Reset password fields
      setSecurityData(prev => ({
        ...prev,
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      }));
      
      alert('Security settings updated successfully!');
    } catch (error) {
      alert('Failed to update security settings. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteAccount = () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      // Simulate account deletion
      alert('Account deletion requested. This feature would typically send a confirmation email.');
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const tabs = [
    { id: 'profile', name: 'Profile', icon: '👤' },
    { id: 'security', name: 'Security', icon: '🔒' },
    { id: 'notifications', name: 'Notifications', icon: '🔔' },
    { id: 'activity', name: 'Activity', icon: '📊' }
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="relative inline-block">
          <div className="w-24 h-24 bg-[#00D2B8] rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-white text-3xl font-bold">
              {user?.firstName?.charAt(0) || 'U'}{user?.lastName?.charAt(0) || 'S'}
            </span>
          </div>
          <button className="absolute bottom-2 right-2 w-8 h-8 bg-white rounded-full shadow-md flex items-center justify-center hover:bg-gray-50 transition-colors duration-200">
            <span className="text-sm">📷</span>
          </button>
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          {user?.firstName} {user?.lastName}
        </h1>
        <p className="text-gray-600">{user?.email}</p>
        <div className="flex justify-center space-x-2 mt-2">
          <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
            Verified
          </span>
          <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
            Active
          </span>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-gray-200 mb-8">
        <nav className="flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                activeTab === tab.id
                  ? 'border-[#00D2B8] text-[#00D2B8]'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <span className="mr-2">{tab.icon}</span>
              {tab.name}
            </button>
          ))}
        </nav>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2">
          {/* Profile Tab */}
          {activeTab === 'profile' && (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-900">Personal Information</h2>
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className="bg-[#00D2B8] text-white px-4 py-2 rounded-lg hover:bg-[#00A896] transition-colors duration-200 font-medium"
                >
                  {isEditing ? 'Cancel' : 'Edit Profile'}
                </button>
              </div>

              <form onSubmit={handleProfileSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      First Name
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={profileData.firstName}
                      onChange={handleProfileChange}
                      disabled={!isEditing}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00D2B8] focus:border-transparent outline-none disabled:bg-gray-50 disabled:text-gray-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Last Name
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={profileData.lastName}
                      onChange={handleProfileChange}
                      disabled={!isEditing}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00D2B8] focus:border-transparent outline-none disabled:bg-gray-50 disabled:text-gray-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={profileData.email}
                      onChange={handleProfileChange}
                      disabled={!isEditing}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00D2B8] focus:border-transparent outline-none disabled:bg-gray-50 disabled:text-gray-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={profileData.phone}
                      onChange={handleProfileChange}
                      disabled={!isEditing}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00D2B8] focus:border-transparent outline-none disabled:bg-gray-50 disabled:text-gray-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Date of Birth
                    </label>
                    <input
                      type="date"
                      name="dateOfBirth"
                      value={profileData.dateOfBirth}
                      onChange={handleProfileChange}
                      disabled={!isEditing}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00D2B8] focus:border-transparent outline-none disabled:bg-gray-50 disabled:text-gray-500"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Address
                    </label>
                    <input
                      type="text"
                      name="address"
                      value={profileData.address}
                      onChange={handleProfileChange}
                      disabled={!isEditing}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00D2B8] focus:border-transparent outline-none disabled:bg-gray-50 disabled:text-gray-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      City
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={profileData.city}
                      onChange={handleProfileChange}
                      disabled={!isEditing}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00D2B8] focus:border-transparent outline-none disabled:bg-gray-50 disabled:text-gray-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Country
                    </label>
                    <input
                      type="text"
                      name="country"
                      value={profileData.country}
                      onChange={handleProfileChange}
                      disabled={!isEditing}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00D2B8] focus:border-transparent outline-none disabled:bg-gray-50 disabled:text-gray-500"
                    />
                  </div>
                </div>

                {isEditing && (
                  <div className="flex justify-end space-x-4 mt-8 pt-6 border-t border-gray-200">
                    <button
                      type="button"
                      onClick={() => setIsEditing(false)}
                      className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200 font-medium"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={saving}
                      className="bg-[#00D2B8] text-white px-8 py-3 rounded-lg hover:bg-[#00A896] disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors duration-200 font-medium"
                    >
                      {saving ? (
                        <div className="flex items-center space-x-2">
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          <span>Saving...</span>
                        </div>
                      ) : (
                        'Save Changes'
                      )}
                    </button>
                  </div>
                )}
              </form>
            </div>
          )}

          {/* Security Tab */}
          {activeTab === 'security' && (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Security Settings</h2>

              <form onSubmit={handleSecuritySubmit}>
                <div className="space-y-6">
                  {/* Change Password */}
                  <div className="border-b border-gray-200 pb-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Change Password</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Current Password
                        </label>
                        <input
                          type="password"
                          name="currentPassword"
                          value={securityData.currentPassword}
                          onChange={handleSecurityChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00D2B8] focus:border-transparent outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          New Password
                        </label>
                        <input
                          type="password"
                          name="newPassword"
                          value={securityData.newPassword}
                          onChange={handleSecurityChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00D2B8] focus:border-transparent outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Confirm New Password
                        </label>
                        <input
                          type="password"
                          name="confirmPassword"
                          value={securityData.confirmPassword}
                          onChange={handleSecurityChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00D2B8] focus:border-transparent outline-none"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Two-Factor Authentication */}
                  <div className="border-b border-gray-200 pb-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">Two-Factor Authentication</h3>
                        <p className="text-gray-600 text-sm mt-1">
                          Add an extra layer of security to your account
                        </p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          name="twoFactorEnabled"
                          checked={securityData.twoFactorEnabled}
                          onChange={handleSecurityChange}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#00D2B8]"></div>
                      </label>
                    </div>
                  </div>

                  {/* Biometric Authentication */}
                  <div className="border-b border-gray-200 pb-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">Biometric Login</h3>
                        <p className="text-gray-600 text-sm mt-1">
                          Use fingerprint or face ID for faster login
                        </p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          name="biometricEnabled"
                          checked={securityData.biometricEnabled}
                          onChange={handleSecurityChange}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#00D2B8]"></div>
                      </label>
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <button
                      type="submit"
                      disabled={saving}
                      className="bg-[#00D2B8] text-white px-8 py-3 rounded-lg hover:bg-[#00A896] disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors duration-200 font-medium"
                    >
                      {saving ? (
                        <div className="flex items-center space-x-2">
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          <span>Updating...</span>
                        </div>
                      ) : (
                        'Update Security Settings'
                      )}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          )}

          {/* Notifications Tab */}
          {activeTab === 'notifications' && (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Notification Preferences</h2>

              <div className="space-y-6">
                {[
                  {
                    name: 'emailNotifications',
                    label: 'Email Notifications',
                    description: 'Receive important updates via email'
                  },
                  {
                    name: 'smsNotifications',
                    label: 'SMS Notifications',
                    description: 'Get transaction alerts via SMS'
                  },
                  {
                    name: 'pushNotifications',
                    label: 'Push Notifications',
                    description: 'Receive push notifications on your devices'
                  },
                  {
                    name: 'transactionAlerts',
                    label: 'Transaction Alerts',
                    description: 'Get notified for all transactions'
                  },
                  {
                    name: 'securityAlerts',
                    label: 'Security Alerts',
                    description: 'Important security and login notifications'
                  },
                  {
                    name: 'marketingEmails',
                    label: 'Marketing Emails',
                    description: 'Receive promotional offers and updates'
                  }
                ].map((setting) => (
                  <div key={setting.name} className="flex items-center justify-between py-4 border-b border-gray-200 last:border-0">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{setting.label}</h3>
                      <p className="text-gray-600 text-sm mt-1">{setting.description}</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        name={setting.name}
                        checked={notificationSettings[setting.name]}
                        onChange={handleNotificationChange}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#00D2B8]"></div>
                    </label>
                  </div>
                ))}
              </div>

              <div className="flex justify-end mt-8 pt-6 border-t border-gray-200">
                <button
                  onClick={() => alert('Notification preferences saved!')}
                  className="bg-[#00D2B8] text-white px-8 py-3 rounded-lg hover:bg-[#00A896] transition-colors duration-200 font-medium"
                >
                  Save Preferences
                </button>
              </div>
            </div>
          )}

          {/* Activity Tab */}
          {activeTab === 'activity' && (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Recent Activity</h2>

              <div className="space-y-4">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg hover:border-[#00D2B8] transition-colors duration-200">
                    <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                      <span className="text-xl">{activity.icon}</span>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">{activity.description}</h3>
                      <p className="text-gray-500 text-sm">{formatDate(activity.date)}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="text-center mt-6">
                <button className="text-[#00D2B8] hover:text-[#00A896] font-medium">
                  View All Activity
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Account Summary */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Account Summary</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Member Since</span>
                <span className="font-semibold">Jan 2024</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Account Status</span>
                <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">Active</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Verification</span>
                <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">Verified</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Total Transactions</span>
                <span className="font-semibold">24</span>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <button className="w-full text-left p-3 border border-gray-200 rounded-lg hover:border-[#00D2B8] hover:bg-blue-50 transition-colors duration-200">
                <div className="font-medium text-gray-900">Download Statements</div>
                <div className="text-sm text-gray-600">Get your transaction history</div>
              </button>
              <button className="w-full text-left p-3 border border-gray-200 rounded-lg hover:border-[#00D2B8] hover:bg-blue-50 transition-colors duration-200">
                <div className="font-medium text-gray-900">Contact Support</div>
                <div className="text-sm text-gray-600">Get help with your account</div>
              </button>
              <button 
                onClick={handleDeleteAccount}
                className="w-full text-left p-3 border border-red-200 rounded-lg hover:border-red-300 hover:bg-red-50 transition-colors duration-200"
              >
                <div className="font-medium text-red-700">Delete Account</div>
                <div className="text-sm text-red-600">Permanently delete your account</div>
              </button>
            </div>
          </div>

          {/* Security Tips */}
          <div className="bg-blue-50 rounded-2xl border border-blue-200 p-6">
            <h3 className="text-lg font-bold text-blue-900 mb-3">🔒 Security Tips</h3>
            <ul className="space-y-2 text-sm text-blue-800">
              <li>• Use a strong, unique password</li>
              <li>• Enable two-factor authentication</li>
              <li>• Never share your PIN or password</li>
              <li>• Log out from shared devices</li>
              <li>• Review your activity regularly</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;