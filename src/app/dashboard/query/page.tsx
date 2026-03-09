'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { QueryInterface } from '@/components/query/query-interface'

export default function QueryPage() {
  const [hasApiKey, setHasApiKey] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const checkApiKey = () => {
      try {
        const apiKey = sessionStorage.getItem('openai_api_key')
        
        if (!apiKey) {
          // Redirect to home if no API key is set
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

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">AI Query</h1>
        <p className="text-gray-600">
          Ask questions about your business data using natural language. Our AI will translate your questions into SQL queries and provide insights.
        </p>
      </div>

      <QueryInterface />
    </div>
  )
}