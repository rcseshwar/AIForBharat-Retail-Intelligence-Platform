'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { BarChart3, TrendingUp, Calendar, Lock, Target } from 'lucide-react'

export default function ForecastingPage() {
  const [userType, setUserType] = useState<'free' | 'pro' | null>(null)
  const router = useRouter()

  useEffect(() => {
    const storedUserType = sessionStorage.getItem('userType') as 'free' | 'pro' | null
    if (!storedUserType) {
      router.push('/')
      return
    }
    setUserType(storedUserType)
  }, [router])

  if (!userType) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  if (userType === 'free') {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Demand Forecasting</h1>
          <p className="text-gray-600">
            Predict future product demand with AI-powered forecasting models.
          </p>
        </div>

        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Lock className="h-16 w-16 text-gray-400 mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Pro Feature</h3>
            <p className="text-gray-600 text-center mb-6 max-w-md">
              Demand Forecasting is available for Pro users. Get accurate predictions for inventory planning and business growth.
            </p>
            <Button onClick={() => router.push('/dashboard')} className="bg-purple-600 hover:bg-purple-700">
              Upgrade to Pro
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Demand Forecasting</h1>
        <p className="text-gray-600">
          Predict future product demand with AI-powered forecasting models.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Next Month Forecast</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,245</div>
            <p className="text-xs text-muted-foreground">
              <TrendingUp className="inline h-3 w-3 mr-1" />
              +15% from this month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Confidence Level</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">87%</div>
            <p className="text-xs text-muted-foreground">
              High accuracy prediction
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Trend Direction</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">↗ Up</div>
            <p className="text-xs text-muted-foreground">
              Growing demand trend
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Product Demand Forecast</CardTitle>
            <CardDescription>Predicted demand for top products</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium">Wireless Headphones</p>
                  <p className="text-sm text-gray-600">Electronics</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-green-600">↗ 450 units</p>
                  <p className="text-xs text-gray-500">Next 30 days</p>
                </div>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium">Smart Watch</p>
                  <p className="text-sm text-gray-600">Electronics</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-green-600">↗ 320 units</p>
                  <p className="text-xs text-gray-500">Next 30 days</p>
                </div>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium">Coffee Maker</p>
                  <p className="text-sm text-gray-600">Appliances</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-yellow-600">→ 180 units</p>
                  <p className="text-xs text-gray-500">Next 30 days</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Seasonal Trends</CardTitle>
            <CardDescription>Historical patterns and predictions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <h4 className="font-medium text-blue-900 mb-2">Q4 Holiday Season</h4>
                <p className="text-sm text-blue-800">
                  Electronics typically see 40% increase in demand during November-December.
                </p>
              </div>
              <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                <h4 className="font-medium text-green-900 mb-2">Spring Cleaning</h4>
                <p className="text-sm text-green-800">
                  Home appliances show 25% growth in March-April period.
                </p>
              </div>
              <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                <h4 className="font-medium text-yellow-900 mb-2">Summer Slowdown</h4>
                <p className="text-sm text-yellow-800">
                  General retail demand typically decreases by 15% in July-August.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>AI Recommendations</CardTitle>
          <CardDescription>Inventory and business planning suggestions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-green-50 rounded-lg border border-green-200">
              <h4 className="font-medium text-green-900 mb-2">📈 Increase Inventory</h4>
              <p className="text-sm text-green-800 mb-2">
                Wireless Headphones showing strong upward trend
              </p>
              <p className="text-xs text-green-700">
                Recommended: Order 200 additional units by next week
              </p>
            </div>
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <h4 className="font-medium text-blue-900 mb-2">🎯 Marketing Opportunity</h4>
              <p className="text-sm text-blue-800 mb-2">
                Smart Watch demand growing in target demographic
              </p>
              <p className="text-xs text-blue-700">
                Recommended: Launch targeted campaign for 25-35 age group
              </p>
            </div>
            <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
              <h4 className="font-medium text-yellow-900 mb-2">⚠️ Monitor Closely</h4>
              <p className="text-sm text-yellow-800 mb-2">
                Coffee Maker demand showing volatility
              </p>
              <p className="text-xs text-yellow-700">
                Recommended: Review weekly and adjust inventory accordingly
              </p>
            </div>
            <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
              <h4 className="font-medium text-purple-900 mb-2">🔄 Seasonal Prep</h4>
              <p className="text-sm text-purple-800 mb-2">
                Prepare for Q4 holiday season surge
              </p>
              <p className="text-xs text-purple-700">
                Recommended: Start planning inventory increase for October
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}