'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { useToast } from '@/hooks/use-toast'
import { QueryResults } from './query-results'
import { QueryHistory } from './query-history'
import { QueryExamples } from './query-examples'
import { Send, Loader2, Database } from 'lucide-react'

interface QueryResult {
  success: boolean
  data?: any[]
  explanation?: string
  sqlGenerated?: string
  executionTime?: number
  resultCount?: number
  error?: string
  queriesRemaining?: number
}

interface QueryInterfaceProps {
  userType?: 'free' | 'pro'
  userId?: string | null
  queriesRemaining?: number
}

export function QueryInterface({ userType = 'free', userId, queriesRemaining }: QueryInterfaceProps) {
  const [query, setQuery] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [results, setResults] = useState<QueryResult | null>(null)
  const [currentQueriesRemaining, setCurrentQueriesRemaining] = useState(queriesRemaining)
  const [queryHistory, setQueryHistory] = useState<Array<{
    query: string
    result: QueryResult
    timestamp: Date
  }>>([])
  const { toast } = useToast()

  useEffect(() => {
    setCurrentQueriesRemaining(queriesRemaining)
  }, [queriesRemaining])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!query.trim()) return

    setIsLoading(true)
    setResults(null)

    try {
      const response = await fetch('/api/query', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          query: query.trim(),
          userType,
          userId 
        }),
      })

      const result: QueryResult = await response.json()

      setResults(result)

      // Update queries remaining if provided
      if (result.queriesRemaining !== undefined) {
        setCurrentQueriesRemaining(result.queriesRemaining)
      }

      // Add to history
      setQueryHistory(prev => [{
        query: query.trim(),
        result,
        timestamp: new Date()
      }, ...prev.slice(0, 9)]) // Keep last 10 queries

      if (result.success) {
        toast({
          title: 'Query Executed',
          description: `Found ${result.resultCount || 0} results in ${result.executionTime || 0}ms`,
        })
      } else {
        toast({
          title: 'Query Failed',
          description: result.error || 'An error occurred while executing the query',
          variant: 'destructive',
        })
      }

      setQuery('')
    } catch (error) {
      const errorResult: QueryResult = {
        success: false,
        error: 'Network error. Please check your connection and try again.'
      }
      
      setResults(errorResult)
      
      toast({
        title: 'Error',
        description: 'Failed to execute query. Please try again.',
        variant: 'destructive',
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleExampleClick = (exampleQuery: string) => {
    setQuery(exampleQuery)
  }

  const handleHistoryClick = (historicalQuery: string) => {
    setQuery(historicalQuery)
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Main Query Interface */}
      <div className="lg:col-span-2 space-y-6">
        {/* Query Input */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Database className="h-5 w-5" />
              <span>Ask Your Data</span>
            </CardTitle>
            <CardDescription>
              Type your question in natural language. For example: "What are our top selling products this month?"
              {userType === 'free' && userId && (
                <span className="block mt-1 text-orange-600 text-sm">
                  {currentQueriesRemaining !== undefined 
                    ? `${currentQueriesRemaining} queries remaining today`
                    : 'Free users are limited to 5 queries per day'
                  }
                </span>
              )}
              {userType === 'free' && !userId && (
                <span className="block mt-1 text-blue-600 text-sm">
                  Demo mode - Register for a free account to track your usage
                </span>
              )}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex space-x-2">
                <Input
                  placeholder="What would you like to know about your business data?"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  disabled={isLoading}
                  className="flex-1"
                />
                <Button
                  type="submit"
                  disabled={isLoading || !query.trim()}
                >
                  {isLoading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Send className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Query Results */}
        {results && (
          <QueryResults result={results} />
        )}

        {/* Query Examples */}
        <QueryExamples onExampleClick={handleExampleClick} />
      </div>

      {/* Sidebar */}
      <div className="space-y-6">
        {/* Query History */}
        <QueryHistory 
          history={queryHistory}
          onHistoryClick={handleHistoryClick}
        />

        {/* Tips */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Query Tips</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="text-sm space-y-2">
              <div>
                <p className="font-medium text-gray-900">Be specific</p>
                <p className="text-gray-600">Include time periods, product categories, or regions</p>
              </div>
              <div>
                <p className="font-medium text-gray-900">Use business terms</p>
                <p className="text-gray-600">Say "revenue" instead of "money", "customers" instead of "users"</p>
              </div>
              <div>
                <p className="font-medium text-gray-900">Ask for comparisons</p>
                <p className="text-gray-600">"Compare this month to last month" or "vs last year"</p>
              </div>
              <div>
                <p className="font-medium text-gray-900">Request insights</p>
                <p className="text-gray-600">Ask "why" questions or request trends and patterns</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}