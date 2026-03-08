'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { formatDateTime, truncateText } from '@/lib/utils'
import { Database, AlertTriangle, CheckCircle, XCircle, Clock } from 'lucide-react'

interface Query {
  id: string
  query: string
  success: boolean
  timestamp: Date
  executionTime: number | null
  user: {
    name: string
  }
}

interface Alert {
  id: string
  type: string
  severity: string
  title: string
  description: string
  createdAt: Date
}

interface RecentActivityProps {
  queries: Query[]
  alerts: Alert[]
  userType: 'free' | 'pro'
}

export function RecentActivity({ queries, alerts, userType }: RecentActivityProps) {
  const getSeverityColor = (severity: string) => {
    switch (severity.toLowerCase()) {
      case 'low': return 'text-green-600 bg-green-50'
      case 'medium': return 'text-yellow-600 bg-yellow-50'
      case 'high': return 'text-orange-600 bg-orange-50'
      case 'critical': return 'text-red-600 bg-red-50'
      default: return 'text-gray-600 bg-gray-50'
    }
  }

  return (
    <div className="space-y-6">
      {/* Recent Queries */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Database className="h-5 w-5" />
            <span>Recent Queries</span>
          </CardTitle>
          <CardDescription>
            Latest AI-powered data queries from your team
          </CardDescription>
        </CardHeader>
        <CardContent>
          {queries.length > 0 ? (
            <div className="space-y-3">
              {queries.map((query) => (
                <div key={query.id} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                  <div className="flex-shrink-0 mt-1">
                    {query.success ? (
                      <CheckCircle className="h-4 w-4 text-green-600" />
                    ) : (
                      <XCircle className="h-4 w-4 text-red-600" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900">
                      {truncateText(query.query, 80)}
                    </p>
                    <div className="flex items-center space-x-4 mt-1 text-xs text-gray-600">
                      <span>by {query.user.name}</span>
                      <span>{formatDateTime(query.timestamp)}</span>
                      {query.executionTime && (
                        <span className="flex items-center space-x-1">
                          <Clock className="h-3 w-3" />
                          <span>{query.executionTime}ms</span>
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-6 text-gray-500">
              <Database className="h-8 w-8 mx-auto mb-2 opacity-50" />
              <p className="text-sm">No recent queries</p>
              <p className="text-xs">Start by asking AI about your data</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Recent Alerts */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <AlertTriangle className="h-5 w-5" />
            <span>Recent Alerts</span>
          </CardTitle>
          <CardDescription>
            System alerts and notifications
          </CardDescription>
        </CardHeader>
        <CardContent>
          {alerts.length > 0 ? (
            <div className="space-y-3">
              {alerts.map((alert) => (
                <div key={alert.id} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                  <div className="flex-shrink-0 mt-1">
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getSeverityColor(alert.severity)}`}>
                      {alert.severity}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900">
                      {alert.title}
                    </p>
                    <p className="text-sm text-gray-600 mt-1">
                      {truncateText(alert.description, 100)}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {formatDateTime(alert.createdAt)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-6 text-gray-500">
              <AlertTriangle className="h-8 w-8 mx-auto mb-2 opacity-50" />
              <p className="text-sm">No recent alerts</p>
              <p className="text-xs">All systems running smoothly</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}