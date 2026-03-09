'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { 
  Settings, 
  User, 
  Bell, 
  Shield, 
  Database, 
  Palette, 
  Globe, 
  Key,
  Mail,
  Phone,
  Building,
  Save
} from 'lucide-react'

export default function SettingsPage() {
  const [hasApiKey, setHasApiKey] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('profile')
  const [apiKeyPreview, setApiKeyPreview] = useState('')
  const router = useRouter()

  useEffect(() => {
    const checkApiKey = () => {
      try {
        const apiKey = sessionStorage.getItem('openai_api_key')
        if (!apiKey) {
          router.push('/')
          return
        }
        setHasApiKey(true)
        setApiKeyPreview(apiKey)
      } catch (error) {
        console.error('Error accessing sessionStorage:', error)
        router.push('/')
      } finally {
        setIsLoading(false)
      }
    }

    const timer = setTimeout(checkApiKey, 100)
    return () => clearTimeout(timer)
  }, [router])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  if (!hasApiKey) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Redirecting...</p>
        </div>
      </div>
    )
  }

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'api', label: 'API Settings', icon: Key },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'integrations', label: 'Integrations', icon: Database },
    { id: 'appearance', label: 'Appearance', icon: Palette },
  ]

  const renderProfileSettings = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
          <CardDescription>Update your personal details and contact information</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium">First Name</label>
              <Input placeholder="Enter first name" />
            </div>
            <div>
              <label className="text-sm font-medium">Last Name</label>
              <Input placeholder="Enter last name" />
            </div>
          </div>
          <div>
            <label className="text-sm font-medium">Email</label>
            <Input placeholder="Enter email address" type="email" />
          </div>
          <div>
            <label className="text-sm font-medium">Company</label>
            <Input placeholder="Enter company name" />
          </div>
          <Button>
            <Save className="h-4 w-4 mr-2" />
            Save Changes
          </Button>
        </CardContent>
      </Card>
    </div>
  )

  const renderApiSettings = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>OpenAI API Configuration</CardTitle>
          <CardDescription>Manage your OpenAI API key and settings</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm font-medium">Current API Key</label>
            <div className="mt-1 p-3 bg-gray-50 rounded-lg border">
              <p className="font-mono text-sm">{apiKeyPreview}</p>
              <p className="text-xs text-green-600 mt-1">🔒 Stored in session only - not saved on server</p>
            </div>
          </div>
          <div>
            <label className="text-sm font-medium">Model Selection</label>
            <select className="w-full mt-1 p-2 border rounded-lg">
              <option value="gpt-4-turbo">GPT-4 Turbo (Recommended)</option>
              <option value="gpt-4">GPT-4</option>
              <option value="gpt-3.5-turbo">GPT-3.5 Turbo</option>
            </select>
          </div>
          <div>
            <label className="text-sm font-medium">Max Query Results</label>
            <Input type="number" defaultValue="1000" placeholder="Maximum results per query" />
          </div>
          <Button onClick={() => router.push('/')}>
            <Key className="h-4 w-4 mr-2" />
            Change API Key
          </Button>
        </CardContent>
      </Card>
    </div>
  )

  const renderNotificationSettings = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Notification Preferences</CardTitle>
          <CardDescription>Choose what notifications you want to receive</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Query Results</p>
              <p className="text-sm text-gray-600">Get notified when AI queries complete</p>
            </div>
            <input type="checkbox" defaultChecked className="rounded" />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Market Alerts</p>
              <p className="text-sm text-gray-600">Receive market intelligence updates</p>
            </div>
            <input type="checkbox" defaultChecked className="rounded" />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Risk Warnings</p>
              <p className="text-sm text-gray-600">Get alerts for high-risk situations</p>
            </div>
            <input type="checkbox" defaultChecked className="rounded" />
          </div>
          <Button>
            <Save className="h-4 w-4 mr-2" />
            Save Preferences
          </Button>
        </CardContent>
      </Card>
    </div>
  )

  const renderContent = () => {
    switch (activeTab) {
      case 'profile': return renderProfileSettings()
      case 'api': return renderApiSettings()
      case 'notifications': return renderNotificationSettings()
      case 'security': return (
        <Card>
          <CardHeader>
            <CardTitle>Security Settings</CardTitle>
            <CardDescription>Manage your account security</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">Security settings are managed through your API key. Your key is stored securely in your browser session only.</p>
          </CardContent>
        </Card>
      )
      case 'integrations': return (
        <Card>
          <CardHeader>
            <CardTitle>Integrations</CardTitle>
            <CardDescription>Connect with external services</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">Integration features coming soon. Connect with your favorite business tools.</p>
          </CardContent>
        </Card>
      )
      case 'appearance': return (
        <Card>
          <CardHeader>
            <CardTitle>Appearance</CardTitle>
            <CardDescription>Customize the look and feel</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Theme</label>
                <select className="w-full mt-1 p-2 border rounded-lg">
                  <option value="light">Light</option>
                  <option value="dark">Dark</option>
                  <option value="system">System</option>
                </select>
              </div>
            </div>
          </CardContent>
        </Card>
      )
      default: return renderProfileSettings()
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-600">
          Manage your account settings and preferences.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="text-lg">Settings</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <nav className="space-y-1">
              {tabs.map((tab) => {
                const Icon = tab.icon
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-gray-50 ${
                      activeTab === tab.id ? 'bg-blue-50 text-blue-600 border-r-2 border-blue-600' : 'text-gray-700'
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    <span className="text-sm font-medium">{tab.label}</span>
                  </button>
                )
              })}
            </nav>
          </CardContent>
        </Card>

        <div className="lg:col-span-3">
          {renderContent()}
        </div>
      </div>
    </div>
  )
}