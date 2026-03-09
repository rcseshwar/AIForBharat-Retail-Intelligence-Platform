'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function CustomersPage() {
  const [hasApiKey, setHasApiKey] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const checkApiKey = () => {
      try {
        if (typeof window === 'undefined') {
          return
        }
        
        const apiKey = sessionStorage.getItem('openai_api_key')
        
        if (!apiKey) {
          setHasApiKey(false)
          setIsLoading(false)
          return
        }
        
        setHasApiKey(true)
      } catch (error) {
        console.error('Error accessing sessionStorage:', error)
        setHasApiKey(false)
      } finally {
        setIsLoading(false)
      }
    }

    const timer = setTimeout(checkApiKey, 200)
    return () => clearTimeout(timer)
  }, [router])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading Customers...</p>
        </div>
      </div>
    )
  }

  if (!hasApiKey) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <h2 className="text-xl font-bold text-red-600 mb-4">No API Key Found</h2>
          <button 
            onClick={() => router.push('/')}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Go to Home Page
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Customer Insights</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Analyze customer behavior and manage relationships.
          </p>
        </div>
      </div>

      {/* Customer Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border dark:border-gray-700">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">Total Customers</h3>
          <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">1,247</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">+12% from last month</p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border dark:border-gray-700">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">VIP Customers</h3>
          <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">89</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">7.1% of total</p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border dark:border-gray-700">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">Avg Order Value</h3>
          <p className="text-2xl font-bold text-green-600 dark:text-green-400">$156</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">+8% from last month</p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border dark:border-gray-700">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">Retention Rate</h3>
          <p className="text-2xl font-bold text-orange-600 dark:text-orange-400">87%</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">Above industry avg</p>
        </div>
      </div>

      {/* Sample Customer List */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border dark:border-gray-700">
        <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Customer Directory</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 border dark:border-gray-600 rounded-lg">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                <span className="text-blue-600 dark:text-blue-400 font-medium">SJ</span>
              </div>
              <div>
                <p className="font-medium text-gray-900 dark:text-white">Sarah Johnson</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">sarah.j@email.com • New York, NY</p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-medium text-gray-900 dark:text-white">$2,850</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">24 orders</p>
            </div>
          </div>
          <div className="flex items-center justify-between p-4 border dark:border-gray-600 rounded-lg">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                <span className="text-green-600 dark:text-green-400 font-medium">MC</span>
              </div>
              <div>
                <p className="font-medium text-gray-900 dark:text-white">Michael Chen</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">m.chen@email.com • San Francisco, CA</p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-medium text-gray-900 dark:text-white">$1,200</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">12 orders</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}