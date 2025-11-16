import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Unauthorized = () => {
  const location = useLocation();
  const { requiredRole, userRole, requiredPermissions, userPermissions } = location.state || {};

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <span className="text-3xl">🚫</span>
        </div>
        
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Access Denied</h1>
        
        <p className="text-gray-600 mb-6">
          You don't have permission to access this page.
        </p>

        {/* Show specific requirements if available */}
        {(requiredRole || requiredPermissions) && (
          <div className="bg-white rounded-lg p-4 mb-6 text-left">
            <h3 className="font-semibold text-gray-900 mb-2">Requirements:</h3>
            {requiredRole && (
              <p className="text-sm text-gray-600 mb-1">
                Required Role: <span className="font-medium">{requiredRole}</span>
                {userRole && (
                  <span className="ml-2">(Your role: {userRole})</span>
                )}
              </p>
            )}
            {requiredPermissions && requiredPermissions.length > 0 && (
              <p className="text-sm text-gray-600">
                Required Permissions: {requiredPermissions.join(', ')}
              </p>
            )}
          </div>
        )}

        <div className="space-y-3">
          <Link
            to="/dashboard"
            className="block w-full bg-[#00D2B8] text-white py-3 rounded-lg hover:bg-[#00A896] transition-colors duration-200 font-medium"
          >
            Go to Dashboard
          </Link>
          <Link
            to="/"
            className="block w-full border border-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-50 transition-colors duration-200 font-medium"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Unauthorized;