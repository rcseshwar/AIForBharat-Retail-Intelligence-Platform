'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { MessageSquare, Send, Bot, User, Lock } from 'lucide-react'

export default function CopilotPage() {
  const [userType, setUserType] = useState<'free' | 'pro' | null>(null)
  const [message, setMessage] = useState('')
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
          <h1 className="text-3xl font-bold text-gray-900">AI Copilot</h1>
          <p className="text-gray-600">
            Get AI assistance for business decisions and strategic planning.
          </p>
        </div>

        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Lock className="h-16 w-16 text-gray-400 mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Pro Feature</h3>
            <p className="text-gray-600 text-center mb-6 max-w-md">
              AI Copilot is available for Pro users. Upgrade to get personalized business insights and strategic recommendations.
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
        <h1 className="text-3xl font-bold text-gray-900">AI Copilot</h1>
        <p className="text-gray-600">
          Get AI assistance for business decisions and strategic planning.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <MessageSquare className="h-5 w-5" />
                <span>Chat with AI Copilot</span>
              </CardTitle>
              <CardDescription>
                Ask for business advice, strategic insights, or help with decision-making.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="h-96 border rounded-lg p-4 bg-gray-50 overflow-y-auto">
                  <div className="flex items-start space-x-3 mb-4">
                    <Bot className="h-8 w-8 bg-blue-600 text-white rounded-full p-1.5 flex-shrink-0" />
                    <div className="bg-white rounded-lg p-3 shadow-sm">
                      <p className="text-sm">
                        Hello! I'm your AI business copilot. I can help you with strategic decisions, 
                        market analysis, business planning, and more. What would you like to discuss today?
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="flex space-x-2">
                  <Input
                    placeholder="Ask me anything about your business..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="flex-1"
                  />
                  <Button disabled>
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
                
                <p className="text-xs text-gray-500">
                  This is a demo interface. Full AI Copilot functionality coming soon.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" className="w-full justify-start" disabled>
                <MessageSquare className="mr-2 h-4 w-4" />
                Strategic Planning
              </Button>
              <Button variant="outline" className="w-full justify-start" disabled>
                <MessageSquare className="mr-2 h-4 w-4" />
                Market Analysis
              </Button>
              <Button variant="outline" className="w-full justify-start" disabled>
                <MessageSquare className="mr-2 h-4 w-4" />
                Risk Assessment
              </Button>
              <Button variant="outline" className="w-full justify-start" disabled>
                <MessageSquare className="mr-2 h-4 w-4" />
                Growth Opportunities
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Conversations</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-500">No recent conversations</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}