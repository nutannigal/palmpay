// import React, { useState } from 'react';

// const Dashboard = () => {
//   const [activeTab, setActiveTab] = useState('registration');
//   const [mobileNumber, setMobileNumber] = useState('+91-1234567890');
//   const [otp, setOtp] = useState('129009');
//   const [isOtpSent, setIsOtpSent] = useState(false);

//   const handleSendOtp = () => {
//     setIsOtpSent(true);
//   };

//   const handleContinue = () => {
//     // Handle registration
//     console.log('Registration completed');
//   };

//   // Mock data for dashboard
//   const merchantStats = [
//     { label: 'Total Transactions', value: '1,234', change: '+12%' },
//     { label: 'Revenue', value: '₹89,456', change: '+8%' },
//     { label: 'Active Customers', value: '567', change: '+5%' },
//   ];

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Header */}
//       <header className="bg-white shadow-sm">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex justify-between items-center py-4">
//             <div className="flex items-center">
//               <h1 className="text-2xl font-bold text-purple-900">PalmPay</h1>
//               <span className="ml-2 text-sm text-gray-500">Merchant Portal</span>
//             </div>
//             <div className="flex items-center space-x-4">
//               <button className="text-gray-600 hover:text-gray-900">Help</button>
//               <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold">
//                 M
//               </div>
//             </div>
//           </div>
//         </div>
//       </header>

//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//           {/* Left Sidebar - Navigation */}
//           <div className="lg:col-span-1">
//             <nav className="bg-white rounded-lg shadow-sm p-6">
//               <h2 className="text-lg font-semibold text-gray-800 mb-4">Menu</h2>
//               <ul className="space-y-2">
//                 {['Dashboard', 'Registration', 'Transactions', 'Settlements', 'Reports'].map((item) => (
//                   <li key={item}>
//                     <button
//                       onClick={() => setActiveTab(item.toLowerCase())}
//                       className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
//                         activeTab === item.toLowerCase()
//                           ? 'bg-purple-100 text-purple-700'
//                           : 'text-gray-600 hover:bg-gray-100'
//                       }`}
//                     >
//                       {item}
//                     </button>
//                   </li>
//                 ))}
//               </ul>
//             </nav>

//             {/* Quick Stats */}
//             <div className="bg-white rounded-lg shadow-sm p-6 mt-6">
//               <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Stats</h3>
//               <div className="space-y-4">
//                 {merchantStats.map((stat, index) => (
//                   <div key={index} className="flex justify-between items-center">
//                     <span className="text-gray-600">{stat.label}</span>
//                     <div className="text-right">
//                       <div className="font-semibold text-gray-800">{stat.value}</div>
//                       <div className="text-sm text-green-600">{stat.change}</div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>

//           {/* Main Content */}
//           <div className="lg:col-span-2">
//             {activeTab === 'registration' && (
//               <div className="bg-white rounded-lg shadow-sm p-8">
//                 <div className="text-center mb-8">
//                   <h2 className="text-2xl font-bold text-gray-800 mb-2">Hello...</h2>
//                   <p className="text-gray-600">User Registration</p>
//                 </div>

//                 {/* Mobile Number Section */}
//                 <div className="mb-6">
//                   <label className="block text-sm font-medium text-gray-700 mb-3">
//                     Mobile Number
//                   </label>
//                   <div className="relative">
//                     <input
//                       type="text"
//                       value={mobileNumber}
//                       onChange={(e) => setMobileNumber(e.target.value)}
//                       className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
//                       placeholder="+91-1234567890"
//                     />
//                     {!isOtpSent && (
//                       <button
//                         onClick={handleSendOtp}
//                         className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-purple-600 text-white px-4 py-1 rounded-md text-sm hover:bg-purple-700"
//                       >
//                         Send OTP
//                       </button>
//                     )}
//                   </div>
//                 </div>

//                 {/* OTP Section */}
//                 {isOtpSent && (
//                   <div className="mb-6">
//                     <label className="block text-sm font-medium text-gray-700 mb-3">
//                       OTP
//                     </label>
//                     <div className="relative">
//                       <input
//                         type="text"
//                         value={otp}
//                         onChange={(e) => setOtp(e.target.value)}
//                         className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
//                         placeholder="Enter OTP"
//                         maxLength={6}
//                       />
//                       <button className="absolute right-2 top-1/2 transform -translate-y-1/2 text-purple-600 text-sm hover:text-purple-700">
//                         Resend
//                       </button>
//                     </div>
//                   </div>
//                 )}

//                 {/* Continue Button */}
//                 <button
//                   onClick={handleContinue}
//                   disabled={!isOtpSent || otp.length !== 6}
//                   className="w-full bg-purple-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-purple-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
//                 >
//                   Continue
//                 </button>
//               </div>
//             )}

//             {activeTab === 'dashboard' && (
//               <div className="bg-white rounded-lg shadow-sm p-8">
//                 <h2 className="text-2xl font-bold text-gray-800 mb-6">Dashboard Overview</h2>
//                 {/* Add dashboard content here */}
//                 <div className="text-center text-gray-500 py-12">
//                   Dashboard content will appear here
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;