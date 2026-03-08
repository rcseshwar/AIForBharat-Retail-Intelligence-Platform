'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Lightbulb, TrendingUp, Users, DollarSign, Package, Calendar } from 'lucide-react'

interface QueryExample {
  category: string
  icon: React.ComponentType<{ className?: string }>
  color: string
  queries: string[]
}

const queryExamples: QueryExample[] = [
  {
    category: 'Sales & Revenue',
    icon: DollarSign,
    color: 'bg-green-50 text-green-600',
    queries: [
      'What is our total revenue this month?',
      'Show me the top 5 products by revenue',
      'Compare sales this month vs last month',
      'What is our average order value?'
    ]
  },
  {
    category: 'Customer Analysis',
    icon: Users,
    color: 'bg-blue-50 text-blue-600',
    queries: [
      'How many new customers did we acquire this month?',
      'What is the lifetime value of our premium customers?',
      'Show customer segments by region',
      'Which customers have the highest purchase frequency?'
    ]
  },
  {
    category: 'Product Performance',
    icon: Package,
    color: 'bg-purple-50 text-purple-600',
    queries: [
      'Which products are selling the most?',
      'Show products with declining sales',
      'What is the profit margin by product category?',
      'List products that need restocking'
    ]
  },
  {
    category: 'Trends & Patterns',
    icon: TrendingUp,
    color: 'bg-orange-50 text-orange-600',
    queries: [
      'Show sales trends over the last 6 months',
      'What are the seasonal patterns in our sales?',
      'Which day of the week has the highest sales?',
      'How has customer acquisition changed over time?'
    ]
  },
  {
    category: 'Time-based Analysis',
    icon: Calendar,
    color: 'bg-indigo-50 text-indigo-600',
    queries: [
      'Show daily sales for this week',
      'Compare Q1 performance to Q4',
      'What were our sales on Black Friday?',
      'Show monthly growth rate for this year'
    ]
  }
]

interface QueryExamplesProps {
  onExampleClick: (query: string) => void
}

export function QueryExamples({ onExampleClick }: QueryExamplesProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Lightbulb className="h-5 w-5" />
          <span>Example Queries</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {queryExamples.map((category) => {
            const Icon = category.icon
            
            return (
              <div key={category.category}>
                <div className="flex items-center space-x-2 mb-3">
                  <div className={`p-1.5 rounded-lg ${category.color}`}>
                    <Icon className="h-4 w-4" />
                  </div>
                  <h4 className="font-medium text-gray-900 text-sm">
                    {category.category}
                  </h4>
                </div>
                
                <div className="space-y-2">
                  {category.queries.map((query, index) => (
                    <Button
                      key={index}
                      variant="ghost"
                      className="w-full justify-start text-left h-auto p-3 text-sm text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                      onClick={() => onExampleClick(query)}
                    >
                      <span className="truncate">{query}</span>
                    </Button>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
        
        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <div className="flex items-start space-x-2">
            <Lightbulb className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-blue-900">Pro Tip</p>
              <p className="text-sm text-blue-800 mt-1">
                Click on any example to use it as a starting point. You can modify the query to match your specific needs.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}