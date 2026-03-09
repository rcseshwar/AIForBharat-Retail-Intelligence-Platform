'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useTheme } from 'next-themes'
import { Button } from '@/components/ui/button'
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Key, LogOut, Settings, Sun, Moon, Monitor } from 'lucide-react'

export function DashboardHeader() {
  const router = useRouter()
  const { theme, setTheme } = useTheme()
  const [hasApiKey, setHasApiKey] = useState(false)
  const [apiKeyPreview, setApiKeyPreview] = useState('')
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    const checkApiKey = () => {
      try {
        setIsClient(true)
        const apiKey = sessionStorage.getItem('openai_api_key')
        
        if (!apiKey) {
          // Redirect to home if no API key
          router.push('/')
          return
        }
        
        setHasApiKey(true)
        // Show the full API key
        setApiKeyPreview(apiKey)
      } catch (error) {
        console.error('Error accessing sessionStorage:', error)
        router.push('/')
      }
    }

    const timer = setTimeout(checkApiKey, 100)
    return () => clearTimeout(timer)
  }, [router])

  const handleChangeApiKey = () => {
    // Clear API key and redirect to home
    sessionStorage.removeItem('openai_api_key')
    router.push('/')
  }

  // Don't render until client-side hydration is complete
  if (!isClient || !hasApiKey) {
    return (
      <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              AI Retail Intelligence
            </h1>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Powered by OpenAI
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="h-10 w-10 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse"></div>
          </div>
        </div>
      </header>
    )
  }

  return (
    <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 px-6 py-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            AI Retail Intelligence
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Powered by OpenAI
          </p>
        </div>

        <div className="flex items-center space-x-4">
          <div className="flex flex-col items-end space-y-1">
            <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
              <Key className="h-4 w-4" />
              <span className="text-green-600 dark:text-green-400 font-medium">API Key Connected</span>
            </div>
            <p className="text-xs text-green-600 dark:text-green-400 font-medium">
              🔒 Session only - not stored on server
            </p>
          </div>

          {/* Theme Toggle */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm">
                <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                <span className="sr-only">Toggle theme</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setTheme("light")}>
                <Sun className="mr-2 h-4 w-4" />
                <span>Light</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("dark")}>
                <Moon className="mr-2 h-4 w-4" />
                <span>Dark</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("system")}>
                <Monitor className="mr-2 h-4 w-4" />
                <span>System</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
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