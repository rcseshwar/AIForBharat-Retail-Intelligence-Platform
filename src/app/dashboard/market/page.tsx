'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { TrendingUp, TrendingDown, BarChart3, Lock, Globe, Target } from 'lucide-react'

export default function MarketPage() {
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
          <h1 className="text-3xl font-bold text-gray-900">Market Intelligence</h1>
          <p className="text-gray-600">
            Analyze market trends and opportunities with AI-powered insights.
          </p>
        </div>

        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Lock className="h-16 w-16 text-gray-400 mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Pro Feature</h3>
            <p className="text-gray-600 text-center mb-6 max-w-md">
              Market Intelligence is available for Pro users. Get real-time market trends, competitor analysis, and growth opportunities.
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
        <h1 className="text-3xl font-bold text-gray-900">Market Intelligence</h1>
        <p className="text-gray-600">
          Analyze market trends and opportunities with AI-powered insights.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Market Size</CardTitle>
            <Globe className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$125M</div>
            <p className="text-xs text-muted-foreground">
              <TrendingUp className="inline h-3 w-3 mr-1" />
              +12% from last quarter
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Growth Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8.5%</div>
            <p className="text-xs text-muted-foreground">
              <TrendingUp className="inline h-3 w-3 mr-1" />
              +2.1% from last year
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Market Share</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">15.2%</div>
            <p className="text-xs text-muted-foreground">
              <TrendingUp className="inline h-3 w-3 mr-1" />
              +0.8% from last quarter
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Competitor Index</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">92</div>
            <p className="text-xs text-muted-foreground">
              <TrendingDown className="inline h-3 w-3 mr-1" />
              -3 from last month
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Market Trends</CardTitle>
            <CardDescription>Key trends affecting your industry</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <TrendingUp className="h-5 w-5 text-green-600" />
                <div>
                  <p className="font-medium">E-commerce Growth</p>
                  <p className="text-sm text-gray-600">Online sales increasing by 15% YoY</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <TrendingUp className="h-5 w-5 text-blue-600" />
                <div>
                  <p className="font-medium">Mobile Commerce</p>
                  <p className="text-sm text-gray-600">Mobile transactions up 22%</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <TrendingDown className="h-5 w-5 text-red-600" />
                <div>
                  <p className="font-medium">Traditional Retail</p>
                  <p className="text-sm text-gray-600">Physical store sales declining 5%</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Competitor Analysis</CardTitle>
            <CardDescription>How you compare to competitors</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">TechCorp</span>
                <div className="flex items-center space-x-2">
                  <div className="w-24 bg-gray-200 rounded-full h-2">
                    <div className="bg-red-600 h-2 rounded-full" style={{width: '75%'}}></div>
                  </div>
                  <span className="text-sm text-gray-600">75%</span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">AudioMax</span>
                <div className="flex items-center space-x-2">
                  <div className="w-24 bg-gray-200 rounded-full h-2">
                    <div className="bg-yellow-600 h-2 rounded-full" style={{width: '60%'}}></div>
                  </div>
                  <span className="text-sm text-gray-600">60%</span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Your Company</span>
                <div className="flex items-center space-x-2">
                  <div className="w-24 bg-gray-200 rounded-full h-2">
                    <div className="bg-green-600 h-2 rounded-full" style={{width: '85%'}}></div>
                  </div>
                  <span className="text-sm text-gray-600">85%</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>AI Insights</CardTitle>
          <CardDescription>Market intelligence powered by AI analysis</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <h4 className="font-medium text-blue-900 mb-2">Growth Opportunity</h4>
              <p className="text-sm text-blue-800">
                The mobile commerce segment shows strong growth potential. Consider investing in mobile app development and mobile-first marketing strategies.
              </p>
            </div>
            <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
              <h4 className="font-medium text-yellow-900 mb-2">Market Risk</h4>
              <p className="text-sm text-yellow-800">
                Traditional retail channels are declining. Diversify your sales channels to reduce dependency on physical stores.
              </p>
            </div>
            <div className="p-4 bg-green-50 rounded-lg border border-green-200">
              <h4 className="font-medium text-green-900 mb-2">Competitive Advantage</h4>
              <p className="text-sm text-green-800">
                Your company outperforms competitors in customer satisfaction. Leverage this strength in marketing campaigns.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}