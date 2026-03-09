'use client'

import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  Database, 
  MessageSquare, 
  TrendingUp, 
  BarChart3, 
  Brain, 
  Shield,
  FileText,
  Users
} from 'lucide-react'

const quickActions = [
  {
    title: 'Ask AI About Data',
    description: 'Query your business data using natural language',
    icon: Database,
    href: '/dashboard/query',
    color: 'bg-blue-50 text-blue-600'
  },
  {
    title: 'Chat with AI Copilot',
    description: 'Get AI assistance for business decisions',
    icon: MessageSquare,
    href: '/dashboard/copilot',
    color: 'bg-green-50 text-green-600'
  },
  {
    title: 'Market Intelligence',
    description: 'Analyze market trends and opportunities',
    icon: TrendingUp,
    href: '/dashboard/market',
    color: 'bg-purple-50 text-purple-600'
  },
  {
    title: 'Demand Forecasting',
    description: 'Predict future product demand',
    icon: BarChart3,
    href: '/dashboard/forecasting',
    color: 'bg-orange-50 text-orange-600'
  },
  {
    title: 'Pricing Optimization',
    description: 'Get AI-powered pricing recommendations',
    icon: Brain,
    href: '/dashboard/pricing',
    color: 'bg-pink-50 text-pink-600'
  },
  {
    title: 'Risk Analysis',
    description: 'Identify and mitigate business risks',
    icon: Shield,
    href: '/dashboard/risk',
    color: 'bg-red-50 text-red-600'
  },
  {
    title: 'Document Analysis',
    description: 'Extract insights from business documents',
    icon: FileText,
    href: '/dashboard/documents',
    color: 'bg-indigo-50 text-indigo-600'
  },
  {
    title: 'Customer Insights',
    description: 'Analyze customer behavior and segments',
    icon: Users,
    href: '/dashboard/customers',
    color: 'bg-teal-50 text-teal-600'
  }
]

export function QuickActions() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
        <CardDescription>
          Jump into AI-powered features to analyze your business data
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action) => {
            const Icon = action.icon
            
            return (
              <Link key={action.href} href={action.href}>
                <Button
                  variant="ghost"
                  className="h-auto p-4 flex flex-col items-start space-y-2 hover:bg-gray-50 w-full"
                >
                  <div className={`p-2 rounded-lg ${action.color}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="text-left">
                    <div className="font-medium text-gray-900 text-sm">
                      {action.title}
                    </div>
                    <div className="text-xs text-gray-600 mt-1">
                      {action.description}
                    </div>
                  </div>
                </Button>
              </Link>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}