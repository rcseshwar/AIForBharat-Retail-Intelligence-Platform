'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Shield, AlertTriangle, CheckCircle, XCircle, Lock, AlertCircle } from 'lucide-react'

export default function RiskPage() {
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
          <h1 className="text-3xl font-bold text-gray-900">Risk Analysis</h1>
          <p className="text-gray-600">
            Identify and mitigate business risks with AI-powered analysis.
          </p>
        </div>

        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Lock className="h-16 w-16 text-gray-400 mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Pro Feature</h3>
            <p className="text-gray-600 text-center mb-6 max-w-md">
              Risk Analysis is available for Pro users. Get comprehensive risk assessment and mitigation strategies for your business.
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
        <h1 className="text-3xl font-bold text-gray-900">Risk Analysis</h1>
        <p className="text-gray-600">
          Identify and mitigate business risks with AI-powered analysis.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Risk Score</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">Medium</div>
            <p className="text-xs text-muted-foreground">
              Overall risk level: 6.2/10
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Risks</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">7</div>
            <p className="text-xs text-muted-foreground">
              Requiring attention
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Mitigated</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">12</div>
            <p className="text-xs text-muted-foreground">
              Successfully addressed
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Compliance</CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">98%</div>
            <p className="text-xs text-muted-foreground">
              Compliance rate
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>High Priority Risks</CardTitle>
            <CardDescription>Risks requiring immediate attention</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start space-x-3 p-3 bg-red-50 rounded-lg border border-red-200">
                <AlertTriangle className="h-5 w-5 text-red-600 mt-0.5" />
                <div className="flex-1">
                  <p className="font-medium text-red-900">Supply Chain Disruption</p>
                  <p className="text-sm text-red-800">Key supplier showing delivery delays</p>
                  <p className="text-xs text-red-700 mt-1">Impact: High | Likelihood: 70%</p>
                </div>
              </div>
              <div className="flex items-start space-x-3 p-3 bg-orange-50 rounded-lg border border-orange-200">
                <AlertTriangle className="h-5 w-5 text-orange-600 mt-0.5" />
                <div className="flex-1">
                  <p className="font-medium text-orange-900">Cybersecurity Threat</p>
                  <p className="text-sm text-orange-800">Increased phishing attempts detected</p>
                  <p className="text-xs text-orange-700 mt-1">Impact: High | Likelihood: 45%</p>
                </div>
              </div>
              <div className="flex items-start space-x-3 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5" />
                <div className="flex-1">
                  <p className="font-medium text-yellow-900">Market Volatility</p>
                  <p className="text-sm text-yellow-800">Economic indicators showing instability</p>
                  <p className="text-xs text-yellow-700 mt-1">Impact: Medium | Likelihood: 60%</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Risk Categories</CardTitle>
            <CardDescription>Risk distribution by category</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Operational</span>
                <div className="flex items-center space-x-2">
                  <div className="w-24 bg-gray-200 rounded-full h-2">
                    <div className="bg-red-600 h-2 rounded-full" style={{width: '70%'}}></div>
                  </div>
                  <span className="text-sm text-gray-600">7 risks</span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Financial</span>
                <div className="flex items-center space-x-2">
                  <div className="w-24 bg-gray-200 rounded-full h-2">
                    <div className="bg-yellow-600 h-2 rounded-full" style={{width: '40%'}}></div>
                  </div>
                  <span className="text-sm text-gray-600">4 risks</span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Compliance</span>
                <div className="flex items-center space-x-2">
                  <div className="w-24 bg-gray-200 rounded-full h-2">
                    <div className="bg-green-600 h-2 rounded-full" style={{width: '20%'}}></div>
                  </div>
                  <span className="text-sm text-gray-600">2 risks</span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Strategic</span>
                <div className="flex items-center space-x-2">
                  <div className="w-24 bg-gray-200 rounded-full h-2">
                    <div className="bg-orange-600 h-2 rounded-full" style={{width: '50%'}}></div>
                  </div>
                  <span className="text-sm text-gray-600">5 risks</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Mitigation Strategies</CardTitle>
          <CardDescription>AI-recommended actions to reduce risk exposure</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <h4 className="font-medium text-blue-900 mb-2">🔄 Diversify Suppliers</h4>
              <p className="text-sm text-blue-800 mb-2">
                Reduce dependency on single supplier for critical components
              </p>
              <p className="text-xs text-blue-700">
                Priority: High | Timeline: 30 days | Cost: $15K
              </p>
            </div>
            <div className="p-4 bg-green-50 rounded-lg border border-green-200">
              <h4 className="font-medium text-green-900 mb-2">🛡️ Security Training</h4>
              <p className="text-sm text-green-800 mb-2">
                Implement comprehensive cybersecurity awareness program
              </p>
              <p className="text-xs text-green-700">
                Priority: High | Timeline: 14 days | Cost: $5K
              </p>
            </div>
            <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
              <h4 className="font-medium text-yellow-900 mb-2">💰 Financial Hedging</h4>
              <p className="text-sm text-yellow-800 mb-2">
                Implement currency hedging to protect against market volatility
              </p>
              <p className="text-xs text-yellow-700">
                Priority: Medium | Timeline: 60 days | Cost: $8K
              </p>
            </div>
            <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
              <h4 className="font-medium text-purple-900 mb-2">📋 Compliance Audit</h4>
              <p className="text-sm text-purple-800 mb-2">
                Conduct quarterly compliance reviews and updates
              </p>
              <p className="text-xs text-purple-700">
                Priority: Medium | Timeline: 90 days | Cost: $12K
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Risk Monitoring</CardTitle>
          <CardDescription>Real-time risk indicators and alerts</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
              <div className="flex items-center space-x-3">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <div>
                  <p className="font-medium text-green-900">Data Backup Systems</p>
                  <p className="text-sm text-green-800">All systems operational</p>
                </div>
              </div>
              <span className="text-xs text-green-700 bg-green-100 px-2 py-1 rounded">Normal</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg border border-yellow-200">
              <div className="flex items-center space-x-3">
                <AlertTriangle className="h-5 w-5 text-yellow-600" />
                <div>
                  <p className="font-medium text-yellow-900">Inventory Levels</p>
                  <p className="text-sm text-yellow-800">Below optimal threshold</p>
                </div>
              </div>
              <span className="text-xs text-yellow-700 bg-yellow-100 px-2 py-1 rounded">Warning</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg border border-red-200">
              <div className="flex items-center space-x-3">
                <XCircle className="h-5 w-5 text-red-600" />
                <div>
                  <p className="font-medium text-red-900">Supplier Performance</p>
                  <p className="text-sm text-red-800">Delivery delays detected</p>
                </div>
              </div>
              <span className="text-xs text-red-700 bg-red-100 px-2 py-1 rounded">Critical</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}