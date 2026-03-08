'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { QueryInterface } from '@/components/query/query-interface'

export default function QueryPage() {
  const [userType, setUserType] = useState<'free' | 'pro' | null>(null)
  const [userId, setUserId] = useState<string | null>(null)
  const [queriesRemaining, setQueriesRemaining] = useState<number | undefined>(undefined)
  const router = useRouter()

  useEffect(() => {
    // Get user type from session storage
    const storedUserType = sessionStorage.getItem('userType') as 'free' | 'pro' | null
    const storedUserId = sessionStorage.getItem('userId')
    const storedQueriesUsed = sessionStorage.getItem('aiQueriesUsed')
    const storedQueriesLimit = sessionStorage.getItem('aiQueriesLimit')
    
    if (!storedUserType) {
      // Redirect to home if no user type is set
      router.push('/')
      return
    }
    
    setUserType(storedUserType)
    setUserId(storedUserId)
    
    // Calculate queries remaining for registered users
    if (storedUserId && storedQueriesUsed && storedQueriesLimit) {
      const used = parseInt(storedQueriesUsed)
      const limit = parseInt(storedQueriesLimit)
      setQueriesRemaining(Math.max(0, limit - used))
    }
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

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">AI Query</h1>
        <p className="text-gray-600">
          Ask questions about your business data using natural language. Our AI will translate your questions into SQL queries and provide insights.
          {userType === 'free' && userId && (
            <span className="block mt-1 text-orange-600">
              {queriesRemaining !== undefined 
                ? `${queriesRemaining} queries remaining today.`
                : 'Free users are limited to 5 queries per day.'
              }
            </span>
          )}
        </p>
      </div>

      <QueryInterface 
        userType={userType} 
        userId={userId} 
        queriesRemaining={queriesRemaining}
      />
    </div>
  )
}