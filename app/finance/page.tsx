import React from 'react'
import { Mail } from 'lucide-react'

const FinancePage = () => {
  return (
    <div className=" flex items-center justify-center px-4 pt-8">
      <div className="container mx-auto ">
        <div className="mb-8">
          <h1 className="text-2xl font-medium tracking-tight mb-2">
            Finance Calculator
            <span className="block text-gray-500 text-xl mt-2">Coming Soon</span>
          </h1>
          <p className="text-gray-600 mb-6">
            We're working on bringing you a comprehensive finance calculator to help you make informed decisions about your car purchase.
          </p>
        </div>

        <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
          <div className="flex items-center gap-3 mb-4">
            <Mail className="h-5 w-5 text-gray-600" />
            <h2 className="text-lg">Need Finance Information?</h2>
          </div>
          <p className="text-gray-600 mb-4">
            For detailed information about our finance options and to discuss your specific requirements, please contact us at:
          </p>
          <a 
            href="mailto:hello@finalgroup.com.au" 
            className="text-gray-900 hover:text-gray-700 font-medium inline-flex items-center gap-2"
          >
            hello@finalgroup.com.au
          </a>
        </div>
      </div>
    </div>
  )
}

export default FinancePage