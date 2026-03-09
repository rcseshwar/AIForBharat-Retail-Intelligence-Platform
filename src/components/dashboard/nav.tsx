'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import {
  BarChart3,
  Brain,
  Database,
  FileText,
  Home,
  MessageSquare,
  Settings,
  Shield,
  TrendingUp,
  Users,
} from 'lucide-react'

interface NavItem {
  title: string
  href: string
  icon: React.ComponentType<{ className?: string }>
}

const navItems: NavItem[] = [
  {
    title: 'Dashboard',
    href: '/dashboard',
    icon: Home,
  },
  {
    title: 'AI Query',
    href: '/dashboard/query',
    icon: Database,
  },
  {
    title: 'AI Copilot',
    href: '/dashboard/copilot',
    icon: MessageSquare,
  },
  {
    title: 'Market Intelligence',
    href: '/dashboard/market',
    icon: TrendingUp,
  },
  {
    title: 'Demand Forecasting',
    href: '/dashboard/forecasting',
    icon: BarChart3,
  },
  {
    title: 'Pricing Optimization',
    href: '/dashboard/pricing',
    icon: Brain,
  },
  {
    title: 'Risk Analysis',
    href: '/dashboard/risk',
    icon: Shield,
  },
  {
    title: 'Documents',
    href: '/dashboard/documents',
    icon: FileText,
  },
  {
    title: 'Customers',
    href: '/dashboard/customers',
    icon: Users,
  },
  {
    title: 'Settings',
    href: '/dashboard/settings',
    icon: Settings,
  },
]

export function DashboardNav() {
  const pathname = usePathname()

  return (
    <nav className="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 min-h-screen">
      <div className="p-4">
        <div className="space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href
            const Icon = item.icon

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors',
                  isActive
                    ? 'bg-blue-50 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 border-r-2 border-blue-700 dark:border-blue-400'
                    : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-700'
                )}
              >
                <Icon className="mr-3 h-5 w-5" />
                {item.title}
              </Link>
            )
          })}
        </div>
      </div>
    </nav>
  )
}