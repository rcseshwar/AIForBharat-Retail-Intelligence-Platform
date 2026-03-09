'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Brain, DollarSign, TrendingUp, Target, AlertCircle, RefreshCw } from 'lucide-react'

export default function PricingPage() {
  const [hasApiKey, setHasApiKey] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const apiKey = sessionStorage.getItem('openai_api_key')
    if (!apiKey) {
      router.push('/')
      return
    }
    setHasApiKey(true)
  }, [router])

  if (!hasApiKey) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Pricing Optimization</h1>
          <p className="text-gray-600">
            Get AI-powered pricing recommendations to maximize revenue and profitability.
          </p>
        </div>
        <Button variant="outline">
          <RefreshCw className="h-4 w-4 mr-2" />
          Analyze Pricing
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Price</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$189.99</div>
            <p className="text-xs text-muted-foreground">
              <TrendingUp className="inline h-3 w-3 mr-1" />
              +5% optimal increase
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Margin</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">42%</div>
            <p className="text-xs text-muted-foreground">
              <TrendingUp className="inline h-3 w-3 mr-1" />
              Above industry avg
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Elasticity</CardTitle>
            <Brain className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">-1.2</div>
            <p className="text-xs text-muted-foreground">
              Moderately elastic
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Revenue Impact</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+$12K</div>
            <p className="text-xs text-muted-foreground">
              Monthly potential
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Product Pricing Recommendations</CardTitle>
            <CardDescription>AI-powered price optimization by product</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium">Wireless Headphones</p>
                  <p className="text-sm text-gray-600">Current: $199.99</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-green-600">$219.99</p>
                  <p className="text-sm text-green-600">+10% revenue</p>
                </div>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium">Smart Watch</p>
                  <p className="text-sm text-gray-600">Current: $299.99</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-blue-600">$289.99</p>
                  <p className="text-sm text-blue-600">+8% volume</p>
                </div>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium">Coffee Maker</p>
                  <p className="text-sm text-gray-600">Current: $149.99</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-gray-600">$149.99</p>
                  <p className="text-sm text-gray-600">Optimal price</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Competitive Analysis</CardTitle>
            <CardDescription>How your prices compare to competitors</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Wireless Headphones</span>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-600">Market: $185-$250</span>
                  <span className="text-sm font-medium text-green-600">Competitive</span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Smart Watch</span>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-600">Market: $250-$350</span>
                  <span className="text-sm font-medium text-blue-600">Below Market</span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Coffee Maker</span>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-600">Market: $120-$180</span>
                  <span className="text-sm font-medium text-yellow-600">Premium</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>AI Pricing Insights</CardTitle>
          <CardDescription>Strategic recommendations for pricing optimization</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 bg-green-50 rounded-lg border border-green-200">
              <div className="flex items-start space-x-3">
                <TrendingUp className="h-5 w-5 text-green-600 mt-0.5" />
                <div>
                  <h4 className="font-medium text-green-900 mb-1">Revenue Opportunity</h4>
                  <p className="text-sm text-green-800">
                    Increase Wireless Headphones price to $219.99. Market analysis shows low price sensitivity for premium audio products.
                  </p>
                </div>
              </div>
            </div>
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <div className="flex items-start space-x-3">
                <Target className="h-5 w-5 text-blue-600 mt-0.5" />
                <div>
                  <h4 className="font-medium text-blue-900 mb-1">Market Positioning</h4>
                  <p className="text-sm text-blue-800">
                    Smart Watch is priced below market average. Consider gradual price increase to $289.99 to improve margins while maintaining competitiveness.
                  </p>
                </div>
              </div>
            </div>
            <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
              <div className="flex items-start space-x-3">
                <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5" />
                <div>
                  <h4 className="font-medium text-yellow-900 mb-1">Price Monitoring</h4>
                  <p className="text-sm text-yellow-800">
                    Monitor competitor pricing weekly. Coffee Maker pricing is optimal but watch for market changes during seasonal periods.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}