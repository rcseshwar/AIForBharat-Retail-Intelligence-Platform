'use client'

import { Badge } from '@/components/ui/badge'
import { Crown, Zap } from 'lucide-react'

interface UserTypeBadgeProps {
  userType: 'free' | 'pro'
}

export function UserTypeBadge({ userType }: UserTypeBadgeProps) {
  if (userType === 'pro') {
    return (
      <Badge className="bg-purple-600 text-white hover:bg-purple-700">
        <Crown className="h-3 w-3 mr-1" />
        Pro User
      </Badge>
    )
  }

  return (
    <Badge variant="secondary" className="bg-blue-100 text-blue-800">
      <Zap className="h-3 w-3 mr-1" />
      Free User
    </Badge>
  )
}