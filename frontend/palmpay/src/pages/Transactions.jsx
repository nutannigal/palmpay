import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

const Transactions = () => {
  const { user } = useAuth();
  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterDate, setFilterDate] = useState('all');
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const transactionsPerPage = 10;

  // Mock transactions data
  useEffect(() => {
    const mockTransactions = [
      {
        id: '1',
        type: 'sent',
        amount: 50.00,
        description: 'Dinner with friends',
        recipient: 'John Doe',
        recipientPhone: '+1234567890',
        date: '2024-01-15T14:30:00Z',
        status: 'completed',
        reference: 'PP202401151430001'
      },
      {
        id: '2',
        type: 'received',
        amount: 100.00,
        description: 'Freelance payment',
        sender: 'Jane Smith',
        senderPhone: '+0987654321',
        date: '2024-01-14T10:15:00Z',
        status: 'completed',
        reference: 'PP202401141015002'
      },
      {
        id: '3',
        type: 'sent',
        amount: 25.50,
        description: 'Uber ride',
        recipient: 'Uber Technologies',
        recipientPhone: '+1122334455',
        date: '2024-01-13T18:45:00Z',
        status: 'completed',
        reference: 'PP202401131845003'
      },
      {
        id: '4',
        type: 'received',
        amount: 75.00,
        description: 'Reimbursement',
        sender: 'Mike Johnson',
        senderPhone: '+5566778899',
        date: '2024-01-12T09:20:00Z',
        status: 'completed',
        reference: 'PP202401120920004'
      },
      {
        id: '5',
        type: 'sent',
        amount: 150.00,
        description: 'Electricity bill',
        recipient: 'Power Company Inc',
        recipientPhone: '+9988776655',
        date: '2024-01-11T16:10:00Z',
        status: 'pending',
        reference: 'PP202401111610005'
      },
      {
        id: '6',
        type: 'received',
        amount: 200.00,
        description: 'Salary',
        sender: 'Tech Corp',
        senderPhone: '+1122334455',
        date: '2024-01-10T08:00:00Z',
        status: 'completed',
        reference: 'PP202401100800006'
      },
      {
        id: '7',
        type: 'sent',
        amount: 45.75,
        description: 'Online shopping',
        recipient: 'Amazon Store',
        recipientPhone: '+6677889900',
        date: '2024-01-09T20:30:00Z',
        status: 'failed',
        reference: 'PP202401092030007'
      },
      {
        id: '8',
        type: 'received',
        amount: 30.00,
        description: 'Money request',
        sender: 'Sarah Wilson',
        senderPhone: '+4433221100',
        date: '2024-01-08T11:45:00Z',
        status: 'completed',
        reference: 'PP202401081145008'
      }
    ];

    setTransactions(mockTransactions);
    setFilteredTransactions(mockTransactions);
    setLoading(false);
  }, []);

  // Filter transactions based on search and filters
  useEffect(() => {
    let filtered = transactions;

    // Filter by type
    if (filterType !== 'all') {
      filtered = filtered.filter(transaction => transaction.type === filterType);
    }

    // Filter by date
    if (filterDate !== 'all') {
      const now = new Date();
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      const yesterday = new Date(today);
      yesterday.setDate(yesterday.getDate() - 1);
      const lastWeek = new Date(today);
      lastWeek.setDate(lastWeek.getDate() - 7);
      const lastMonth = new Date(today);
      lastMonth.setMonth(lastMonth.getMonth() - 1);

      filtered = filtered.filter(transaction => {
        const transactionDate = new Date(transaction.date);
        
        switch (filterDate) {
          case 'today':
            return transactionDate >= today;
          case 'yesterday':
            return transactionDate >= yesterday && transactionDate < today;
          case 'week':
            return transactionDate >= lastWeek;
          case 'month':
            return transactionDate >= lastMonth;
          default:
            return true;
        }
      });
    }

    // Filter by search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(transaction =>
        transaction.description.toLowerCase().includes(term) ||
        (transaction.recipient && transaction.recipient.toLowerCase().includes(term)) ||
        (transaction.sender && transaction.sender.toLowerCase().includes(term)) ||
        transaction.reference.toLowerCase().includes(term)
      );
    }

    setFilteredTransactions(filtered);
    setCurrentPage(1);
  }, [transactions, searchTerm, filterType, filterDate]);

  // Pagination
  const indexOfLastTransaction = currentPage * transactionsPerPage;
  const indexOfFirstTransaction = indexOfLastTransaction - transactionsPerPage;
  const currentTransactions = filteredTransactions.slice(indexOfFirstTransaction, indexOfLastTransaction);
  const totalPages = Math.ceil(filteredTransactions.length / transactionsPerPage);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatAmount = (amount, type) => {
    const sign = type === 'received' ? '+' : '-';
    return `${sign}$${amount.toFixed(2)}`;
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getTransactionIcon = (type) => {
    switch (type) {
      case 'sent':
        return '↗️';
      case 'received':
        return '↙️';
      default:
        return '💰';
    }
  };

  const handleTransactionClick = (transaction) => {
    setSelectedTransaction(transaction);
  };

  const closeModal = () => {
    setSelectedTransaction(null);
  };

  const exportTransactions = () => {
    // Simple CSV export implementation
    const headers = ['Date', 'Type', 'Description', 'Amount', 'Status', 'Reference'];
    const csvData = filteredTransactions.map(transaction => [
      formatDate(transaction.date),
      transaction.type.charAt(0).toUpperCase() + transaction.type.slice(1),
      transaction.description,
      formatAmount(transaction.amount, transaction.type),
      transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1),
      transaction.reference
    ]);

    const csvContent = [headers, ...csvData]
      .map(row => row.map(field => `"${field}"`).join(','))
      .join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `transactions-${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#00D2B8]"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Transactions</h1>
          <p className="text-gray-600">View your transaction history and details</p>
        </div>
        <button
          onClick={exportTransactions}
          className="bg-[#00D2B8] text-white px-6 py-3 rounded-lg hover:bg-[#00A896] transition-colors duration-200 font-medium mt-4 lg:mt-0"
        >
          Export CSV
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Transactions</p>
              <p className="text-2xl font-bold text-gray-900">{transactions.length}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <span className="text-2xl">📊</span>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Money Sent</p>
              <p className="text-2xl font-bold text-red-600">
                ${transactions
                  .filter(t => t.type === 'sent')
                  .reduce((sum, t) => sum + t.amount, 0)
                  .toFixed(2)}
              </p>
            </div>
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
              <span className="text-2xl">↗️</span>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Money Received</p>
              <p className="text-2xl font-bold text-green-600">
                ${transactions
                  .filter(t => t.type === 'received')
                  .reduce((sum, t) => sum + t.amount, 0)
                  .toFixed(2)}
              </p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <span className="text-2xl">↙️</span>
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Search */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Search Transactions
            </label>
            <input
              type="text"
              placeholder="Search by description, name, or reference..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00D2B8] focus:border-transparent outline-none"
            />
          </div>

          {/* Type Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Type
            </label>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00D2B8] focus:border-transparent outline-none"
            >
              <option value="all">All Types</option>
              <option value="sent">Sent</option>
              <option value="received">Received</option>
            </select>
          </div>

          {/* Date Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Date
            </label>
            <select
              value={filterDate}
              onChange={(e) => setFilterDate(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00D2B8] focus:border-transparent outline-none"
            >
              <option value="all">All Time</option>
              <option value="today">Today</option>
              <option value="yesterday">Yesterday</option>
              <option value="week">Last 7 Days</option>
              <option value="month">Last 30 Days</option>
            </select>
          </div>
        </div>
      </div>

      {/* Transactions List */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        {currentTransactions.length > 0 ? (
          <>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Transaction
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Amount
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Reference
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {currentTransactions.map((transaction) => (
                    <tr 
                      key={transaction.id}
                      className="hover:bg-gray-50 cursor-pointer transition-colors duration-150"
                      onClick={() => handleTransactionClick(transaction)}
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center mr-4">
                            <span className="text-lg">{getTransactionIcon(transaction.type)}</span>
                          </div>
                          <div>
                            <div className="text-sm font-medium text-gray-900">
                              {transaction.description}
                            </div>
                            <div className="text-sm text-gray-500">
                              {transaction.type === 'sent' ? `To: ${transaction.recipient}` : `From: ${transaction.sender}`}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className={`text-sm font-semibold ${
                          transaction.type === 'received' ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {formatAmount(transaction.amount, transaction.type)}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatDate(transaction.date)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(transaction.status)}`}>
                          {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-mono">
                        {transaction.reference}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="px-6 py-4 border-t border-gray-200">
                <div className="flex justify-between items-center">
                  <div className="text-sm text-gray-700">
                    Showing {indexOfFirstTransaction + 1} to {Math.min(indexOfLastTransaction, filteredTransactions.length)} of {filteredTransactions.length} results
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                      disabled={currentPage === 1}
                      className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                    >
                      Previous
                    </button>
                    <button
                      onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                      disabled={currentPage === totalPages}
                      className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                    >
                      Next
                    </button>
                  </div>
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">💸</div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No transactions found</h3>
            <p className="text-gray-500 mb-4">
              {searchTerm || filterType !== 'all' || filterDate !== 'all' 
                ? 'Try adjusting your search or filters'
                : 'You haven\'t made any transactions yet'
              }
            </p>
            {(searchTerm || filterType !== 'all' || filterDate !== 'all') && (
              <button
                onClick={() => {
                  setSearchTerm('');
                  setFilterType('all');
                  setFilterDate('all');
                }}
                className="text-[#00D2B8] hover:text-[#00A896] font-medium"
              >
                Clear all filters
              </button>
            )}
          </div>
        )}
      </div>

      {/* Transaction Detail Modal */}
      {selectedTransaction && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-gray-900">Transaction Details</h3>
                <button
                  onClick={closeModal}
                  className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="space-y-4">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">{getTransactionIcon(selectedTransaction.type)}</span>
                  </div>
                  <div className={`text-3xl font-bold ${
                    selectedTransaction.type === 'received' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {formatAmount(selectedTransaction.amount, selectedTransaction.type)}
                  </div>
                  <p className="text-gray-600 mt-2">{selectedTransaction.description}</p>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Status:</span>
                    <span className={`font-semibold ${getStatusColor(selectedTransaction.status).replace('bg-', 'text-').split(' ')[0]}`}>
                      {selectedTransaction.status.charAt(0).toUpperCase() + selectedTransaction.status.slice(1)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Date:</span>
                    <span className="font-semibold">{formatDate(selectedTransaction.date)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Reference:</span>
                    <span className="font-semibold font-mono">{selectedTransaction.reference}</span>
                  </div>
                  {selectedTransaction.type === 'sent' ? (
                    <div className="flex justify-between">
                      <span className="text-gray-600">To:</span>
                      <span className="font-semibold">{selectedTransaction.recipient}</span>
                    </div>
                  ) : (
                    <div className="flex justify-between">
                      <span className="text-gray-600">From:</span>
                      <span className="font-semibold">{selectedTransaction.sender}</span>
                    </div>
                  )}
                  {selectedTransaction.type === 'sent' && selectedTransaction.recipientPhone && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Phone:</span>
                      <span className="font-semibold">{selectedTransaction.recipientPhone}</span>
                    </div>
                  )}
                  {selectedTransaction.type === 'received' && selectedTransaction.senderPhone && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Phone:</span>
                      <span className="font-semibold">{selectedTransaction.senderPhone}</span>
                    </div>
                  )}
                </div>

                <div className="pt-4 border-t border-gray-200">
                  <button
                    onClick={closeModal}
                    className="w-full bg-[#00D2B8] text-white py-3 rounded-lg hover:bg-[#00A896] transition-colors duration-200 font-medium"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Transactions;