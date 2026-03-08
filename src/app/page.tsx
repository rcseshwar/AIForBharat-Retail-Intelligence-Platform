import Link from 'next/link'
import { UserSelection } from '@/components/user-selection'
import { Button } from '@/components/ui/button'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-7xl space-y-12">
        {/* Header with Auth Links */}
        <div className="flex justify-end space-x-4">
          <Link href="/login">
            <Button variant="outline" className="bg-white/80 backdrop-blur-sm">
              Sign In
            </Button>
          </Link>
          <Link href="/register">
            <Button className="bg-blue-600 hover:bg-blue-700">
              Get Started
            </Button>
          </Link>
        </div>

        {/* Hero Section */}
        <div className="text-center space-y-6">
          <div className="space-y-4">
            <h1 className="text-4xl lg:text-6xl font-bold text-gray-900">
              AI-Powered
              <span className="text-blue-600 block">Retail Intelligence</span>
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
              Transform your retail business with AI-driven insights. Make data-driven decisions with natural language queries, market intelligence, and predictive analytics.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
            <div className="bg-white/70 backdrop-blur-sm rounded-lg p-4 border border-white/20">
              <h3 className="font-semibold text-gray-900 mb-2">Natural Language Queries</h3>
              <p className="text-sm text-gray-600">Ask questions about your data in plain English and get instant insights.</p>
            </div>
            <div className="bg-white/70 backdrop-blur-sm rounded-lg p-4 border border-white/20">
              <h3 className="font-semibold text-gray-900 mb-2">Market Intelligence</h3>
              <p className="text-sm text-gray-600">Stay ahead with real-time market trends and competitor analysis.</p>
            </div>
            <div className="bg-white/70 backdrop-blur-sm rounded-lg p-4 border border-white/20">
              <h3 className="font-semibold text-gray-900 mb-2">Demand Forecasting</h3>
              <p className="text-sm text-gray-600">Predict customer demand and optimize inventory management.</p>
            </div>
            <div className="bg-white/70 backdrop-blur-sm rounded-lg p-4 border border-white/20">
              <h3 className="font-semibold text-gray-900 mb-2">Risk Analysis</h3>
              <p className="text-sm text-gray-600">Identify business risks and ensure compliance automatically.</p>
            </div>
          </div>
        </div>

        {/* User Selection Section */}
        <div className="space-y-6">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Try Our Demo</h2>
            <p className="text-gray-600">Experience the platform without registration</p>
          </div>
          
          <div className="flex justify-center">
            <UserSelection />
          </div>
          
          <div className="text-center">
            <p className="text-sm text-gray-500">
              Want to save your progress and access advanced features?{' '}
              <Link href="/register" className="text-blue-600 hover:text-blue-700 font-medium">
                Create an account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}