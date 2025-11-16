import React, { useState } from 'react';
import { 
  BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, 
  Tooltip, Legend, ResponsiveContainer, AreaChart, Area 
} from 'recharts';

const AdminDashboard = () => {
  const [activeMenu, setActiveMenu] = useState('dashboard');
  const [searchTerm, setSearchTerm] = useState('');

  // Color constants matching MerchantDashboard
  const primaryColor = '#2563EB'; // Blue from MerchantDashboard
  const secondaryColor = '#14B8A6'; // Teal from MerchantDashboard
  const sidebarBg = 'bg-gray-900'; // Dark sidebar like MerchantDashboard
  const contentBg = 'bg-white'; // White content area like MerchantDashboard

  // Mock data for charts
  const companyInsightsData = [
    { month: 'Jan', credit: 65, debit: 45 },
    { month: 'Feb', credit: 59, debit: 49 },
    { month: 'Mar', credit: 80, debit: 60 },
    { month: 'Apr', credit: 81, debit: 71 },
    { month: 'May', credit: 56, debit: 46 },
    { month: 'Jun', credit: 55, debit: 45 },
    { month: 'Jul', credit: 70, debit: 60 },
    { month: 'Aug', credit: 75, debit: 65 },
    { month: 'Sep', credit: 82, debit: 72 },
    { month: 'Oct', credit: 78, debit: 68 },
    { month: 'Nov', credit: 65, debit: 55 },
    { month: 'Dec', credit: 70, debit: 60 },
  ];

  const transactionData = [
    { month: 'Jan', transactions: 12000 },
    { month: 'Feb', transactions: 19000 },
    { month: 'Mar', transactions: 15000 },
    { month: 'Apr', transactions: 25000 },
    { month: 'May', transactions: 22000 },
    { month: 'Jun', transactions: 30000 },
    { month: 'Jul', transactions: 28000 },
    { month: 'Aug', transactions: 35000 },
    { month: 'Sep', transactions: 30000 },
    { month: 'Oct', transactions: 40000 },
    { month: 'Nov', transactions: 38000 },
    { month: 'Dec', transactions: 45000 },
  ];

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊' },
    { id: 'merchant', label: 'Manage Merchant', icon: '🏪' },
    { id: 'staff', label: 'Staff', icon: '👥' },
    { id: 'users', label: 'Users', icon: '👤' },
    { id: 'orders', label: 'Total Order', icon: '🛒' },
    { id: 'revenue', label: 'Revenue', icon: '💰' },
  ];

  const helpItems = [
    { id: 'documentation', label: 'Documentation', icon: '📚' },
    { id: 'support', label: 'Support', icon: '🛟' },
    { id: 'settings', label: 'Settings', icon: '⚙️' },
  ];

  const statsCards = [
    {
      title: 'Registered Customers',
      value: '3,89,500',
      change: '35% From last month',
      bgColor: 'bg-gray-700',
      textColor: 'text-white',
      borderColor: 'border-gray-600',
      icon: '👥'
    },
    {
      title: 'Registered Merchants',
      value: '10,000',
      change: '35% From last month',
      bgColor: 'bg-white',
      textColor: 'text-black',
      borderColor: 'border-gray-600',
      icon: '🏪'
    },
    {
      title: 'Retail Transaction Today',
      value: '100,000',
      change: '35% From last month',
      bgColor: 'bg-white',
      textColor: 'text-black',
      borderColor: 'border-gray-600',
      icon: '💸'
    },
    {
      title: 'Revenue Today',
      value: '$10,000',
      change: '35% From previous day',
      bgColor: 'bg-white',
      textColor: 'text-black',
      borderColor: 'border-gray-600',
      icon: '💰'
    }
  ];

  const onboardingMetrics = [
    { 
      title: 'Customer Onboarded Today', 
      value: '10,000', 
      change: '+35% From previous day',
      bgColor: 'bg-gray-700',
      textColor: 'text-white',
      icon: '👤'
    },
    { 
      title: 'Merchant Onboarded Today', 
      value: '1,000', 
      change: '+35% From previous day',
      bgColor: 'bg-white',
      textColor: 'text-black',
      icon: '🏪'
    },
  ];

  // Custom Tooltip for Charts
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-gray-900 p-3 border-none rounded-md text-white shadow-lg">
          <p className="text-gray-300 text-sm mb-2">{`Month: ${label}`}</p>
          {payload.map((entry, index) => (
            <p key={index} className="text-xs" style={{ color: entry.color }}>
              {`${entry.dataKey}: ${entry.value}`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="flex h-screen bg-white text-black font-inter">
      {/* Sidebar - Matching MerchantDashboard */}
      <div className={`flex flex-col items-start p-0 w-80 h-full ${sidebarBg} border-r border-gray-300 flex-none`}>
        {/* Logo Section */}
        <div className="p-5 border-b border-gray-600 w-full">
          <h1 className="text-white text-2xl font-bold m-0">PalmPay</h1>
          <p className="text-gray-400 text-sm mt-1">Pulse of Payment</p>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 w-full p-4">
          <ul className="flex flex-col gap-2 list-none p-0 m-0">
            {menuItems.map((item) => (
              <li key={item.id} className="w-full">
                <button
                  onClick={() => setActiveMenu(item.id)}
                  className={`
                    w-full text-left p-3 rounded-lg border-none cursor-pointer
                    flex items-center gap-3 font-inter text-sm font-medium
                    transition-all duration-200
                    ${activeMenu === item.id 
                      ? 'bg-blue-600 text-white shadow-md' 
                      : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                    }
                  `}
                >
                  <span className="text-base">{item.icon}</span>
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* Help Section */}
        <div className="p-5 border-t border-gray-600 w-full">
          <div className="bg-gray-700 p-4 rounded-lg">
            <p className="text-gray-400 text-xs mb-2">Registered customers</p>
            <p className="text-white text-2xl font-bold mb-1">3,89,500</p>
            <p className="text-green-500 text-xs">35% From last month</p>
          </div>
        </div>
      </div>

      {/* Main Content Area - Matching MerchantDashboard */}
      <div className="flex flex-col items-start p-0 w-full h-full flex-1">
        {/* Top Bar */}
        <div className="flex flex-row justify-between items-center p-2 gap-2 w-full h-18 border-b border-gray-300">
          {/* Left Side - Hello Text */}
          <div className="w-24 h-11 font-inter font-bold text-2xl leading-11 tracking-tight text-black ml-10">
            Hello Admin...
          </div>

          {/* Center - Search and Actions */}
          <div className="flex flex-row items-center p-0 gap-9 w-96 h-14">
            {/* Search Box */}
            <div className="flex flex-row items-start p-2 gap-2 w-72 h-14">
              <div className="flex flex-row items-center p-0 gap-2 w-60 h-8 border border-black rounded-lg flex-1">
                <span className="opacity-40 ml-2">🔍</span>
                <input
                  type="text"
                  placeholder="Search Here..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="border-none outline-none bg-transparent w-full font-inter font-normal text-xs leading-6 tracking-wider text-black opacity-40 px-2"
                />
              </div>
            </div>

            {/* Share Button */}
            <button className="flex flex-row justify-center items-center p-2 gap-2 w-28 h-10 bg-blue-600 rounded-lg border-none cursor-pointer">
              <span className="w-20 h-6 font-inter font-medium text-sm leading-6 tracking-wider text-white">
                Share
              </span>
            </button>
          </div>

          {/* Right Side - Profile */}
          <div className="flex flex-col justify-center items-center p-2 gap-2 w-10 h-10 bg-gray-600 rounded-full mr-10">
            <span className="text-white text-base">A</span>
          </div>
        </div>

        {/* Page Content */}
        <div className="w-full h-full overflow-auto p-5">
          {/* Stats Cards Row */}
          <div className="flex flex-row items-center p-0 gap-5 w-full h-52 mb-6">
            {statsCards.map((card, index) => (
              <div
                key={index}
                className={`
                  flex flex-col items-start p-5 gap-2 
                  w-64 h-52 
                  border border-gray-600 rounded-xl
                  ${card.bgColor} ${card.textColor}
                  flex-none flex-grow
                `}
              >
                {/* Header with icon */}
                <div className="flex flex-row justify-between items-center p-0 gap-2 w-56 h-10">
                  <div className={`
                    flex flex-col justify-center items-center 
                    p-2 gap-2 w-10 h-10 
                    rounded-full
                    ${card.bgColor === 'bg-white' ? 'bg-gray-600' : 'bg-white'}
                  `}>
                    <span className="text-lg">{card.icon}</span>
                  </div>
                  <div className={`
                    flex flex-col justify-center items-center 
                    p-2 gap-2 w-7 h-7 
                    rounded-full
                    ${card.bgColor === 'bg-white' ? 'bg-gray-100' : 'bg-gray-600'}
                  `}>
                    <span className={`text-xs ${card.bgColor === 'bg-white' ? 'text-black' : 'text-white'}`}>
                      →
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="w-36 h-7 font-plus-jakarta font-bold text-sm leading-7">
                  {card.title}
                </div>

                <div className="w-32 h-11 font-inter font-bold text-2xl leading-11 tracking-tight">
                  {card.value}
                </div>

                <div className="flex flex-row items-center p-0 gap-2 w-36 h-7">
                  <div className="w-5 h-5 border-2 border-green-500 rounded"></div>
                  <div className="w-28 h-7 font-plus-jakarta font-medium text-xs leading-7">
                    {card.change}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Charts Section */}
          <div className="flex flex-row justify-end items-center p-0 gap-5 w-full h-[436px] mb-6">
            {/* Main Chart - Company Insights */}
            <div className="flex flex-col justify-center items-end p-0 gap-5 w-[835px] h-[436px] flex-none flex-grow-1">
              <div className="flex flex-col items-start p-5 gap-5 w-[835px] h-[436px] border border-black rounded-xl">
                {/* Chart Header */}
                <div className="flex flex-row justify-center items-center p-0 gap-2 w-[795px] h-8">
                  <div className="w-96 h-7 font-inter font-bold text-sm leading-7 text-black">
                    Company Insights
                  </div>
                  
                  {/* Dropdown buttons */}
                  <div className="flex gap-2">
                    <div className="flex flex-row justify-center items-center p-1 gap-2 w-48 h-8 border border-gray-600 rounded-lg">
                      <span className="w-36 h-5 font-inter font-semibold text-sm leading-5 text-gray-600">
                        Last 12 months
                      </span>
                      <span className="transform rotate-90">▼</span>
                    </div>
                  </div>
                </div>

                {/* Bar Chart Container */}
                <div className="flex flex-col items-start p-0 w-[795px] h-72">
                  <div className="w-full h-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={companyInsightsData}>
                        <CartesianGrid 
                          strokeDasharray="3 3" 
                          stroke="#e5e7eb" 
                          horizontal={true}
                          vertical={false}
                        />
                        <XAxis 
                          dataKey="month" 
                          stroke="#6b7280"
                          fontSize={12}
                          axisLine={false}
                          tickLine={false}
                        />
                        <YAxis 
                          stroke="#6b7280"
                          fontSize={12}
                          axisLine={false}
                          tickLine={false}
                        />
                        <Tooltip content={<CustomTooltip />} />
                        <Bar 
                          dataKey="credit" 
                          fill={primaryColor}
                          radius={[4, 4, 0, 0]}
                        />
                        <Bar 
                          dataKey="debit" 
                          fill={secondaryColor}
                          radius={[4, 4, 0, 0]}
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Chart Legend */}
                <div className="flex flex-row justify-center items-center p-0 gap-16 w-[795px] h-7">
                  <div className="flex flex-row items-center p-0 gap-2 w-28 h-7">
                    <div className="w-5 h-1 bg-blue-600 rounded"></div>
                    <span className="h-7 font-plus-jakarta font-normal text-xs leading-7 text-black">
                      Credit
                    </span>
                  </div>

                  <div className="flex flex-row items-center p-0 gap-2 w-20 h-7">
                    <div className="w-5 h-0.5 bg-teal-500 rounded border border-dashed border-teal-500"></div>
                    <span className="h-7 font-plus-jakarta font-normal text-xs leading-7 text-black">
                      Debit
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Transaction Chart Side Card */}
            <div className="flex flex-col justify-center items-center p-0 gap-2 w-64 h-[436px] bg-black rounded-xl flex-none self-stretch flex-grow-0">
              <div className="w-52 h-44 font-inter font-black text-5xl leading-[65px] text-center tracking-tight text-white opacity-80 mb-4">
                Transaction Analytics
              </div>
              <div className="w-full h-48 px-4">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={transactionData}>
                    <CartesianGrid 
                      strokeDasharray="3 3" 
                      stroke="#374151" 
                      horizontal={true}
                      vertical={false}
                    />
                    <XAxis 
                      dataKey="month" 
                      stroke="#9CA3AF"
                      fontSize={10}
                      axisLine={false}
                      tickLine={false}
                    />
                    <YAxis 
                      stroke="#9CA3AF"
                      fontSize={10}
                      axisLine={false}
                      tickLine={false}
                    />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#1F2937', 
                        border: 'none',
                        borderRadius: '6px',
                        color: 'white'
                      }}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="transactions" 
                      stroke={primaryColor}
                      fill={`url(#colorTransactions)`}
                      fillOpacity={0.3}
                    />
                    <defs>
                      <linearGradient id="colorTransactions" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor={primaryColor} stopOpacity={0.8}/>
                        <stop offset="95%" stopColor={primaryColor} stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Onboarding Metrics */}
          <div className="flex flex-row items-center p-0 gap-5 w-full h-52">
            {onboardingMetrics.map((metric, index) => (
              <div
                key={index}
                className={`
                  flex flex-col items-start p-5 gap-2 
                  w-96 h-52 
                  border border-gray-600 rounded-xl
                  ${metric.bgColor} ${metric.textColor}
                  flex-none flex-grow
                `}
              >
                {/* Header with icon */}
                <div className="flex flex-row justify-between items-center p-0 gap-2 w-56 h-10">
                  <div className={`
                    flex flex-col justify-center items-center 
                    p-2 gap-2 w-10 h-10 
                    rounded-full
                    ${metric.bgColor === 'bg-white' ? 'bg-gray-600' : 'bg-white'}
                  `}>
                    <span className="text-lg">{metric.icon}</span>
                  </div>
                  <div className={`
                    flex flex-col justify-center items-center 
                    p-2 gap-2 w-7 h-7 
                    rounded-full
                    ${metric.bgColor === 'bg-white' ? 'bg-gray-100' : 'bg-gray-600'}
                  `}>
                    <span className={`text-xs ${metric.bgColor === 'bg-white' ? 'text-black' : 'text-white'}`}>
                      →
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="w-48 h-7 font-plus-jakarta font-bold text-sm leading-7">
                  {metric.title}
                </div>

                <div className="w-32 h-11 font-inter font-bold text-2xl leading-11 tracking-tight">
                  {metric.value}
                </div>

                <div className="flex flex-row items-center p-0 gap-2 w-36 h-7">
                  <div className="w-5 h-5 border-2 border-green-500 rounded"></div>
                  <div className="w-28 h-7 font-plus-jakarta font-medium text-xs leading-7">
                    {metric.change}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;