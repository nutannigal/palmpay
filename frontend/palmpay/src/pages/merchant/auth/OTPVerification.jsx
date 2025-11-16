// src/pages/auth/OTPVerification.jsx
import React, { useState, useRef, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../../../hooks/useAuth'

const OTPVerification = () => {
  const [otp, setOtp] = useState(['', '', '', '', '', ''])
  const [loading, setLoading] = useState(false)
  const [timer, setTimer] = useState(60)
  const [error, setError] = useState('')
  const [remainingAttempts, setRemainingAttempts] = useState(5)
  const inputRefs = useRef([])
  const navigate = useNavigate()
  const location = useLocation()
  const { verifyOTP, resendOTP, getOTPStatus } = useAuth()

  const mobile = location.state?.mobile || ''
  const purpose = location.state?.purpose || 'registration'
  const debugOtp = location.state?.debugOtp

  useEffect(() => {
    // Initialize timer and check OTP status
    const initializeOTP = async () => {
      if (mobile) {
        const status = await getOTPStatus(mobile, purpose);
        if (status.success) {
          const timeLeft = Math.max(0, Math.ceil((new Date(status.data.expiresAt) - new Date()) / 1000));
          setTimer(timeLeft);
          setRemainingAttempts(status.data.maxAttempts - status.data.attempts);
        }
      }
    };

    initializeOTP();

    const countdown = setInterval(() => {
      setTimer(prev => {
        if (prev <= 1) {
          clearInterval(countdown)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(countdown)
  }, [mobile, purpose, getOTPStatus])

  const handleOtpChange = (index, value) => {
    if (value.length <= 1 && /^\d*$/.test(value)) {
      const newOtp = [...otp]
      newOtp[index] = value
      setOtp(newOtp)
      setError('')

      // Auto-focus next input
      if (value && index < 5) {
        inputRefs.current[index + 1].focus()
      }

      // Auto-submit when all digits are entered
      if (newOtp.every(digit => digit !== '') && index === 5) {
        handleSubmit(newOtp.join(''))
      }
    }
  }

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus()
    }
  }

  const handleSubmit = async (enteredOtp = null) => {
    const otpString = enteredOtp || otp.join('')
    
    if (otpString.length !== 6) {
      setError('Please enter a valid 6-digit OTP')
      return
    }

    setLoading(true)
    setError('')
    
    try {
      const result = await verifyOTP(mobile, otpString, purpose)
      
      if (result.success) {
        // Handle successful verification based on purpose
        switch (purpose) {
          case 'registration':
            navigate('/Confirm-Password', { 
              state: { 
                mobile,
                registrationData: location.state?.registrationData,
                otpVerified: true
              } 
            })
            break
          case 'login':
            // Handle login success - store token and redirect to dashboard
            if (result.data.token) {
              localStorage.setItem('token', result.data.token)
              localStorage.setItem('user', JSON.stringify(result.data.user))
              navigate('/dashboard', { state: { user: result.data.user } })
            }
            break
          case 'password_reset':
            navigate('/reset-password', { 
              state: { 
                mobile,
                userId: result.data.userId 
              } 
            })
            break
          default:
            navigate('/dashboard')
        }
      } else {
        setError(result.message)
        if (result.data?.remainingAttempts) {
          setRemainingAttempts(result.data.remainingAttempts)
        }
        
        // Clear OTP on error for better UX
        if (result.code === 'INVALID_OTP') {
          setOtp(['', '', '', '', '', ''])
          inputRefs.current[0].focus()
        }
      }
    } catch (error) {
      console.error('OTP verification failed:', error)
      setError('An unexpected error occurred. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleResendOTP = async () => {
    setError('')
    setLoading(true)
    
    try {
      const result = await resendOTP(mobile, purpose)
      
      if (result.success) {
        setTimer(60)
        setRemainingAttempts(5)
        setOtp(['', '', '', '', '', ''])
        inputRefs.current[0].focus()
        
        // Show success message
        setError('OTP sent successfully!')
        setTimeout(() => setError(''), 3000)
        
        // In development, show the OTP for testing
        if (process.env.NODE_ENV === 'development' && result.data.otp) {
          console.log('New OTP:', result.data.otp)
        }
      } else {
        setError(result.message)
        if (result.data?.retryAfter) {
          setTimer(result.data.retryAfter)
        }
      }
    } catch (error) {
      console.error('Resend OTP failed:', error)
      setError('Failed to resend OTP. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const getPurposeText = () => {
    switch (purpose) {
      case 'registration':
        return 'registration'
      case 'login':
        return 'login'
      case 'password_reset':
        return 'password reset'
      default:
        return 'account'
    }
  }

  return (
    <div 
      className="min-h-screen flex flex-col py-12 px-4 sm:px-6 lg:px-8 relative"
      style={{
        background: 'linear-gradient(135deg, #0652C5 0%, #D4418E 100%)',
        backgroundSize: '400% 400%',
        animation: 'gradientShift 8s ease infinite'
      }}
    >
      <style jsx>{`
        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        .button-hover {
          transition: all 0.3s ease;
        }

        .button-hover:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(6, 82, 197, 0.3);
        }
      `}</style>

      {/* Logo in top left corner */}
      <div className="absolute top-6 left-6 sm:top-8 sm:left-8">
        <div className="flex items-center space-x-3">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
            <span style={{ color: '#0652C5' }}>Palm</span>
            <span style={{ color: '#D4418E' }}>Pay</span>
          </h1>
        </div>
        <p className="mt-1 text-sm sm:text-lg font-medium text-white opacity-90">
          Pulse of Payment
        </p>
      </div>

      {/* Main Content Centered */}
      <div className="flex-1 flex flex-col justify-center items-center mt-16">
        <div className="w-full max-w-md">
          {/* Main Card */}
          <div 
            className="bg-white rounded-2xl shadow-xl p-8 backdrop-blur-sm bg-opacity-95 border border-white border-opacity-20"
            style={{
              boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1), 0 8px 24px rgba(6, 82, 197, 0.15)'
            }}
          >
            {/* Header */}
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                OTP Verification
              </h2>
              <p className="text-gray-600">
                Enter the OTP sent to your mobile number for {getPurposeText()}
              </p>
              <p className="font-semibold text-gray-800 mt-1 text-lg">
                +91 {mobile}
              </p>
              
              {/* Debug OTP in development */}
              {process.env.NODE_ENV === 'development' && debugOtp && (
                <div className="mt-2 p-2 bg-yellow-100 border border-yellow-400 rounded">
                  <p className="text-yellow-800 text-sm">
                    <strong>Development OTP:</strong> {debugOtp}
                  </p>
                </div>
              )}
            </div>

            {/* Error/Success Message */}
            {error && (
              <div className={`mb-4 p-3 rounded-lg text-center ${
                error.includes('successfully') 
                  ? 'bg-green-50 border border-green-200 text-green-600' 
                  : 'bg-red-50 border border-red-200 text-red-600'
              }`}>
                <p className="text-sm">{error}</p>
                {remainingAttempts < 5 && (
                  <p className="text-xs mt-1">
                    Remaining attempts: {remainingAttempts}
                  </p>
                )}
              </div>
            )}

            <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
              {/* OTP Inputs */}
              <div>
                <div className="flex justify-center space-x-3">
                  {otp.map((digit, index) => (
                    <input
                      key={index}
                      ref={el => inputRefs.current[index] = el}
                      type="text"
                      maxLength="1"
                      value={digit}
                      onChange={(e) => handleOtpChange(index, e.target.value)}
                      onKeyDown={(e) => handleKeyDown(index, e)}
                      className="w-14 h-14 text-center text-2xl font-bold border-2 border-gray-300 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-200 bg-gray-50"
                      style={{
                        borderColor: digit ? '#0652C5' : '#D1D5DB'
                      }}
                      disabled={loading}
                    />
                  ))}
                </div>
              </div>

              {/* Next Button with Gradient */}
              <button
                type="submit"
                disabled={loading || otp.join('').length !== 6}
                className="w-full py-4 px-4 rounded-xl text-lg font-semibold text-white transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed button-hover"
                style={{
                  background: 'linear-gradient(135deg, #0652C5 0%, #D4418E 100%)',
                  boxShadow: '0 4px 15px rgba(6, 82, 197, 0.4)'
                }}
                onMouseOver={(e) => {
                  if (!e.target.disabled) {
                    e.target.style.transform = 'translateY(-2px)'
                    e.target.style.boxShadow = '0 8px 25px rgba(6, 82, 197, 0.6)'
                  }
                }}
                onMouseOut={(e) => {
                  e.target.style.transform = 'translateY(0)'
                  e.target.style.boxShadow = '0 4px 15px rgba(6, 82, 197, 0.4)'
                }}
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    Verifying...
                  </div>
                ) : (
                  'Verify OTP'
                )}
              </button>

              {/* Resend OTP */}
              <div className="text-center pt-4">
                <p className="text-gray-600">
                  Didn't receive the code?{' '}
                  {timer > 0 ? (
                    <span className="text-gray-500 font-medium">
                      Resend OTP in {timer}s
                    </span>
                  ) : (
                    <button
                      type="button"
                      onClick={handleResendOTP}
                      disabled={loading}
                      className="font-semibold text-purple-600 hover:text-purple-700 transition-colors duration-200 disabled:opacity-50"
                    >
                      Resend OTP
                    </button>
                  )}
                </p>
              </div>

              {/* Back Link */}
              <div className="text-center pt-2">
                <button
                  type="button"
                  onClick={() => navigate(-1)}
                  className="text-purple-600 hover:text-purple-700 font-medium transition-colors duration-200 flex items-center justify-center space-x-2 mx-auto"
                  disabled={loading}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                  <span>Back to {getPurposeText()}</span>
                </button>
              </div>
            </form>
          </div>

          {/* Security Note */}
          <div className="mt-6 text-center">
            <p className="text-white text-opacity-90 text-sm font-medium">
              🔒 Your information is secure and encrypted
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OTPVerification