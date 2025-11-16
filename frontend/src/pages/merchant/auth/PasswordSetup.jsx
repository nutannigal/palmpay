// // src/pages/auth/PasswordSetup.jsx
// import React, { useState } from 'react'
// import { useNavigate, useLocation } from 'react-router-dom'
// import { useAuth } from '../../../hooks/useAuth'

// const PasswordSetup = () => {
//   const [formData, setFormData] = useState({
//     password: '',
//     confirmPassword: ''
//   })
//   const [loading, setLoading] = useState(false)
//   const [showPassword, setShowPassword] = useState(false)
//   const navigate = useNavigate()
//   const location = useLocation()
//   const { register } = useAuth()

//   const mobile = location.state?.mobile || '+91 XXXXX XXXXX'

//   const handleSubmit = async (e) => {
//     e.preventDefault()
    
//     if (formData.password !== formData.confirmPassword) {
//       alert('Passwords do not match')
//       return
//     }

//     if (formData.password.length < 6) {
//       alert('Password must be at least 6 characters long')
//       return
//     }

//     setLoading(true)
    
//     try {
//       // Simulate password setup and registration completion
//       await new Promise(resolve => setTimeout(resolve, 1000))
      
//       // In real app, you would complete registration:
//       // const registrationData = {
//       //   ...location.state?.registrationData,
//       //   password: formData.password
//       // }
//       // await register(registrationData)
      
//       console.log('Password setup completed for:', mobile)
      
//       // Navigate to login or directly to dashboard based on your flow
//       navigate('/', { 
//         state: { 
//           message: 'Registration completed successfully! Please login.' 
//         } 
//       })
//     } catch (error) {
//       console.error('Password setup failed:', error)
//     } finally {
//       setLoading(false)
//     }
//   }

//   const handleChange = (e) => {
//     setFormData(prev => ({
//       ...prev,
//       [e.target.name]: e.target.value
//     }))
//   }

//   const passwordStrength = () => {
//     const length = formData.password.length
//     if (length === 0) return { text: '', color: '' }
//     if (length < 6) return { text: 'Weak', color: 'text-red-600' }
//     if (length < 8) return { text: 'Fair', color: 'text-yellow-600' }
//     return { text: 'Strong', color: 'text-green-600' }
//   }

//   const strength = passwordStrength()

//   return (
//     <div 
//       className="min-h-screen flex flex-col py-12 px-4 sm:px-6 lg:px-8 relative"
//       style={{
//         background: 'linear-gradient(135deg, #3A41C6 0%, #4C2C96 25%, #8A2BE2 50%, #ffa8f7 75%, #f88bff 100%)',
//         backgroundSize: '400% 400%',
//         animation: 'gradientShift 8s ease infinite'
//       }}
//     >
//       <style jsx>{`
//         @keyframes gradientShift {
//           0% { background-position: 0% 50%; }
//           50% { background-position: 100% 50%; }
//           100% { background-position: 0% 50%; }
//         }
        
//         @keyframes textGradient {
//           0% { background-position: 0% 50%; }
//           50% { background-position: 100% 50%; }
//           100% { background-position: 0% 50%; }
//         }
        
//         .gradient-text {
//           background: linear-gradient(135deg, #3A41C6 0%, #8A2BE2 25%, #ffa8f7 50%, #f88bff 75%, #FFFFFF 100%);
//           background-size: 400% 400%;
//           -webkit-background-clip: text;
//           -webkit-text-fill-color: transparent;
//           background-clip: text;
//           animation: textGradient 6s ease infinite;
//         }
//       `}</style>

//       {/* Logo in top left corner */}
//       <div className="absolute top-6 left-6 sm:top-8 sm:left-8">
//         <div className="flex items-center space-x-3">
//           <h1 className="text-3xl sm:text-4xl font-bold tracking-tight gradient-text">
//             PalmPay
//           </h1>
//         </div>
//         <p className="mt-1 text-sm sm:text-lg font-medium text-white opacity-90">
//           Pulse of Payment
//         </p>
//       </div>

//       {/* Main Content Centered */}
//       <div className="flex-1 flex flex-col justify-center items-center mt-16">
//         <div className="w-full max-w-md">
//           {/* Main Card */}
//           <div 
//             className="bg-white rounded-2xl shadow-xl p-8 backdrop-blur-sm bg-opacity-95 border border-white border-opacity-20"
//             style={{
//               boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1), 0 8px 24px rgba(139, 0, 255, 0.15)'
//             }}
//           >
//             {/* Header */}
//             <div className="text-center mb-8">
//               <h2 className="text-2xl font-bold text-black mb-2">
//                 Setup Password
//               </h2>
//               <p className="text-gray-600">
//                 Almost done! Setup your password for
//               </p>
//               <p className="font-semibold text-black mt-1 text-lg">
//                 {mobile}
//               </p>
//             </div>

//             <form className="space-y-6" onSubmit={handleSubmit}>
//               {/* Password Input */}
//               <div>
//                 <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
//                   Password
//                 </label>
//                 <div className="mt-1 relative">
//                   <input
//                     id="password"
//                     name="password"
//                     type={showPassword ? "text" : "password"}
//                     required
//                     value={formData.password}
//                     onChange={handleChange}
//                     className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-200 bg-gray-50 pr-12"
//                     placeholder="Enter your password"
//                   />
//                   <button
//                     type="button"
//                     className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700"
//                     onClick={() => setShowPassword(!showPassword)}
//                   >
//                     {showPassword ? '🙈' : '👁️'}
//                   </button>
//                 </div>
//                 {formData.password && (
//                   <p className={`mt-2 text-sm font-medium ${strength.color}`}>
//                     Password strength: {strength.text}
//                   </p>
//                 )}
//               </div>

//               {/* Confirm Password */}
//               <div>
//                 <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
//                   Confirm Password
//                 </label>
//                 <div className="mt-1">
//                   <input
//                     id="confirmPassword"
//                     name="confirmPassword"
//                     type="password"
//                     required
//                     value={formData.confirmPassword}
//                     onChange={handleChange}
//                     className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-200 bg-gray-50"
//                     placeholder="Confirm your password"
//                   />
//                 </div>
//                 {formData.confirmPassword && formData.password !== formData.confirmPassword && (
//                   <p className="mt-2 text-sm text-red-600 font-medium">
//                     Passwords do not match
//                   </p>
//                 )}
//               </div>

//               {/* Password Requirements */}
//               <div className="text-sm text-gray-600 bg-gray-50 p-4 rounded-lg border border-gray-200">
//                 <p className="font-medium text-gray-700 mb-2">Password requirements:</p>
//                 <ul className="list-disc list-inside space-y-1">
//                   <li className={formData.password.length >= 6 ? 'text-green-600' : 'text-gray-500'}>
//                     At least 6 characters long
//                   </li>
//                   <li className={/[a-zA-Z]/.test(formData.password) && /\d/.test(formData.password) ? 'text-green-600' : 'text-gray-500'}>
//                     Include letters and numbers
//                   </li>
//                 </ul>
//               </div>

//               {/* Submit Button with Gradient */}
//               <button
//                 type="submit"
//                 disabled={loading || formData.password !== formData.confirmPassword || formData.password.length < 6}
//                 className="w-full py-4 px-4 border border-transparent rounded-xl text-lg font-semibold text-white transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg relative overflow-hidden"
//                 style={{
//                   background: 'linear-gradient(135deg, #3A41C6 0%, #4C2C96 25%, #8A2BE2 50%, #ffa8f7 75%, #f88bff 100%)',
//                   backgroundSize: '400% 400%',
//                   animation: 'gradientShift 6s ease infinite',
//                   boxShadow: '0 4px 15px rgba(58, 65, 198, 0.4)'
//                 }}
//                 onMouseOver={(e) => {
//                   if (!e.target.disabled) {
//                     e.target.style.transform = 'translateY(-2px)'
//                     e.target.style.boxShadow = '0 8px 25px rgba(58, 65, 198, 0.6)'
//                   }
//                 }}
//                 onMouseOut={(e) => {
//                   e.target.style.transform = 'translateY(0)'
//                   e.target.style.boxShadow = '0 4px 15px rgba(58, 65, 198, 0.4)'
//                 }}
//               >
//                 {loading ? (
//                   <div className="flex items-center justify-center">
//                     <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
//                     Setting up...
//                   </div>
//                 ) : (
//                   'Complete Registration'
//                 )}
//               </button>

//               {/* Back Link */}
//               <div className="text-center pt-2">
//                 <button
//                   type="button"
//                   onClick={() => navigate('/verify-otp')}
//                   className="text-purple-600 hover:text-purple-700 font-medium transition-colors duration-200 flex items-center justify-center space-x-2 mx-auto"
//                 >
//                   <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
//                   </svg>
//                   <span>Back to OTP verification</span>
//                 </button>
//               </div>
//             </form>
//           </div>

//           {/* Security Note */}
//           <div className="mt-6 text-center">
//             <p className="text-white text-opacity-80 text-sm">
//               🔒 Your information is secure and encrypted
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default PasswordSetup