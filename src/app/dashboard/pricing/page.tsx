'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Brain, DollarSign, TrendingUp, Lock, Target, AlertCircle } from 'lucide-react'

export default function PricingPage() {
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
          <h1 className="text-3xl font-bold text-gray-900">Pricing Optimization</h1>
          <p className="text-gray-600">
            Get AI-powered pricing recommendations to maximize revenue and profitability.
          </p>
        </div>

        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Lock className="h-16 w-16 text-gray-400 mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Pro Feature</h3>
            <p className="text-gray-600 text-center mb-6 max-w-md">
              Pricing Optimization is available for Pro users. Get dynamic pricing recommendations based on market conditions and competitor analysis.
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
        <h1 className="text-3xl font-bold text-gray-900">Pricing Optimization</h1>
        <p className="text-gray-600">
          Get AI-powered pricing recommendations to maximize revenue and profitability.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Price Point</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$216</div>
            <p className="text-xs text-muted-foreground">
              <TrendingUp className="inline h-3 w-3 mr-1" />
              +5% optimal increase
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Revenue Impact</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">+$12K</div>
            <p className="text-xs text-muted-foreground">
              Projected monthly increase
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Price Elasticity</CardTitle>
            <Brain className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">-0.8</div>
            <p className="text-xs text-muted-foreground">
              Moderately elastic demand
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Competitive Index</CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">0.92</div>
            <p className="text-xs text-muted-foreground">
              Slightly below market
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Pricing Recommendations</CardTitle>
            <CardDescription>AI-powered suggestions for optimal pricing</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-4 bg-green-50 rounded-lg border border-green-200">
                <div>
                  <p className="font-medium">Wireless Headphones</p>
                  <p className="text-sm text-gray-600">Current: $199.99</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-green-600">$219.99</p>
                  <p className="text-xs text-green-700">+10% revenue</p>
                </div>
              </div>
              <div className="flex justify-between items-center p-4 bg-blue-50 rounded-lg border border-blue-200">
                <div>
                  <p className="font-medium">Smart Watch</p>
                  <p className="text-sm text-gray-600">Current: $299.99</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-blue-600">$289.99</p>
                  <p className="text-xs text-blue-700">+15% volume</p>
                </div>
              </div>
              <div className="flex justify-between items-center p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                <div>
                  <p className="font-medium">Coffee Maker</p>
                  <p className="text-sm text-gray-600">Current: $149.99</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-yellow-600">$149.99</p>
                  <p className="text-xs text-yellow-700">Optimal price</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Competitor Analysis</CardTitle>
            <CardDescription>How your prices compare to competitors</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">Wireless Headphones</span>
                  <span className="text-sm text-gray-600">Your Price: $199.99</span>
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span>TechCorp: $189.99</span>
                    <span className="text-red-600">-5%</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span>AudioMax: $209.99</span>
                    <span className="text-green-600">+5%</span>
                  </div>
                </div>
              </div>
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">Smart Watch</span>
                  <span className="text-sm text-gray-600">Your Price: $299.99</span>
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span>WearableTech: $279.99</span>
                    <span className="text-red-600">-7%</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span>FitnessPro: $319.99</span>
                    <span className="text-green-600">+7%</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Dynamic Pricing Insights</CardTitle>
          <CardDescription>Market conditions and pricing strategies</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <h4 className="font-medium text-blue-900 mb-2">📊 Market Opportunity</h4>
              <p className="text-sm text-blue-800 mb-2">
                Electronics category showing price tolerance increase
              </p>
              <p className="text-xs text-blue-700">
                Recommended: Test 5-10% price increase on premium products
              </p>
            </div>
            <div className="p-4 bg-green-50 rounded-lg border border-green-200">
              <h4 className="font-medium text-green-900 mb-2">💰 Revenue Optimization</h4>
              <p className="text-sm text-green-800 mb-2">
                Bundle pricing could increase average order value
              </p>
              <p className="text-xs text-green-700">
                Recommended: Create headphones + accessories bundle at $249
              </p>
            </div>
            <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
              <h4 className="font-medium text-yellow-900 mb-2">⚡ Seasonal Adjustment</h4>
              <p className="text-sm text-yellow-800 mb-2">
                Holiday season approaching - demand will increase
              </p>
              <p className="text-xs text-yellow-700">
                Recommended: Gradually increase prices by 3-5% in November
              </p>
            </div>
            <div className="p-4 bg-red-50 rounded-lg border border-red-200">
              <h4 className="font-medium text-red-900 mb-2">🎯 Competitive Response</h4>
              <p className="text-sm text-red-800 mb-2">
                Competitor price cuts detected in smart watch category
              </p>
              <p className="text-xs text-red-700">
                Recommended: Monitor closely and consider promotional pricing
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}