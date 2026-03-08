'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Check, Zap, Crown } from 'lucide-react'

export function UserSelection() {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleUserTypeSelection = async (userType: 'free' | 'pro') => {
    setIsLoading(true)
    
    try {
      // Set user type in session storage for now
      sessionStorage.setItem('userType', userType)
      
      // Redirect to dashboard
      router.push('/dashboard')
    } catch (error) {
      console.error('Error setting user type:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">
      {/* Free User Card */}
      <Card className="relative bg-white/90 backdrop-blur-sm border-white/20 shadow-xl hover:shadow-2xl transition-all duration-300">
        <CardHeader className="text-center pb-4">
          <div className="flex items-center justify-center mb-2">
            <Zap className="h-8 w-8 text-blue-600 mr-2" />
            <CardTitle className="text-2xl font-bold text-gray-900">Free User</CardTitle>
          </div>
          <CardDescription className="text-gray-600">
            Get started with essential AI-powered retail insights
          </CardDescription>
          <div className="mt-4">
            <Badge variant="secondary" className="bg-blue-100 text-blue-800">
              No Cost
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="flex items-center">
              <Check className="h-4 w-4 text-green-600 mr-2" />
              <span className="text-sm text-gray-700">Basic natural language queries</span>
            </div>
            <div className="flex items-center">
              <Check className="h-4 w-4 text-green-600 mr-2" />
              <span className="text-sm text-gray-700">Market intelligence overview</span>
            </div>
            <div className="flex items-center">
              <Check className="h-4 w-4 text-green-600 mr-2" />
              <span className="text-sm text-gray-700">Basic demand forecasting</span>
            </div>
            <div className="flex items-center">
              <Check className="h-4 w-4 text-green-600 mr-2" />
              <span className="text-sm text-gray-700">Standard dashboard</span>
            </div>
            <div className="flex items-center">
              <Check className="h-4 w-4 text-green-600 mr-2" />
              <span className="text-sm text-gray-700">5 queries per day</span>
            </div>
          </div>
          
          <Button 
            onClick={() => handleUserTypeSelection('free')}
            disabled={isLoading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white"
          >
            {isLoading ? 'Starting...' : 'Start Free'}
          </Button>
        </CardContent>
      </Card>

      {/* Pro User Card */}
      <Card className="relative bg-white/90 backdrop-blur-sm border-white/20 shadow-xl hover:shadow-2xl transition-all duration-300 ring-2 ring-purple-500">
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
          <Badge className="bg-purple-600 text-white px-3 py-1">
            Most Popular
          </Badge>
        </div>
        <CardHeader className="text-center pb-4">
          <div className="flex items-center justify-center mb-2">
            <Crown className="h-8 w-8 text-purple-600 mr-2" />
            <CardTitle className="text-2xl font-bold text-gray-900">Pro User</CardTitle>
          </div>
          <CardDescription className="text-gray-600">
            Unlock the full power of AI-driven retail intelligence
          </CardDescription>
          <div className="mt-4">
            <Badge variant="secondary" className="bg-purple-100 text-purple-800">
              Premium Features
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="flex items-center">
              <Check className="h-4 w-4 text-green-600 mr-2" />
              <span className="text-sm text-gray-700">Unlimited natural language queries</span>
            </div>
            <div className="flex items-center">
              <Check className="h-4 w-4 text-green-600 mr-2" />
              <span className="text-sm text-gray-700">Advanced market intelligence</span>
            </div>
            <div className="flex items-center">
              <Check className="h-4 w-4 text-green-600 mr-2" />
              <span className="text-sm text-gray-700">AI-powered demand forecasting</span>
            </div>
            <div className="flex items-center">
              <Check className="h-4 w-4 text-green-600 mr-2" />
              <span className="text-sm text-gray-700">Pricing optimization</span>
            </div>
            <div className="flex items-center">
              <Check className="h-4 w-4 text-green-600 mr-2" />
              <span className="text-sm text-gray-700">Risk analysis & compliance</span>
            </div>
            <div className="flex items-center">
              <Check className="h-4 w-4 text-green-600 mr-2" />
              <span className="text-sm text-gray-700">Document processing</span>
            </div>
            <div className="flex items-center">
              <Check className="h-4 w-4 text-green-600 mr-2" />
              <span className="text-sm text-gray-700">AI Copilot assistant</span>
            </div>
            <div className="flex items-center">
              <Check className="h-4 w-4 text-green-600 mr-2" />
              <span className="text-sm text-gray-700">Priority support</span>
            </div>
          </div>
          
          <Button 
            onClick={() => handleUserTypeSelection('pro')}
            disabled={isLoading}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white"
          >
            {isLoading ? 'Starting...' : 'Go Pro'}
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}