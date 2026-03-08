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
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { getInitials } from '@/lib/utils'
import { LogOut, Settings, User } from 'lucide-react'

export function DashboardHeader() {
  const router = useRouter()
  const [userType, setUserType] = useState<'free' | 'pro' | null>(null)
  const [userName, setUserName] = useState('')
  const [userEmail, setUserEmail] = useState('')
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
    const storedUserType = sessionStorage.getItem('userType') as 'free' | 'pro' | null
    const storedUserId = sessionStorage.getItem('userId')
    const storedUserName = sessionStorage.getItem('userName')
    const storedUserEmail = sessionStorage.getItem('userEmail')
    
    setUserType(storedUserType)
    
    // Use stored user info if available, otherwise use defaults
    if (storedUserId && storedUserName && storedUserEmail) {
      setUserName(storedUserName)
      setUserEmail(storedUserEmail)
    } else if (storedUserType) {
      setUserName(storedUserType === 'pro' ? 'Pro User' : 'Free User')
      setUserEmail(storedUserType === 'pro' ? 'pro@demo.com' : 'free@demo.com')
    }
  }, [])

  const handleLogout = () => {
    // Clear session storage and redirect to home
    sessionStorage.removeItem('userType')
    sessionStorage.removeItem('userId')
    sessionStorage.removeItem('userName')
    sessionStorage.removeItem('userEmail')
    sessionStorage.removeItem('aiQueriesUsed')
    sessionStorage.removeItem('aiQueriesLimit')
    router.push('/')
  }

  // Don't render user-specific content until client-side hydration is complete
  if (!isClient || !userType) {
    return (
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              AI Retail Intelligence
            </h1>
            <p className="text-sm text-gray-600">
              Demo Platform
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
            Demo Platform
          </p>
        </div>

        <div className="flex items-center space-x-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                <Avatar className="h-10 w-10">
                  <AvatarFallback className="bg-blue-600 text-white">
                    {getInitials(userName)}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">{userName}</p>
                  <p className="text-xs leading-none text-muted-foreground">
                    {userEmail}
                  </p>
                  <p className="text-xs leading-none text-muted-foreground">
                    Type: {userType || 'free'}
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="text-red-600"
                onClick={handleLogout}
              >
                <LogOut className="mr-2 h-4 w-4" />
                <span>Switch User Type</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}