import React, { useState } from 'react';
import { 
  BarChart, Bar, AreaChart, Area, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line
} from 'recharts';

const MerchantDashboard = () => {
  const [activePage, setActivePage] = useState('dashboard');
  const [searchTerm, setSearchTerm] = useState('');
  const [timeRange, setTimeRange] = useState('12months');
  const [selectedTransactions, setSelectedTransactions] = useState([]);

  // Color constants
  const primaryColor = '#2563EB';
  const secondaryColor = '#14B8A6';

  // Data for charts
  const companyInsightsData = [
    { month: 'Jan', revenue: 65, target: 70, growth: 12 },
    { month: 'Feb', revenue: 59, target: 65, growth: 8 },
    { month: 'Mar', revenue: 80, target: 75, growth: 25 },
    { month: 'Apr', revenue: 81, target: 78, growth: 26 },
    { month: 'May', revenue: 56, target: 70, growth: 5 },
    { month: 'Jun', revenue: 55, target: 65, growth: 3 },
    { month: 'Jul', revenue: 70, target: 72, growth: 18 },
    { month: 'Aug', revenue: 75, target: 74, growth: 22 },
    { month: 'Sep', revenue: 82, target: 78, growth: 28 },
    { month: 'Oct', revenue: 78, target: 76, growth: 24 },
    { month: 'Nov', revenue: 65, target: 70, growth: 15 },
    { month: 'Dec', revenue: 70, target: 72, growth: 18 },
  ];

  // Transaction History Data
  const transactionHistoryData = [
    { id: 1, selected: false, userName: 'John Doe', dateTime: '12 Jan 2020 12:00AM', amount: '$2000', fee: '$1', netAmount: '$1999', status: 'Completed' },
    { id: 2, selected: false, userName: 'Jane Smith', dateTime: '13 Jan 2020 02:30PM', amount: '$1500', fee: '$0.75', netAmount: '$1499.25', status: 'Completed' },
    { id: 3, selected: false, userName: 'Mike Johnson', dateTime: '14 Jan 2020 10:15AM', amount: '$3000', fee: '$1.50', netAmount: '$2998.50', status: 'Pending' },
    { id: 4, selected: false, userName: 'Sarah Wilson', dateTime: '15 Jan 2020 04:45PM', amount: '$800', fee: '$0.40', netAmount: '$799.60', status: 'Completed' },
    { id: 5, selected: false, userName: 'David Brown', dateTime: '16 Jan 2020 09:20AM', amount: '$2500', fee: '$1.25', netAmount: '$2498.75', status: 'Failed' },
    { id: 6, selected: false, userName: 'Emily Davis', dateTime: '17 Jan 2020 03:10PM', amount: '$1200', fee: '$0.60', netAmount: '$1199.40', status: 'Completed' },
  ];

  const statsCards = [
    {
      title: 'Registered customers',
      value: '3,89,500',
      change: '35% From last month',
      bgColor: 'bg-gray-700',
      textColor: 'text-white',
      borderColor: 'border-gray-600',
      icon: '👥'
    },
    {
      title: 'Registered Merchants',
      value: '10000',
      change: '35% From last month',
      bgColor: 'bg-white',
      textColor: 'text-black',
      borderColor: 'border-gray-600',
      icon: '🏪'
    },
    {
      title: 'Total Transaction',
      value: '100000',
      change: '35% From last month',
      bgColor: 'bg-white',
      textColor: 'text-black',
      borderColor: 'border-gray-600',
      icon: '💸'
    },
    {
      title: 'Transaction amount today',
      value: '10000',
      change: '35% From previous day',
      bgColor: 'bg-white',
      textColor: 'text-black',
      borderColor: 'border-gray-600',
      icon: '💰'
    }
  ];

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊' },
    { id: 'transaction', label: 'Transaction History', icon: '💳' },
    { id: 'settlement', label: 'Settlement History', icon: '💰' },
    { id: 'orders', label: 'Total Order', icon: '📦' },
  ];

  // Custom Tooltip for Line Chart
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

  // Dashboard Content Component with Line Graph
  const DashboardContent = () => (
    <div className="flex flex-col items-start p-5 gap-5 w-full h-full">
      {/* Stats Cards Row */}
      <div className="flex flex-row items-center p-0 gap-5 w-full h-52">
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
      <div className="flex flex-row justify-end items-center p-0 gap-5 w-full h-[436px]">
        {/* Main Chart */}
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

                <div className="flex flex-row justify-center items-center p-1 gap-2 w-24 h-8 border border-gray-600 rounded-lg">
                  <span className="w-12 h-5 font-inter font-semibold text-sm leading-5 text-gray-600">
                    2024-25
                  </span>
                  <span className="transform rotate-90">▼</span>
                </div>
              </div>
            </div>

            {/* Line Chart Container */}
            <div className="flex flex-col items-start p-0 w-[795px] h-72">
              <div className="w-full h-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={companyInsightsData}>
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
                    {/* Main Revenue Line */}
                    <Line 
                      type="monotone" 
                      dataKey="revenue" 
                      stroke={primaryColor}
                      strokeWidth={3}
                      dot={{ fill: primaryColor, strokeWidth: 2, r: 6 }}
                      activeDot={{ r: 8, fill: primaryColor }}
                    />
                    {/* Target Line */}
                    <Line 
                      type="monotone" 
                      dataKey="target" 
                      stroke={secondaryColor}
                      strokeWidth={2}
                      strokeDasharray="5 5"
                      dot={{ fill: secondaryColor, strokeWidth: 2, r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Chart Legend */}
            <div className="flex flex-row justify-center items-center p-0 gap-16 w-[795px] h-7">
              <div className="flex flex-row items-center p-0 gap-2 w-28 h-7">
                <div className="w-5 h-1 bg-blue-600 rounded"></div>
                <span className="h-7 font-plus-jakarta font-normal text-xs leading-7 text-black">
                  Actual Revenue
                </span>
              </div>

              <div className="flex flex-row items-center p-0 gap-2 w-20 h-7">
                <div className="w-5 h-0.5 bg-teal-500 rounded border border-dashed border-teal-500"></div>
                <span className="h-7 font-plus-jakarta font-normal text-xs leading-7 text-black">
                  Target
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Pay With Wave Side Card */}
        <div className="flex flex-col justify-center items-center p-0 gap-2 w-64 h-[436px] bg-black rounded-xl flex-none self-stretch flex-grow-0">
          <div className="w-52 h-44 font-inter font-black text-5xl leading-[65px] text-center tracking-tight text-white opacity-80">
            Pay With Wave
          </div>
        </div>
      </div>
    </div>
  );

  // Transaction History Component
  const TransactionHistory = () => {
    const handleSelectAll = (checked) => {
      const updatedData = transactionHistoryData.map(transaction => ({
        ...transaction,
        selected: checked
      }));
      setSelectedTransactions(checked ? transactionHistoryData.map(t => t.id) : []);
    };

    const handleSelectTransaction = (id, checked) => {
      if (checked) {
        setSelectedTransactions(prev => [...prev, id]);
      } else {
        setSelectedTransactions(prev => prev.filter(transactionId => transactionId !== id));
      }
    };

    const getStatusColor = (status) => {
      switch (status) {
        case 'Completed': return 'bg-green-100 text-green-800 border-green-200';
        case 'Pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
        case 'Failed': return 'bg-red-100 text-red-800 border-red-200';
        default: return 'bg-gray-100 text-gray-800 border-gray-200';
      }
    };

    return (
      <div className="w-full h-full bg-white">
        {/* Page Header */}
        <div className="flex flex-row justify-between items-center p-2 gap-2 w-full h-18 border-b border-gray-300">
          <div className="flex flex-col justify-center items-start p-0 gap-1 w-54 h-10 ml-10">
            <div className="w-54 h-5 font-inter font-semibold text-lg leading-5 text-gray-900">
              Transaction History
            </div>
            <div className="w-39 h-4 font-inter font-normal text-xs leading-4 text-gray-900 opacity-60">
              View all transaction details
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-row items-center p-0 gap-5 w-84 h-10 mr-10">
            <button className="flex flex-row justify-center items-center p-2 gap-2 w-22 h-10 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
              <span className="w-4 h-4">☰</span>
              <span className="w-8 h-6 font-inter font-medium text-sm leading-6 text-black">Filter</span>
            </button>

            <button className="flex flex-row justify-center items-center p-2 gap-2 w-25 h-10 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
              <span className="w-4 h-4">🗑️</span>
              <span className="w-11 h-6 font-inter font-medium text-sm leading-6 text-black">Delete</span>
            </button>

            <button className="flex flex-row items-center p-2 gap-2 w-24 h-10 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
              <span className="w-4 h-4">📤</span>
              <span className="w-11 h-6 font-inter font-medium text-sm leading-6 text-black">Export</span>
            </button>
          </div>
        </div>

        {/* Table Headers */}
        <div className="flex flex-row items-center p-5 gap-8 w-full h-16 border-b border-gray-300">
          <div className="flex flex-row justify-center items-center p-0 gap-1 w-5 h-5">
            <input 
              type="checkbox" 
              className="w-4 h-4"
              onChange={(e) => handleSelectAll(e.target.checked)}
            />
          </div>
          
          <div className="flex flex-row items-center p-0 gap-1 w-20 h-6">
            <span className="font-inter font-medium text-xs leading-6 text-black">User Name</span>
            <span className="transform rotate-90 text-xs">▼</span>
          </div>

          <div className="flex flex-row items-center p-0 gap-1 w-32 h-6">
            <span className="font-inter font-medium text-xs leading-6 text-black">Date And Time</span>
            <span className="transform rotate-90 text-xs">▼</span>
          </div>

          <div className="flex flex-row items-center p-0 gap-1 w-16 h-6">
            <span className="font-inter font-medium text-xs leading-6 text-black">Amount</span>
            <span className="transform rotate-90 text-xs">▼</span>
          </div>

          <div className="flex flex-row items-center p-0 gap-1 w-25 h-6">
            <span className="font-inter font-medium text-xs leading-6 text-black">Transaction Fee</span>
            <span className="transform rotate-90 text-xs">▼</span>
          </div>

          <div className="flex flex-row items-center p-0 gap-1 w-32 h-6">
            <span className="font-inter font-medium text-xs leading-6 text-black">Net Amount</span>
            <span className="transform rotate-90 text-xs">▼</span>
          </div>

          <div className="flex flex-row items-center p-0 gap-1 w-32 h-6">
            <span className="font-inter font-medium text-xs leading-6 text-black">Transaction Status</span>
            <span className="transform rotate-90 text-xs">▼</span>
          </div>
        </div>

        {/* Transaction Rows */}
        {transactionHistoryData.map((transaction) => (
          <div key={transaction.id} className="flex flex-row items-center p-3 gap-8 w-full h-13 border-b border-gray-300 hover:bg-gray-50">
            <div className="flex flex-row justify-center items-center p-0 gap-1 w-5 h-5">
              <input 
                type="checkbox" 
                checked={selectedTransactions.includes(transaction.id)}
                onChange={(e) => handleSelectTransaction(transaction.id, e.target.checked)}
                className="w-4 h-4"
              />
            </div>
            
            <div className="w-20 h-6 font-inter font-medium text-xs leading-6 text-black">
              {transaction.userName}
            </div>

            <div className="w-32 h-6 font-inter font-medium text-xs leading-6 text-black">
              {transaction.dateTime}
            </div>

            <div className="w-16 h-6 font-inter font-medium text-xs leading-6 text-black">
              {transaction.amount}
            </div>

            <div className="w-25 h-6 font-inter font-medium text-xs leading-6 text-black">
              {transaction.fee}
            </div>

            <div className="w-32 h-6 font-inter font-medium text-xs leading-6 text-black">
              {transaction.netAmount}
            </div>

            <div className="w-17 h-4">
              <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(transaction.status)}`}>
                {transaction.status}
              </span>
            </div>
          </div>
        ))}

        {/* Pagination */}
        <div className="flex flex-row justify-between items-center p-5 gap-50 w-full h-19">
          <div className="flex flex-row justify-center items-start p-0 w-full h-9">
            <button className="flex flex-row items-center p-3 gap-2 w-28 h-9 bg-white border border-gray-300 rounded-full shadow-sm hover:bg-gray-50">
              <span className="w-4 h-4">‹</span>
              <span className="w-16 h-6 font-inter font-medium text-sm leading-6 text-gray-600">Previous</span>
            </button>

            <div className="flex flex-row justify-center items-start p-0 gap-1 w-80 h-9 mx-4">
              {[1, 2, 3, '...', 10].map((page, index) => (
                <button
                  key={index}
                  className={`flex flex-row justify-center items-center p-0 w-9 h-9 rounded-full ${
                    page === 1 ? 'bg-blue-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <span className="font-inter font-medium text-sm leading-6">{page}</span>
                </button>
              ))}
            </div>

            <button className="flex flex-row items-center p-3 gap-2 w-20 h-9 bg-white border border-gray-300 rounded-full shadow-sm hover:bg-gray-50">
              <span className="w-16 h-6 font-inter font-medium text-sm leading-6 text-gray-600">Next</span>
              <span className="w-4 h-4">›</span>
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Other page components
  const SettlementHistory = () => (
    <div className="p-5 w-full h-full">
      <h2 className="text-2xl font-bold text-black">Settlement History</h2>
      <p className="text-gray-600">Settlement records will appear here</p>
    </div>
  );

  const TotalOrder = () => (
    <div className="p-5 w-full h-full">
      <h2 className="text-2xl font-bold text-black">Total Order</h2>
      <p className="text-gray-600">Order information will appear here</p>
    </div>
  );

  // Render page content
  const renderPageContent = () => {
    switch (activePage) {
      case 'dashboard':
        return <DashboardContent />;
      case 'transaction':
        return <TransactionHistory />;
      case 'settlement':
        return <SettlementHistory />;
      case 'orders':
        return <TotalOrder />;
      default:
        return <DashboardContent />;
    }
  };

  return (
    <div className="flex h-screen bg-white text-black font-inter">
      {/* Sidebar */}
      <div className="flex flex-col items-start p-0 w-80 h-full bg-gray-900 border-r border-gray-300 flex-none">
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
                  onClick={() => setActivePage(item.id)}
                  className={`
                    w-full text-left p-3 rounded-lg border-none cursor-pointer
                    flex items-center gap-3 font-inter text-sm font-medium
                    transition-all duration-200
                    ${activePage === item.id 
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

      {/* Main Content Area */}
      <div className="flex flex-col items-start p-0 w-full h-full flex-1">
        {/* Top Bar */}
        <div className="flex flex-row justify-between items-center p-2 gap-2 w-full h-18 border-b border-gray-300">
          {/* Left Side - Hello Text */}
          <div className="w-24 h-11 font-inter font-bold text-2xl leading-11 tracking-tight text-black ml-10">
            Hello...
          </div>

          {/* Center - Search and Actions */}
          <div className="flex flex-row items-center p-0 gap-9 w-96 h-14">
            {/* Search Box */}
            <div className="flex flex-row items-start p-2 gap-2 w-72 h-14">
              <div className="flex flex-row items-center p-0 gap-2 w-60 h-8 border border-black rounded-lg flex-1">
                <span className="opacity-40 ml-2">🔍</span>
                <input
                  type="text"
                  placeholder="Search Hare..."
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
            <span className="text-white text-base">o</span>
          </div>
        </div>

        {/* Page Content */}
        <div className="w-full h-full overflow-auto">
          {renderPageContent()}
        </div>
      </div>
    </div>
  );
};

export default MerchantDashboard;