'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { TrendingUp, TrendingDown, BarChart3, Globe, Target, Loader2, RefreshCw } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

interface MarketData {
  marketSize: string
  growthRate: string
  marketShare: string
  competitorIndex: number
  trends: Array<{
    name: string
    description: string
    direction: 'up' | 'down'
  }>
  competitors: Array<{
    name: string
    score: number
  }>
  insights: Array<{
    type: 'opportunity' | 'risk' | 'advantage'
    title: string
    description: string
  }>
}

export default function MarketPage() {
  const [hasApiKey, setHasApiKey] = useState(false)
  const [marketData, setMarketData] = useState<MarketData | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    const apiKey = sessionStorage.getItem('openai_api_key')
    if (!apiKey) {
      router.push('/')
      return
    }
    setHasApiKey(true)
    // Load initial market data
    loadMarketData()
  }, [router])

  const loadMarketData = async () => {
    const apiKey = sessionStorage.getItem('openai_api_key')
    if (!apiKey) return

    setIsLoading(true)
    try {
      const response = await fetch('/api/market-intelligence', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          apiKey,
          industry: 'retail',
          region: 'global'
        }),
      })

      const result = await response.json()

      if (result.success) {
        setMarketData(result.data)
      } else {
        toast({
          title: 'Error',
          description: result.error || 'Failed to load market intelligence data',
          variant: 'destructive',
        })
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Network error. Please try again.',
        variant: 'destructive',
      })
    } finally {
      setIsLoading(false)
    }
  }

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
          <h1 className="text-3xl font-bold text-gray-900">Market Intelligence</h1>
          <p className="text-gray-600">
            Analyze market trends and opportunities with AI-powered insights.
          </p>
        </div>
        <Button onClick={loadMarketData} disabled={isLoading} variant="outline">
          {isLoading ? (
            <Loader2 className="h-4 w-4 animate-spin mr-2" />
          ) : (
            <RefreshCw className="h-4 w-4 mr-2" />
          )}
          Refresh Data
        </Button>
      </div>

      {isLoading && !marketData ? (
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <Loader2 className="h-12 w-12 animate-spin text-blue-600 mx-auto mb-4" />
            <p className="text-gray-600">Analyzing market data with AI...</p>
          </div>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Market Size</CardTitle>
                <Globe className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{marketData?.marketSize || '$125M'}</div>
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
                <div className="text-2xl font-bold">{marketData?.growthRate || '8.5%'}</div>
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
                <div className="text-2xl font-bold">{marketData?.marketShare || '15.2%'}</div>
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
                <div className="text-2xl font-bold">{marketData?.competitorIndex || 92}</div>
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
                  {marketData?.trends ? marketData.trends.map((trend, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      {trend.direction === 'up' ? (
                        <TrendingUp className="h-5 w-5 text-green-600" />
                      ) : (
                        <TrendingDown className="h-5 w-5 text-red-600" />
                      )}
                      <div>
                        <p className="font-medium">{trend.name}</p>
                        <p className="text-sm text-gray-600">{trend.description}</p>
                      </div>
                    </div>
                  )) : (
                    <>
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
                    </>
                  )}
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
                  {marketData?.competitors ? marketData.competitors.map((competitor, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <span className="text-sm font-medium">{competitor.name}</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-24 bg-gray-200 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full ${
                              competitor.score >= 80 ? 'bg-red-600' : 
                              competitor.score >= 60 ? 'bg-yellow-600' : 'bg-green-600'
                            }`}
                            style={{width: `${competitor.score}%`}}
                          ></div>
                        </div>
                        <span className="text-sm text-gray-600">{competitor.score}%</span>
                      </div>
                    </div>
                  )) : (
                    <>
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
                    </>
                  )}
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
                {marketData?.insights ? marketData.insights.map((insight, index) => (
                  <div key={index} className={`p-4 rounded-lg border ${
                    insight.type === 'opportunity' ? 'bg-blue-50 border-blue-200' :
                    insight.type === 'risk' ? 'bg-yellow-50 border-yellow-200' :
                    'bg-green-50 border-green-200'
                  }`}>
                    <h4 className={`font-medium mb-2 ${
                      insight.type === 'opportunity' ? 'text-blue-900' :
                      insight.type === 'risk' ? 'text-yellow-900' :
                      'text-green-900'
                    }`}>{insight.title}</h4>
                    <p className={`text-sm ${
                      insight.type === 'opportunity' ? 'text-blue-800' :
                      insight.type === 'risk' ? 'text-yellow-800' :
                      'text-green-800'
                    }`}>
                      {insight.description}
                    </p>
                  </div>
                )) : (
                  <>
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
                  </>
                )}
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  )
}