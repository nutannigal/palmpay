// src/pages/common/NotFound.jsx
import React from 'react'
import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full text-center">
        {/* 404 Illustration */}
        <div className="mb-8">
          <div className="text-8xl mb-4">🔍</div>
          <h1 className="text-6xl font-bold text-gray-900 mb-2">404</h1>
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Page Not Found</h2>
        </div>

        {/* Message */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          <p className="text-gray-600 mb-4">
            Sorry, we couldn't find the page you're looking for. The page might have been moved, deleted, or you entered an incorrect URL.
          </p>
          
          <div className="space-y-3 text-sm text-gray-500">
            <p>Here are some helpful links instead:</p>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-purple-600 hover:text-purple-500 font-medium">
                  ← Go back to Home
                </Link>
              </li>
              <li>
                <Link to="/merchant/dashboard" className="text-purple-600 hover:text-purple-500 font-medium">
                  Merchant Dashboard
                </Link>
              </li>
              <li>
                <Link to="/admin/dashboard" className="text-purple-600 hover:text-purple-500 font-medium">
                  Admin Dashboard
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/"
            className="btn btn-primary flex items-center justify-center"
          >
            🏠 Go Home
          </Link>
          <button
            onClick={() => window.history.back()}
            className="btn btn-secondary flex items-center justify-center"
          >
            ↩️ Go Back
          </button>
        </div>

        {/* Support Info */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <p className="text-sm text-gray-500">
            If you believe this is an error, please{' '}
            <a href="/merchant/help" className="text-purple-600 hover:text-purple-500 font-medium">
              contact support
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}

export default NotFound