// src/components/common/Pagination.jsx
import React from 'react'

const Pagination = ({
  currentPage,
  totalItems,
  pageSize,
  onPageChange,
  className = ''
}) => {
  const totalPages = Math.ceil(totalItems / pageSize)
  const maxVisiblePages = 5

  if (totalPages <= 1) return null

  const getPageNumbers = () => {
    const half = Math.floor(maxVisiblePages / 2)
    let start = Math.max(currentPage - half, 1)
    let end = Math.min(start + maxVisiblePages - 1, totalPages)

    if (end - start + 1 < maxVisiblePages) {
      start = Math.max(end - maxVisiblePages + 1, 1)
    }

    return Array.from({ length: end - start + 1 }, (_, i) => start + i)
  }

  return (
    <div className={`flex items-center space-x-1 ${className}`}>
      {/* Previous Button */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-3 py-1 rounded-lg border border-gray-300 text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
      >
        Previous
      </button>

      {/* First Page */}
      {currentPage > Math.floor(maxVisiblePages / 2) + 1 && (
        <>
          <button
            onClick={() => onPageChange(1)}
            className="px-3 py-1 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors"
          >
            1
          </button>
          {currentPage > Math.floor(maxVisiblePages / 2) + 2 && (
            <span className="px-2 text-gray-500">...</span>
          )}
        </>
      )}

      {/* Page Numbers */}
      {getPageNumbers().map(page => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`px-3 py-1 rounded-lg border transition-colors ${
            currentPage === page
              ? 'bg-purple-600 text-white border-purple-600'
              : 'border-gray-300 text-gray-700 hover:bg-gray-50'
          }`}
        >
          {page}
        </button>
      ))}

      {/* Last Page */}
      {currentPage < totalPages - Math.floor(maxVisiblePages / 2) && (
        <>
          {currentPage < totalPages - Math.floor(maxVisiblePages / 2) - 1 && (
            <span className="px-2 text-gray-500">...</span>
          )}
          <button
            onClick={() => onPageChange(totalPages)}
            className="px-3 py-1 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors"
          >
            {totalPages}
          </button>
        </>
      )}

      {/* Next Button */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-3 py-1 rounded-lg border border-gray-300 text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
      >
        Next
      </button>
    </div>
  )
}

export default Pagination