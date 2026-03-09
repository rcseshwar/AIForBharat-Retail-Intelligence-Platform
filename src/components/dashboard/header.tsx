'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Key, LogOut, Settings } from 'lucide-react'

export function DashboardHeader() {
  const router = useRouter()
  const [hasApiKey, setHasApiKey] = useState(false)
  const [apiKeyPreview, setApiKeyPreview] = useState('')
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
    const apiKey = sessionStorage.getItem('openai_api_key')
    
    if (!apiKey) {
      // Redirect to home if no API key
      router.push('/')
      return
    }
    
    setHasApiKey(true)
    // Show only first 7 and last 4 characters of API key
    setApiKeyPreview(`${apiKey.substring(0, 7)}...${apiKey.substring(apiKey.length - 4)}`)
  }, [router])

  const handleChangeApiKey = () => {
    // Clear API key and redirect to home
    sessionStorage.removeItem('openai_api_key')
    router.push('/')
  }

  // Don't render until client-side hydration is complete
  if (!isClient || !hasApiKey) {
    return (
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              AI Retail Intelligence
            </h1>
            <p className="text-sm text-gray-600">
              Powered by OpenAI
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="h-10 w-10 bg-gray-200 rounded-full animate-pulse"></div>
          </div>
        </div>
      </header>
    )
  }

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            AI Retail Intelligence
          </h1>
          <p className="text-sm text-gray-600">
            Powered by OpenAI
          </p>
        </div>

        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Key className="h-4 w-4" />
            <span>API Key: {apiKeyPreview}</span>
          </div>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm">
                <Settings className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end">
              <DropdownMenuLabel>Settings</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleChangeApiKey}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Change API Key</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}