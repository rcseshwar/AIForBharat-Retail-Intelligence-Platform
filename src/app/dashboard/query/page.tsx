'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function QueryPage() {
  const [hasApiKey, setHasApiKey] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [query, setQuery] = useState('')
  const [isQuerying, setIsQuerying] = useState(false)
  const [queryResult, setQueryResult] = useState<any>(null)
  const [error, setError] = useState('')
  const router = useRouter()

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

  const handleSubmitQuery = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!query.trim()) return

    const apiKey = sessionStorage.getItem('openai_api_key')
    if (!apiKey) return

    setIsQuerying(true)
    setError('')
    
    try {
      const response = await fetch('/api/query', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          apiKey,
          query: query.trim(),
        }),
      })

      const result = await response.json()

      if (result.success) {
        setQueryResult(result)
      } else {
        setError(result.error || 'Failed to process query')
      }
    } catch (error) {
      setError('Network error. Please try again.')
    } finally {
      setIsQuerying(false)
    }
  }

  const handleExampleClick = (exampleQuery: string) => {
    setQuery(exampleQuery)
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading AI Query...</p>
        </div>
      </div>
    )
  }

  if (!hasApiKey) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <h2 className="text-xl font-bold text-red-600 mb-4">No API Key Found</h2>
          <p className="text-gray-600 mb-4">Please go back to the home page and enter your OpenAI API key.</p>
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
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">AI Query</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Ask questions about your business data using natural language. Our AI will translate your questions into SQL queries and provide insights.
        </p>
      </div>

      {/* Query Interface */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border dark:border-gray-700">
        <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Query Interface</h3>
        <form onSubmit={handleSubmitQuery} className="space-y-4">
          <div className="flex space-x-2">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="What would you like to know about your business data?"
              className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              disabled={isQuerying}
            />
            <button 
              type="submit"
              disabled={isQuerying || !query.trim()}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isQuerying ? 'Processing...' : 'Send'}
            </button>
          </div>
          {error && (
            <div className="text-red-600 dark:text-red-400 text-sm">{error}</div>
          )}
        </form>
      </div>

      {/* Query Results */}
      {queryResult && (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border dark:border-gray-700">
          <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Query Results</h3>
          <div className="space-y-4">
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white mb-2">Generated SQL:</h4>
              <pre className="bg-gray-100 dark:bg-gray-900 p-3 rounded text-sm overflow-x-auto">
                <code>{queryResult.sqlGenerated}</code>
              </pre>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white mb-2">Explanation:</h4>
              <p className="text-gray-700 dark:text-gray-300">{queryResult.explanation}</p>
            </div>
            {queryResult.data && queryResult.data.length > 0 && (
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white mb-2">Results:</h4>
                <div className="overflow-x-auto">
                  <table className="min-w-full border border-gray-300 dark:border-gray-600">
                    <thead className="bg-gray-50 dark:bg-gray-700">
                      <tr>
                        {Object.keys(queryResult.data[0]).map((key) => (
                          <th key={key} className="px-4 py-2 text-left text-sm font-medium text-gray-900 dark:text-white border-b border-gray-300 dark:border-gray-600">
                            {key}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {queryResult.data.slice(0, 10).map((row: any, index: number) => (
                        <tr key={index} className="border-b border-gray-200 dark:border-gray-600">
                          {Object.values(row).map((value: any, cellIndex) => (
                            <td key={cellIndex} className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300">
                              {String(value)}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {queryResult.data.length > 10 && (
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                      Showing first 10 of {queryResult.data.length} results
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Example Queries */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border dark:border-gray-700">
        <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Example Queries</h3>
        <div className="space-y-2">
          <div 
            className="p-3 bg-gray-50 dark:bg-gray-700 rounded cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600"
            onClick={() => handleExampleClick("What are our top selling products this month?")}
          >
            "What are our top selling products this month?"
          </div>
          <div 
            className="p-3 bg-gray-50 dark:bg-gray-700 rounded cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600"
            onClick={() => handleExampleClick("Show me revenue by customer segment")}
          >
            "Show me revenue by customer segment"
          </div>
          <div 
            className="p-3 bg-gray-50 dark:bg-gray-700 rounded cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600"
            onClick={() => handleExampleClick("Which products have the highest profit margins?")}
          >
            "Which products have the highest profit margins?"
          </div>
          <div 
            className="p-3 bg-gray-50 dark:bg-gray-700 rounded cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600"
            onClick={() => handleExampleClick("Compare this month's sales to last month")}
          >
            "Compare this month's sales to last month"
          </div>
        </div>
      </div>
    </div>
  )
}