'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { formatDateTime, truncateText } from '@/lib/utils'
import { History, CheckCircle, XCircle, Clock } from 'lucide-react'

interface QueryHistoryItem {
  query: string
  result: {
    success: boolean
    resultCount?: number
    executionTime?: number
    error?: string
  }
  timestamp: Date
}

interface QueryHistoryProps {
  history: QueryHistoryItem[]
  onHistoryClick: (query: string) => void
}

export function QueryHistory({ history, onHistoryClick }: QueryHistoryProps) {
  if (history.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <History className="h-5 w-5" />
            <span>Query History</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-6 text-gray-500">
            <History className="h-8 w-8 mx-auto mb-2 opacity-50" />
            <p className="text-sm">No queries yet</p>
            <p className="text-xs">Your query history will appear here</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <History className="h-5 w-5" />
          <span>Query History</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {history.map((item, index) => (
            <div
              key={index}
              className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
              onClick={() => onHistoryClick(item.query)}
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center space-x-2">
                  {item.result.success ? (
                    <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0" />
                  ) : (
                    <XCircle className="h-4 w-4 text-red-600 flex-shrink-0" />
                  )}
                  <Badge 
                    variant={item.result.success ? "default" : "destructive"}
                    className="text-xs"
                  >
                    {item.result.success ? 'Success' : 'Failed'}
                  </Badge>
                </div>
              </div>
              
              <p className="text-sm font-medium text-gray-900 mb-2">
                {truncateText(item.query, 60)}
              </p>
              
              <div className="flex items-center justify-between text-xs text-gray-600">
                <span>{formatDateTime(item.timestamp)}</span>
                <div className="flex items-center space-x-2">
                  {item.result.success && item.result.resultCount !== undefined && (
                    <span>{item.result.resultCount} results</span>
                  )}
                  {item.result.executionTime && (
                    <span className="flex items-center space-x-1">
                      <Clock className="h-3 w-3" />
                      <span>{item.result.executionTime}ms</span>
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}