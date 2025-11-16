import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const DashboardContent  = () => {
  const { user } = useAuth();
  const [balance, setBalance] = useState(0);
  const [recentTransactions, setRecentTransactions] = useState([]);

  useEffect(() => {
    // Fetch user balance and recent transactions
    setBalance(user?.balance || 0);
    // Mock transactions for demo
    setRecentTransactions([
      {
        id: 1,
        type: 'send',
        description: 'Transfer to John Doe',
        amount: 50,
        date: '2024-01-15'
      },
      {
        id: 2,
        type: 'receive',
        description: 'From Jane Smith',
        amount: 100,
        date: '2024-01-14'
      }
    ]);
  }, [user]);

  const quickActions = [
    {
      title: 'Send Money',
      description: 'Transfer to anyone',
      icon: '💸',
      link: '/send-money',
      color: 'bg-blue-500'
    },
    {
      title: 'View Transactions',
      description: 'See your history',
      icon: '📊',
      link: '/transactions',
      color: 'bg-green-500'
    },
    {
      title: 'Add Money',
      description: 'Top up your wallet',
      icon: '💰',
      link: '/add-money',
      color: 'bg-purple-500'
    },
    {
      title: 'Pay Bills',
      description: 'Utilities & more',
      icon: '🧾',
      link: '/bills',
      color: 'bg-orange-500'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          Welcome back, {user?.firstName}!
        </h1>
        <p className="text-gray-600">Here's your financial overview</p>
      </div>

      {/* Balance Card */}
      <div className="bg-gradient-to-r from-[#00D2B8] to-[#00A896] rounded-2xl p-6 text-white mb-8">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-lg opacity-90">Total Balance</p>
            <h2 className="text-4xl font-bold mt-2">${balance.toLocaleString()}</h2>
            <p className="mt-2 opacity-90">Account: {user?.accountNumber || 'PP1234567890'}</p>
          </div>
          <div className="text-right">
            <p className="opacity-90">PalmPay</p>
            <p className="text-sm opacity-75">Verified</p>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {quickActions.map((action) => (
            <Link
              key={action.title}
              to={action.link}
              className="bg-white rounded-xl p-4 shadow-sm border border-gray-200 hover:shadow-md transition-all duration-200 hover:-translate-y-1"
            >
              <div className={`w-12 h-12 ${action.color} rounded-lg flex items-center justify-center text-white text-xl mb-3`}>
                {action.icon}
              </div>
              <h4 className="font-semibold text-gray-900 mb-1">{action.title}</h4>
              <p className="text-sm text-gray-600">{action.description}</p>
            </Link>
          ))}
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold text-gray-900">Recent Transactions</h3>
          <Link to="/transactions" className="text-[#00D2B8] hover:text-[#00A896] font-medium">
            View All
          </Link>
        </div>
        
        {recentTransactions.length > 0 ? (
          <div className="space-y-4">
            {recentTransactions.map((transaction) => (
              <div key={transaction.id} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
                <div className="flex items-center space-x-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    transaction.type === 'send' ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'
                  }`}>
                    {transaction.type === 'send' ? '↑' : '↓'}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{transaction.description}</p>
                    <p className="text-sm text-gray-500">{transaction.date}</p>
                  </div>
                </div>
                <div className={`font-semibold ${
                  transaction.type === 'send' ? 'text-red-600' : 'text-green-600'
                }`}>
                  {transaction.type === 'send' ? '-' : '+'}${transaction.amount}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <div className="text-gray-400 text-6xl mb-4">💸</div>
            <p className="text-gray-500">No recent transactions</p>
            <Link to="/send-money" className="text-[#00D2B8] hover:text-[#00A896] font-medium mt-2 inline-block">
              Make your first transaction
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardContent ;