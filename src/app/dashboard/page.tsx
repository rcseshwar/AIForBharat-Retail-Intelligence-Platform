'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function DashboardPage() {
  const [hasApiKey, setHasApiKey] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [debugInfo, setDebugInfo] = useState('')
  const router = useRouter()

  useEffect(() => {
    const checkApiKey = () => {
      try {
        setDebugInfo('Checking API key...')
        
        // Check if we're on the client side
        if (typeof window === 'undefined') {
          setDebugInfo('Server side rendering')
          return
        }
        
        const apiKey = sessionStorage.getItem('openai_api_key')
        
        setDebugInfo(`API key found: ${apiKey ? 'Yes' : 'No'}`)
        
        if (!apiKey) {
          setDebugInfo('No API key found')
          setHasApiKey(false)
          setIsLoading(false)
          return
        }
        
        setDebugInfo('API key found, setting hasApiKey to true')
        setHasApiKey(true)
      } catch (error) {
        setDebugInfo(`Error: ${error}`)
        console.error('Error accessing sessionStorage:', error)
        setHasApiKey(false)
      } finally {
        setIsLoading(false)
      }
    }

    // Small delay to ensure client-side hydration is complete
    const timer = setTimeout(checkApiKey, 200)
    return () => clearTimeout(timer)
  }, [router])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your dashboard...</p>
          <p className="text-sm text-gray-500 mt-2">Debug: {debugInfo}</p>
        </div>
      </div>
    )
  }

  if (!hasApiKey) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <h2 className="text-xl font-bold text-red-600 mb-4">No API Key Found</h2>
          <p className="text-gray-600 mb-4">Debug: {debugInfo}</p>
          <p className="text-gray-600 mb-4">Please go back to the home page and enter your OpenAI API key.</p>
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
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600">
            Welcome! Here's what's happening with your business.
          </p>
        </div>
      </div>

      {/* Simple test content */}
      <div className="bg-white p-6 rounded-lg border">
        <h2 className="text-xl font-semibold mb-4">Dashboard is Working!</h2>
        <p className="text-gray-600">Debug info: {debugInfo}</p>
        <p className="text-gray-600 mt-2">API Key status: {hasApiKey ? 'Found' : 'Not found'}</p>
      </div>

      {/* Metrics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg border">
          <h3 className="text-lg font-medium text-gray-900">Total Revenue</h3>
          <p className="text-2xl font-bold text-blue-600">$125,000</p>
          <p className="text-sm text-gray-500">+12% from last month</p>
        </div>
        <div className="bg-white p-6 rounded-lg border">
          <h3 className="text-lg font-medium text-gray-900">Total Orders</h3>
          <p className="text-2xl font-bold text-green-600">1,250</p>
          <p className="text-sm text-gray-500">+8% from last month</p>
        </div>
        <div className="bg-white p-6 rounded-lg border">
          <h3 className="text-lg font-medium text-gray-900">Avg Order Value</h3>
          <p className="text-2xl font-bold text-purple-600">$100</p>
          <p className="text-sm text-gray-500">+4% from last month</p>
        </div>
        <div className="bg-white p-6 rounded-lg border">
          <h3 className="text-lg font-medium text-gray-900">Customers</h3>
          <p className="text-2xl font-bold text-orange-600">850</p>
          <p className="text-sm text-gray-500">+15% from last month</p>
        </div>
      </div>

      {/* Getting Started Guide */}
      <div className="bg-white rounded-lg border p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Getting Started
        </h3>
        <div className="space-y-3">
          <div className="flex items-start space-x-3">
            <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-xs font-medium text-blue-600">1</span>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">Try natural language queries</p>
              <p className="text-xs text-gray-600">
                Ask questions about your data in plain English
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-xs font-medium text-blue-600">2</span>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">Explore AI insights</p>
              <p className="text-xs text-gray-600">
                Access market intelligence, forecasting, risk analysis, and more
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-xs font-medium text-blue-600">3</span>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">Analyze your data</p>
              <p className="text-xs text-gray-600">
                Get insights from your sales, customers, and market data
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}