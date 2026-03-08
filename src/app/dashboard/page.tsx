'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { DashboardMetrics } from '@/components/dashboard/metrics'
import { RecentActivity } from '@/components/dashboard/recent-activity'
import { QuickActions } from '@/components/dashboard/quick-actions'
import { UserTypeBadge } from '@/components/dashboard/user-type-badge'
import { UpgradePrompt } from '@/components/dashboard/upgrade-prompt'

// Mock data for demo purposes
const mockMetrics = {
  totalRevenue: 125000,
  revenueGrowth: 0.12,
  totalOrders: 1250,
  ordersGrowth: 0.08,
  averageOrderValue: 100,
  aovGrowth: 0.04,
  customerCount: 850,
  customerGrowth: 0.15
}

const mockQueries = [
  {
    id: '1',
    query: 'Show me top selling products this month',
    success: true,
    timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
    executionTime: 1250,
    user: { name: 'Demo User' }
  },
  {
    id: '2',
    query: 'What are the customer segments by revenue?',
    success: true,
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
    executionTime: 890,
    user: { name: 'Demo User' }
  }
]

const mockAlerts = [
  {
    id: '1',
    type: 'info',
    severity: 'low',
    title: 'Market Trend Alert',
    description: 'New market trend detected in electronics category',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 4) // 4 hours ago
  }
]

export default function DashboardPage() {
  const [userType, setUserType] = useState<'free' | 'pro' | null>(null)
  const [userName, setUserName] = useState('Demo User')
  const router = useRouter()

  useEffect(() => {
    // Get user type from session storage
    const storedUserType = sessionStorage.getItem('userType') as 'free' | 'pro' | null
    
    if (!storedUserType) {
      // Redirect to home if no user type is set
      router.push('/')
      return
    }
    
    setUserType(storedUserType)
    setUserName(storedUserType === 'pro' ? 'Pro User' : 'Free User')
  }, [router])

  if (!userType) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your dashboard...</p>
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
            Welcome back, {userName}! Here's what's happening with your business.
          </p>
        </div>
        {userType && <UserTypeBadge userType={userType} />}
      </div>

      {/* Show upgrade prompt for free users */}
      {userType === 'free' && <UpgradePrompt />}

      {/* Metrics Overview */}
      <DashboardMetrics metrics={mockMetrics} userType={userType} />

      {/* Quick Actions */}
      <QuickActions userType={userType} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <RecentActivity 
          queries={mockQueries}
          alerts={mockAlerts}
          userType={userType}
        />

        {/* Getting Started Guide */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
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
                  {userType === 'free' ? 'Up to 5 queries per day' : 'Unlimited queries'}
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
                  {userType === 'free' 
                    ? 'Basic market intelligence and forecasting' 
                    : 'Full AI suite: market intelligence, forecasting, risk analysis, and more'
                  }
                </p>
              </div>
            </div>
            {userType === 'free' && (
              <div className="mt-4 p-3 bg-purple-50 rounded-lg border border-purple-200">
                <p className="text-sm text-purple-800">
                  <strong>Upgrade to Pro</strong> to unlock unlimited queries, advanced AI features, and priority support.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}