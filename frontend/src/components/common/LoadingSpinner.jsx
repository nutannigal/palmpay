// src/components/common/LoadingSpinner.jsx (Advanced Version)
import React from 'react'

const LoadingSpinner = ({
  size = 'md',
  variant = 'primary',
  type = 'spinner', // 'spinner', 'dots', 'pulse', 'bars'
  className = '',
  text = '',
  overlay = false,
  fullScreen = false,
  centered = false
}) => {
  const sizeClasses = {
    xs: { container: 'w-4 h-4', text: 'text-xs' },
    sm: { container: 'w-6 h-6', text: 'text-sm' },
    md: { container: 'w-8 h-8', text: 'text-base' },
    lg: { container: 'w-12 h-12', text: 'text-lg' },
    xl: { container: 'w-16 h-16', text: 'text-xl' }
  }

  const variantClasses = {
    primary: 'text-purple-600',
    secondary: 'text-gray-600',
    white: 'text-white',
    success: 'text-green-600',
    danger: 'text-red-600',
    warning: 'text-yellow-600',
    light: 'text-gray-300'
  }

  // Different loading animation types
  const renderSpinner = () => {
    const baseClasses = `${sizeClasses[size].container} ${variantClasses[variant]} ${className}`

    switch (type) {
      case 'dots':
        return (
          <div className={`flex space-x-1 ${baseClasses}`}>
            <div className="w-1/3 h-full bg-current rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
            <div className="w-1/3 h-full bg-current rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
            <div className="w-1/3 h-full bg-current rounded-full animate-bounce" style={{ animationDelay: '0.3s' }} />
          </div>
        )

      case 'pulse':
        return (
          <div className={`rounded-full bg-current animate-pulse ${baseClasses}`} />
        )

      case 'bars':
        return (
          <div className={`flex space-x-1 items-end ${baseClasses}`}>
            <div className="w-1/4 h-1/3 bg-current animate-pulse" style={{ animationDelay: '0.1s' }} />
            <div className="w-1/4 h-2/3 bg-current animate-pulse" style={{ animationDelay: '0.2s' }} />
            <div className="w-1/4 h-full bg-current animate-pulse" style={{ animationDelay: '0.3s' }} />
            <div className="w-1/4 h-2/3 bg-current animate-pulse" style={{ animationDelay: '0.4s' }} />
          </div>
        )

      case 'spinner':
      default:
        return (
          <div className={`animate-spin rounded-full border-b-2 border-current ${baseClasses}`} />
        )
    }
  }

  const content = (
    <div className={`flex flex-col items-center justify-center space-y-3 ${centered ? 'mx-auto' : ''}`}>
      {renderSpinner()}
      {text && (
        <p className={`${sizeClasses[size].text} ${variant === 'white' ? 'text-white' : 'text-gray-600'}`}>
          {text}
        </p>
      )}
    </div>
  )

  if (overlay) {
    return (
      <div className={`absolute inset-0 bg-white bg-opacity-80 flex items-center justify-center z-50 rounded-lg ${fullScreen ? 'h-screen' : ''}`}>
        {content}
      </div>
    )
  }

  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-white bg-opacity-80 flex items-center justify-center z-50">
        {content}
      </div>
    )
  }

  return content
}

// Pre-configured spinner variants for common use cases
export const PageLoader = ({ text = 'Loading...' }) => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50">
    <LoadingSpinner
      size="lg"
      variant="primary"
      text={text}
      centered
    />
  </div>
)

export const ButtonSpinner = ({ size = 'sm', variant = 'white' }) => (
  <LoadingSpinner
    size={size}
    variant={variant}
    className="mx-2"
  />
)

export const TableLoader = () => (
  <div className="p-8 flex justify-center">
    <LoadingSpinner
      size="md"
      variant="primary"
      text="Loading data..."
    />
  </div>
)

export const CardLoader = () => (
  <div className="p-6">
    <LoadingSpinner
      size="sm"
      variant="primary"
      text="Loading..."
      centered
    />
  </div>
)

export default LoadingSpinner