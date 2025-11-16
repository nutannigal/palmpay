import React from 'react'

const Help = () => {
  const faqs = [
    {
      question: 'How do I process a refund?',
      answer: 'Go to Transaction History, find the transaction, and click the Refund button. Refunds typically process within 3-5 business days.'
    },
    {
      question: 'When are settlements processed?',
      answer: 'Settlements are processed daily at 2:00 AM. Funds are transferred to your registered bank account within 24 hours.'
    },
    {
      question: 'How can I update my business information?',
      answer: 'Navigate to Settings > Business Profile to update your store details, contact information, and banking details.'
    },
    {
      question: 'What should I do if a transaction fails?',
      answer: 'Check your internet connection and try again. If the issue persists, contact our support team with the transaction ID.'
    }
  ]

  const quickGuides = [
    {
      title: 'Getting Started',
      items: [
        'Complete your business profile verification',
        'Set up your payment methods',
        'Test transactions in sandbox mode'
      ]
    },
    {
      title: 'Transaction Management',
      items: [
        'View real-time transaction history',
        'Process refunds for customers',
        'Export transaction reports'
      ]
    },
    {
      title: 'Settlement Process',
      items: [
        'Daily settlement at 2:00 AM',
        'Track settlement status',
        'Download settlement reports'
      ]
    }
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl lg:text-3xl font-bold text-gray-800">Help & Support</h1>
        <p className="text-gray-600 mt-2">Get help with using PalmPay Merchant Portal</p>
      </div>

      {/* Contact Information */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 text-center">
          <div className="text-3xl mb-3">📞</div>
          <h3 className="font-semibold text-gray-800 mb-2">Phone Support</h3>
          <p className="text-gray-600">+91 1800-123-4567</p>
          <p className="text-sm text-gray-500 mt-1">24/7 Available</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 text-center">
          <div className="text-3xl mb-3">📧</div>
          <h3 className="font-semibold text-gray-800 mb-2">Email Support</h3>
          <p className="text-gray-600">support@palmpay.com</p>
          <p className="text-sm text-gray-500 mt-1">Response within 2 hours</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 text-center">
          <div className="text-3xl mb-3">💬</div>
          <h3 className="font-semibold text-gray-800 mb-2">Live Chat</h3>
          <p className="text-gray-600">Available in app</p>
          <p className="text-sm text-gray-500 mt-1">Instant support</p>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-6">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="border-b border-gray-200 pb-4 last:border-b-0">
              <h3 className="font-medium text-gray-800 mb-2">{faq.question}</h3>
              <p className="text-gray-600 text-sm">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Guides */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-6">Quick Guides</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {quickGuides.map((guide, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold text-gray-800 mb-3">{guide.title}</h3>
              <ul className="space-y-2">
                {guide.items.map((item, itemIndex) => (
                  <li key={itemIndex} className="text-sm text-gray-600 flex items-start">
                    <span className="text-green-500 mr-2">•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Support Form */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-6">Still Need Help?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-medium text-gray-800 mb-4">Send us a message</h3>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Your Name
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your email"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Message
                </label>
                <textarea
                  rows="4"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Describe your issue..."
                ></textarea>
              </div>
              <button
                type="submit"
                className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                Send Message
              </button>
            </form>
          </div>
          <div className="bg-gray-50 rounded-lg p-6">
            <h3 className="font-medium text-gray-800 mb-4">Before contacting support</h3>
            <ul className="space-y-3 text-sm text-gray-600">
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">✓</span>
                Check our FAQ section above
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">✓</span>
                Ensure your app is updated to the latest version
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">✓</span>
                Have your merchant ID ready
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">✓</span>
                Include transaction IDs if relevant
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Help