// import React from 'react'

// const Sidebar = ({ activeMenu, setActiveMenu, sidebarOpen, setSidebarOpen }) => {
//   const menuItems = [
//     { id: 'dashboard', label: 'Dashboard', icon: '📊' },
//     { id: 'transactions', label: 'Transaction History', icon: '💳' },
//     { id: 'settlements', label: 'Settlement History', icon: '🏦' },
//     { id: 'orders', label: 'Total Order', icon: '📦' }
//   ]

//   const generalItems = [
//     { id: 'help', label: 'Help', icon: '❓' },
//     { id: 'settings', label: 'Setting', icon: '⚙️' }
//   ]

//   return (
//     <>
//       {/* Mobile Overlay */}
//       {sidebarOpen && (
//         <div 
//           className="fixed inset-0 bg-gray-900 bg-opacity-50 z-40 lg:hidden"
//           onClick={() => setSidebarOpen(false)}
//         />
//       )}

//       {/* Sidebar */}
//       <div className={`
//         fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-xl transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0
//         ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
//       `}>
//         {/* Header */}
//         <div className="p-4 lg:p-6 border-b border-gray-200">
//           <div className="flex items-center justify-between">
//             <div>
//               <h1 className="text-xl lg:text-2xl font-bold text-gray-800">PalmPay</h1>
//               <p className="text-xs lg:text-sm text-gray-600 mt-1">Pulse of Payment</p>
//             </div>
//             <button
//               onClick={() => setSidebarOpen(false)}
//               className="lg:hidden p-2 rounded-lg text-gray-500 hover:bg-gray-100"
//             >
//               <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//               </svg>
//             </button>
//           </div>
//         </div>

//         {/* Menu */}
//         <div className="p-4">
//           <h3 className="text-xs lg:text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3 lg:mb-4">
//             Menu
//           </h3>
//           <nav className="space-y-1 lg:space-y-2">
//             {menuItems.map((item) => (
//               <button
//                 key={item.id}
//                 onClick={() => {
//                   setActiveMenu(item.id)
//                   setSidebarOpen(false)
//                 }}
//                 className={`w-full flex items-center px-3 lg:px-4 py-2 lg:py-3 text-left rounded-lg transition-all duration-200 ${
//                   activeMenu === item.id
//                     ? 'bg-purple-100 text-purple-700 border-r-2 border-purple-600 shadow-sm'
//                     : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
//                 }`}
//               >
//                 <span className="text-base lg:text-lg mr-2 lg:mr-3">{item.icon}</span>
//                 <span className="text-sm lg:text-base font-medium">{item.label}</span>
//               </button>
//             ))}
//           </nav>

//           <div className="mt-6 lg:mt-8">
//             <h3 className="text-xs lg:text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3 lg:mb-4">
//               General
//             </h3>
//             <nav className="space-y-1 lg:space-y-2">
//               {generalItems.map((item) => (
//                 <button
//                   key={item.id}
//                   onClick={() => {
//                     setActiveMenu(item.id)
//                     setSidebarOpen(false)
//                   }}
//                   className={`w-full flex items-center px-3 lg:px-4 py-2 lg:py-3 text-left rounded-lg transition-all duration-200 ${
//                     activeMenu === item.id
//                       ? 'bg-purple-100 text-purple-700 border-r-2 border-purple-600 shadow-sm'
//                       : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
//                   }`}
//                 >
//                   <span className="text-base lg:text-lg mr-2 lg:mr-3">{item.icon}</span>
//                   <span className="text-sm lg:text-base font-medium">{item.label}</span>
//                 </button>
//               ))}
//             </nav>
//           </div>

//           {/* Location Info */}
//           <div className="mt-6 lg:mt-8 pt-4 lg:pt-6 border-t border-gray-200">
//             <div className="px-3 lg:px-4 py-3 bg-gray-50 rounded-lg">
//               <div className="flex items-center">
//                 <span className="text-lg mr-3">📍</span>
//                 <div>
//                   <p className="font-medium text-gray-800 text-sm lg:text-base">Pune Metro</p>
//                   <p className="text-xs lg:text-sm text-gray-600">Pune, Maharashtra</p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   )
// }

// export default Sidebar