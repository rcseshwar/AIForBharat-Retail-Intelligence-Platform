'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { formatCurrency, formatNumber, formatPercentage } from '@/lib/utils'
import { TrendingUp, TrendingDown, DollarSign, ShoppingCart, Users, Target } from 'lucide-react'

interface MetricsProps {
  metrics: {
    totalRevenue: number
    revenueGrowth: number
    totalOrders: number
    ordersGrowth: number
    averageOrderValue: number
    aovGrowth: number
    customerCount: number
    customerGrowth: number
  }
}

export function DashboardMetrics({ metrics }: MetricsProps) {
  const metricCards = [
    {
      title: 'Total Revenue',
      value: formatCurrency(metrics.totalRevenue),
      change: metrics.revenueGrowth,
      icon: DollarSign,
      description: 'This month'
    },
    {
      title: 'Total Orders',
      value: formatNumber(metrics.totalOrders),
      change: metrics.ordersGrowth,
      icon: ShoppingCart,
      description: 'This month'
    },
    {
      title: 'Average Order Value',
      value: formatCurrency(metrics.averageOrderValue),
      change: metrics.aovGrowth,
      icon: Target,
      description: 'This month'
    },
    {
      title: 'Total Customers',
      value: formatNumber(metrics.customerCount),
      change: metrics.customerGrowth,
      icon: Users,
      description: 'All time'
    }
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {metricCards.map((metric) => {
        const Icon = metric.icon
        const isPositive = metric.change >= 0
        const TrendIcon = isPositive ? TrendingUp : TrendingDown
        
        return (
          <Card key={metric.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                {metric.title}
              </CardTitle>
              <Icon className="h-4 w-4 text-gray-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">
                {metric.value}
              </div>
              <div className="flex items-center space-x-1 text-xs">
                <TrendIcon 
                  className={`h-3 w-3 ${
                    isPositive ? 'text-green-600' : 'text-red-600'
                  }`} 
                />
                <span 
                  className={`font-medium ${
                    isPositive ? 'text-green-600' : 'text-red-600'
                  }`}
                >
                  {formatPercentage(Math.abs(metric.change))}
                </span>
                <span className="text-gray-600">
                  vs last month
                </span>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                {metric.description}
              </p>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}