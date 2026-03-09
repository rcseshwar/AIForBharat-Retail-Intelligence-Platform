'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function CopilotPage() {
  const [hasApiKey, setHasApiKey] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [message, setMessage] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)
  const [conversation, setConversation] = useState<Array<{role: 'user' | 'assistant', content: string}>>([
    {
      role: 'assistant',
      content: "Hello! I'm your AI business copilot. I can help you with strategic decisions, market analysis, business planning, and more. What would you like to discuss today?"
    }
  ])
  const router = useRouter()

  // Auto-scroll to bottom when conversation updates
  useEffect(() => {
    const container = document.getElementById('conversation-container')
    if (container) {
      container.scrollTop = container.scrollHeight
    }
  }, [conversation, isProcessing])

  useEffect(() => {
    const checkApiKey = () => {
      try {
        if (typeof window === 'undefined') {
          return
        }
        
        const apiKey = sessionStorage.getItem('openai_api_key')
        
        if (!apiKey) {
          setHasApiKey(false)
          setIsLoading(false)
          return
        }
        
        setHasApiKey(true)
      } catch (error) {
        console.error('Error accessing sessionStorage:', error)
        setHasApiKey(false)
      } finally {
        setIsLoading(false)
      }
    }

    const timer = setTimeout(checkApiKey, 200)
    return () => clearTimeout(timer)
  }, [router])

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!message.trim()) return

    const apiKey = sessionStorage.getItem('openai_api_key')
    if (!apiKey) return

    const userMessage = message.trim()
    setMessage('')
    setIsProcessing(true)

    // Add user message to conversation
    setConversation(prev => [...prev, { role: 'user', content: userMessage }])
    
    try {
      const response = await fetch('/api/copilot', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          apiKey,
          message: userMessage,
          conversationHistory: conversation,
        }),
      })

      const result = await response.json()

      if (result.success) {
        setConversation(prev => [...prev, { role: 'assistant', content: result.message }])
      } else {
        setConversation(prev => [...prev, { 
          role: 'assistant', 
          content: `Sorry, I encountered an error: ${result.error || 'Please try again.'}` 
        }])
      }
    } catch (error) {
      setConversation(prev => [...prev, { 
        role: 'assistant', 
        content: 'Sorry, I encountered a network error. Please try again.' 
      }])
    } finally {
      setIsProcessing(false)
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading AI Copilot...</p>
        </div>
      </div>
    )
  }

  if (!hasApiKey) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <h2 className="text-xl font-bold text-red-600 mb-4">No API Key Found</h2>
          <button 
            onClick={() => router.push('/')}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Go to Home Page
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">AI Business Copilot</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Get AI assistance for strategic decisions, market analysis, and business planning.
        </p>
      </div>

      {/* Chat Interface */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border dark:border-gray-700">
        <div className="p-6 border-b dark:border-gray-600">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Chat with AI Copilot</h3>
        </div>
        <div className="p-6 space-y-4">
          {/* Conversation */}
          <div className="space-y-4 max-h-96 overflow-y-auto" id="conversation-container">
            {conversation.map((msg, index) => (
              <div key={index} className="flex space-x-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                  msg.role === 'assistant' 
                    ? 'bg-blue-100 dark:bg-blue-900' 
                    : 'bg-gray-100 dark:bg-gray-700'
                }`}>
                  <span className={`text-sm font-medium ${
                    msg.role === 'assistant' 
                      ? 'text-blue-600 dark:text-blue-400' 
                      : 'text-gray-600 dark:text-gray-300'
                  }`}>
                    {msg.role === 'assistant' ? 'AI' : 'You'}
                  </span>
                </div>
                <div className={`flex-1 rounded-lg p-3 ${
                  msg.role === 'assistant' 
                    ? 'bg-gray-50 dark:bg-gray-700' 
                    : 'bg-blue-50 dark:bg-blue-900/30'
                }`}>
                  <p className="text-sm text-gray-900 dark:text-white whitespace-pre-wrap">{msg.content}</p>
                </div>
              </div>
            ))}
            {isProcessing && (
              <div className="flex space-x-3">
                <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-blue-600 dark:text-blue-400 text-sm font-medium">AI</span>
                </div>
                <div className="flex-1 bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                  <div className="flex items-center space-x-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Thinking...</p>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          {/* Input area */}
          <form onSubmit={handleSendMessage} className="flex space-x-2 pt-4 border-t dark:border-gray-600">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Ask me anything about your business..."
              className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              disabled={isProcessing}
            />
            <button 
              type="submit"
              disabled={isProcessing || !message.trim()}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isProcessing ? 'Sending...' : 'Send'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}