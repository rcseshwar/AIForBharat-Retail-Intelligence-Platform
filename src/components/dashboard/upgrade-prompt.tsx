'use client'

import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Crown, X, ArrowRight } from 'lucide-react'

export function UpgradePrompt() {
  const [isVisible, setIsVisible] = useState(true)

  const handleUpgrade = () => {
    // Set user type to pro
    sessionStorage.setItem('userType', 'pro')
    // Reload the page to reflect changes
    window.location.reload()
  }

  if (!isVisible) return null

  return (
    <Card className="bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Crown className="h-5 w-5 text-purple-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Unlock Pro Features</h3>
              <p className="text-sm text-gray-600">
                Get unlimited queries, advanced AI features, and priority support
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button 
              onClick={handleUpgrade}
              className="bg-purple-600 hover:bg-purple-700 text-white"
            >
              Upgrade Now
              <ArrowRight className="h-4 w-4 ml-1" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsVisible(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}