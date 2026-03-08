'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { formatNumber, formatCurrency } from '@/lib/utils'
import { CheckCircle, XCircle, Clock, Database, Code, Download, Eye } from 'lucide-react'
import { useState } from 'react'

interface QueryResult {
  success: boolean
  data?: any[]
  explanation?: string
  sqlGenerated?: string
  executionTime?: number
  resultCount?: number
  error?: string
}

interface QueryResultsProps {
  result: QueryResult
}

export function QueryResults({ result }: QueryResultsProps) {
  const [showSQL, setShowSQL] = useState(false)
  const [viewMode, setViewMode] = useState<'table' | 'json'>('table')

  const downloadCSV = () => {
    if (!result.data || result.data.length === 0) return

    const headers = Object.keys(result.data[0])
    const csvContent = [
      headers.join(','),
      ...result.data.map(row => 
        headers.map(header => {
          const value = row[header]
          // Escape commas and quotes in CSV
          if (typeof value === 'string' && (value.includes(',') || value.includes('"'))) {
            return `"${value.replace(/"/g, '""')}"`
          }
          return value
        }).join(',')
      )
    ].join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `query-results-${new Date().toISOString().split('T')[0]}.csv`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const formatValue = (value: any): string => {
    if (value === null || value === undefined) return '-'
    if (typeof value === 'number') {
      // Try to format as currency if it looks like a monetary value
      if (value > 1000 && (value % 1 === 0 || value.toString().includes('.'))) {
        return formatCurrency(value)
      }
      return formatNumber(value)
    }
    if (typeof value === 'boolean') return value ? 'Yes' : 'No'
    if (value instanceof Date) return value.toLocaleDateString()
    return String(value)
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center space-x-2">
            {result.success ? (
              <CheckCircle className="h-5 w-5 text-green-600" />
            ) : (
              <XCircle className="h-5 w-5 text-red-600" />
            )}
            <span>Query Results</span>
          </CardTitle>
          
          <div className="flex items-center space-x-2">
            {result.success && result.data && result.data.length > 0 && (
              <>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setViewMode(viewMode === 'table' ? 'json' : 'table')}
                >
                  <Eye className="h-4 w-4 mr-1" />
                  {viewMode === 'table' ? 'JSON' : 'Table'}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={downloadCSV}
                >
                  <Download className="h-4 w-4 mr-1" />
                  CSV
                </Button>
              </>
            )}
            
            {result.sqlGenerated && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowSQL(!showSQL)}
              >
                <Code className="h-4 w-4 mr-1" />
                SQL
              </Button>
            )}
          </div>
        </div>
        
        <div className="flex items-center space-x-4 text-sm text-gray-600">
          {result.success && (
            <>
              <div className="flex items-center space-x-1">
                <Database className="h-4 w-4" />
                <span>{result.resultCount || 0} results</span>
              </div>
              {result.executionTime && (
                <div className="flex items-center space-x-1">
                  <Clock className="h-4 w-4" />
                  <span>{result.executionTime}ms</span>
                </div>
              )}
            </>
          )}
        </div>
        
        {result.explanation && (
          <CardDescription className="mt-2">
            {result.explanation}
          </CardDescription>
        )}
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Error Display */}
        {!result.success && result.error && (
          <div className="bg-red-50 border border-red-200 rounded-md p-4">
            <div className="flex items-center space-x-2">
              <XCircle className="h-5 w-5 text-red-600" />
              <span className="font-medium text-red-800">Query Failed</span>
            </div>
            <p className="text-red-700 mt-2">{result.error}</p>
          </div>
        )}

        {/* SQL Display */}
        {showSQL && result.sqlGenerated && (
          <div className="bg-gray-50 border rounded-md p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">Generated SQL</span>
              <Badge variant="secondary">SQL</Badge>
            </div>
            <pre className="text-sm text-gray-800 overflow-x-auto">
              <code>{result.sqlGenerated}</code>
            </pre>
          </div>
        )}

        {/* Data Display */}
        {result.success && result.data && result.data.length > 0 && (
          <div className="border rounded-md">
            {viewMode === 'table' ? (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      {Object.keys(result.data[0]).map((header) => (
                        <th
                          key={header}
                          className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          {header.replace(/_/g, ' ')}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {result.data.slice(0, 100).map((row, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        {Object.keys(result.data![0]).map((key) => (
                          <td
                            key={key}
                            className="px-4 py-3 text-sm text-gray-900 whitespace-nowrap"
                          >
                            {formatValue(row[key])}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
                
                {result.data.length > 100 && (
                  <div className="bg-gray-50 px-4 py-3 text-sm text-gray-600 border-t">
                    Showing first 100 of {result.data.length} results. Download CSV for complete data.
                  </div>
                )}
              </div>
            ) : (
              <div className="p-4">
                <pre className="text-sm text-gray-800 overflow-x-auto max-h-96">
                  <code>{JSON.stringify(result.data.slice(0, 10), null, 2)}</code>
                </pre>
                {result.data.length > 10 && (
                  <div className="mt-2 text-sm text-gray-600">
                    Showing first 10 of {result.data.length} results in JSON format.
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* No Results */}
        {result.success && result.data && result.data.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <Database className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p className="text-lg font-medium">No results found</p>
            <p className="text-sm">Try adjusting your query or time period</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}