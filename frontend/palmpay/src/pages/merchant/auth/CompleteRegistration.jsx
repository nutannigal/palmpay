import React, { useState } from 'react';

const HandScanner = ({ onComplete }) => {
  const [isScanning, setIsScanning] = useState(false);
  const [scanComplete, setScanComplete] = useState(false);
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState({ message: '', type: '' });

  const handleCapture = () => {
    if (isScanning) return;

    setIsScanning(true);
    setScanComplete(false);
    setProgress(0);
    setStatus({ message: '', type: '' });

    // Simulate scanning process
    const interval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + Math.random() * 15;
        
        if (newProgress >= 100) {
          clearInterval(interval);
          setIsScanning(false);
          setScanComplete(true);
          setStatus({ 
            message: 'Hand scan completed successfully!', 
            type: 'success' 
          });
          return 100;
        }
        return newProgress;
      });
    }, 300);
  };

  const handleContinue = () => {
    setStatus({ 
      message: 'Registration completed successfully!', 
      type: 'success' 
    });
    
    setTimeout(() => {
      alert('Registration completed!');
      if (onComplete) onComplete();
    }, 1000);
  };

  return (
    <div className="flex items-center justify-center p-4 py-8">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <p className="text-gray-600"> User Registration</p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8">
<p className="text-gray-800 text-2xl font-bold text-center">Scan Your Hand for Secure Registration</p>
          

          {/* Scanner Area */}
         <div className={`border-2 border-dashed rounded-lg p-12 text-center mb-8 transition-all duration-300 ${
            isScanning ? 'border-purple-500 bg-purple-50' : 'border-gray-300 bg-gray-50'
          }`}>
            <div className={`text-8xl mb-8 ${isScanning ? 'text-purple-600' : 'text-gray-400'}`}>
              ✋
            </div>
            <p className="text-gray-600 text-lg">
              {isScanning 
                ? 'Scanning in progress...' 
                : 'Place your hand on the scanner'
              }
            </p>
            {/* Progress Bar */}
            {isScanning && (
              <div className="mt-4">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-purple-600 h-2 rounded-full transition-all duration-300" 
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
                <p className="text-sm text-gray-600 mt-2">{Math.round(progress)}%</p>
              </div>
            )}
          </div>

          {/* Status Message */}
          {status.message && (
            <div className={`p-3 rounded-lg mb-4 text-center ${
              status.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
            }`}>
              {status.message}
            </div>
          )}

          {/* Buttons */}
          <div className="flex space-x-4">
            <button 
              onClick={handleCapture}
              disabled={isScanning}
              className="flex-1 bg-purple-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-purple-700 disabled:bg-gray-400 transition-colors"
            >
              {scanComplete ? 'Rescan' : 'Capture'}
            </button>
            <button 
              onClick={handleContinue}
              disabled={!scanComplete}
              className="flex-1 bg-green-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-green-700 disabled:bg-gray-400 transition-colors"
            >
              Complete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HandScanner;