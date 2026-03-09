'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Eye, EyeOff, Key } from 'lucide-react'

export default function HomePage() {
  const router = useRouter()
  const [apiKey, setApiKey] = useState('')
  const [showApiKey, setShowApiKey] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!apiKey.trim()) {
      alert('Please enter your OpenAI API key')
      return
    }

    if (!apiKey.startsWith('sk-')) {
      alert('Please enter a valid OpenAI API key (starts with sk-)')
      return
    }

    setIsLoading(true)
    
    // Store API key in session storage
    sessionStorage.setItem('openai_api_key', apiKey)
    
    // Navigate to dashboard
    router.push('/dashboard')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl space-y-8">
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

        {/* API Key Input Section */}
        <div className="flex justify-center">
          <Card className="w-full max-w-md bg-white/80 backdrop-blur-sm border-white/20">
            <CardHeader className="text-center">
              <CardTitle className="flex items-center justify-center gap-2">
                <Key className="h-5 w-5 text-blue-600" />
                Get Started
              </CardTitle>
              <CardDescription>
                Enter your OpenAI API key to access the platform
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="apiKey" className="text-sm font-medium text-gray-700">
                    OpenAI API Key
                  </label>
                  <div className="relative">
                    <Input
                      id="apiKey"
                      type={showApiKey ? 'text' : 'password'}
                      placeholder="sk-..."
                      value={apiKey}
                      onChange={(e) => setApiKey(e.target.value)}
                      className="pr-10"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowApiKey(!showApiKey)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showApiKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                  <p className="text-xs text-gray-500">
                    Your API key is stored locally and never sent to our servers
                  </p>
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full bg-blue-600 hover:bg-blue-700"
                  disabled={isLoading}
                >
                  {isLoading ? 'Loading...' : 'Access Dashboard'}
                </Button>
              </form>
              
              <div className="mt-4 pt-4 border-t border-gray-200">
                <p className="text-xs text-gray-500 text-center">
                  Don't have an OpenAI API key?{' '}
                  <a 
                    href="https://platform.openai.com/api-keys" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-700 underline"
                  >
                    Get one here
                  </a>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}