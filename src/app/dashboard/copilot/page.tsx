'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { MessageSquare, Send, Bot, User, Loader2 } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

export default function CopilotPage() {
  const [hasApiKey, setHasApiKey] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: "Hello! I'm your AI business copilot. I can help you with strategic decisions, market analysis, business planning, and more. What would you like to discuss today?",
      timestamp: new Date()
    }
  ])
  const [isSending, setIsSending] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    const checkApiKey = () => {
      try {
        const apiKey = sessionStorage.getItem('openai_api_key')
        if (!apiKey) {
          router.push('/')
          return
        }
        setHasApiKey(true)
      } catch (error) {
        console.error('Error accessing sessionStorage:', error)
        router.push('/')
      } finally {
        setIsLoading(false)
      }
    }

    const timer = setTimeout(checkApiKey, 100)
    return () => clearTimeout(timer)
  }, [router])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  if (!hasApiKey) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Redirecting...</p>
        </div>
      </div>
    )
  }

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!message.trim() || isSending) return

    const apiKey = sessionStorage.getItem('openai_api_key')
    if (!apiKey) {
      toast({
        title: 'API Key Required',
        description: 'Please provide your OpenAI API key to use this feature',
        variant: 'destructive',
      })
      return
    }

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: message.trim(),
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setMessage('')
    setIsSending(true)

    try {
      const response = await fetch('/api/copilot', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: message.trim(),
          conversationHistory: messages.slice(-10), // Last 10 messages for context
          apiKey
        }),
      })

      const result = await response.json()

      if (result.success) {
        const assistantMessage: Message = {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: result.message,
          timestamp: new Date()
        }
        setMessages(prev => [...prev, assistantMessage])
      } else {
        toast({
          title: 'Error',
          description: result.error || 'Failed to get response from AI copilot',
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
      setIsSending(false)
    }
  }

  const handleQuickAction = (action: string) => {
    setMessage(action)
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
                  <div className="space-y-4">
                    {messages.map((msg) => (
                      <div key={msg.id} className={`flex items-start space-x-3 ${msg.role === 'user' ? 'justify-end' : ''}`}>
                        {msg.role === 'assistant' && (
                          <Bot className="h-8 w-8 bg-blue-600 text-white rounded-full p-1.5 flex-shrink-0" />
                        )}
                        <div className={`rounded-lg p-3 shadow-sm max-w-xs lg:max-w-md ${
                          msg.role === 'user' 
                            ? 'bg-blue-600 text-white ml-auto' 
                            : 'bg-white'
                        }`}>
                          <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                          <p className={`text-xs mt-1 ${msg.role === 'user' ? 'text-blue-100' : 'text-gray-500'}`}>
                            {msg.timestamp.toLocaleTimeString()}
                          </p>
                        </div>
                        {msg.role === 'user' && (
                          <User className="h-8 w-8 bg-gray-600 text-white rounded-full p-1.5 flex-shrink-0" />
                        )}
                      </div>
                    ))}
                    {isLoading && (
                      <div className="flex items-start space-x-3">
                        <Bot className="h-8 w-8 bg-blue-600 text-white rounded-full p-1.5 flex-shrink-0" />
                        <div className="bg-white rounded-lg p-3 shadow-sm">
                          <div className="flex items-center space-x-2">
                            <Loader2 className="h-4 w-4 animate-spin" />
                            <p className="text-sm text-gray-600">AI is thinking...</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                
                <form onSubmit={handleSendMessage} className="flex space-x-2">
                  <Input
                    placeholder="Ask me anything about your business..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="flex-1"
                    disabled={isSending}
                  />
                  <Button type="submit" disabled={isLoading || !message.trim()}>
                    {isSending ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Send className="h-4 w-4" />
                    )}
                  </Button>
                </form>
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
              <Button 
                variant="outline" 
                className="w-full justify-start" 
                onClick={() => handleQuickAction("Help me create a strategic plan for expanding my business into new markets")}
              >
                <MessageSquare className="mr-2 h-4 w-4" />
                Strategic Planning
              </Button>
              <Button 
                variant="outline" 
                className="w-full justify-start"
                onClick={() => handleQuickAction("Analyze current market trends in my industry and identify opportunities")}
              >
                <MessageSquare className="mr-2 h-4 w-4" />
                Market Analysis
              </Button>
              <Button 
                variant="outline" 
                className="w-full justify-start"
                onClick={() => handleQuickAction("What are the main risks facing my business and how can I mitigate them?")}
              >
                <MessageSquare className="mr-2 h-4 w-4" />
                Risk Assessment
              </Button>
              <Button 
                variant="outline" 
                className="w-full justify-start"
                onClick={() => handleQuickAction("Identify growth opportunities and revenue optimization strategies for my business")}
              >
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
              {messages.length > 1 ? (
                <div className="space-y-2">
                  {messages.slice(-3).filter(m => m.role === 'user').map((msg) => (
                    <div key={msg.id} className="text-sm p-2 bg-gray-50 rounded cursor-pointer hover:bg-gray-100"
                         onClick={() => setMessage(msg.content)}>
                      <p className="truncate">{msg.content}</p>
                      <p className="text-xs text-gray-500">{msg.timestamp.toLocaleDateString()}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-500">No recent conversations</p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}