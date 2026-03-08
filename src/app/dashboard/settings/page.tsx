'use client'

import { useState, useEffect } from 'react'
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
  CreditCard,
  Key,
  Mail,
  Phone,
  Building,
  Crown
} from 'lucide-react'

export default function SettingsPage() {
  const [userType, setUserType] = useState<'free' | 'pro' | null>(null)
  const [activeTab, setActiveTab] = useState('profile')

  useEffect(() => {
    const savedUserType = sessionStorage.getItem('userType') as 'free' | 'pro' | null
    if (savedUserType) {
      setUserType(savedUserType)
    }
  }, [])

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'integrations', label: 'Integrations', icon: Database },
    { id: 'appearance', label: 'Appearance', icon: Palette },
    { id: 'billing', label: 'Billing', icon: CreditCard },
  ]

  const renderProfileSettings = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
          <CardDescription>Update your personal details and contact information</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
              <Input placeholder="John" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
              <Input placeholder="Doe" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
            <Input type="email" placeholder="john.doe@company.com" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
            <Input type="tel" placeholder="+1 (555) 123-4567" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Company</label>
            <Input placeholder="Your Company Name" />
          </div>
          <Button className="bg-blue-600 hover:bg-blue-700">Save Changes</Button>
        </CardContent>
      </Card>
    </div>
  )

  const renderNotificationSettings = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Email Notifications</CardTitle>
          <CardDescription>Choose what email notifications you'd like to receive</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {[
            { label: 'Query Results', description: 'Get notified when your AI queries complete' },
            { label: 'Market Alerts', description: 'Receive alerts about market changes and trends' },
            { label: 'System Updates', description: 'Important updates about the platform' },
            { label: 'Weekly Reports', description: 'Weekly summary of your analytics and insights' },
          ].map((item, index) => (
            <div key={index} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
              <div>
                <div className="font-medium text-gray-900">{item.label}</div>
                <div className="text-sm text-gray-600">{item.description}</div>
              </div>
              <input type="checkbox" className="h-4 w-4 text-blue-600" defaultChecked />
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )

  const renderSecuritySettings = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Security Settings</CardTitle>
          <CardDescription>Manage your account security and access</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-4 border border-gray-200 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium text-gray-900">Two-Factor Authentication</div>
                <div className="text-sm text-gray-600">Add an extra layer of security to your account</div>
              </div>
              <Badge variant="outline">Not Enabled</Badge>
            </div>
            <Button variant="outline" className="mt-3">Enable 2FA</Button>
          </div>
          <div className="p-4 border border-gray-200 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium text-gray-900">API Keys</div>
                <div className="text-sm text-gray-600">Manage API keys for integrations</div>
              </div>
              <Key className="h-5 w-5 text-gray-400" />
            </div>
            <Button variant="outline" className="mt-3">Manage API Keys</Button>
          </div>
          <div className="p-4 border border-gray-200 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium text-gray-900">Session Management</div>
                <div className="text-sm text-gray-600">View and manage active sessions</div>
              </div>
            </div>
            <Button variant="outline" className="mt-3">View Sessions</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderIntegrationsSettings = () => {
    if (userType === 'free') {
      return (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Crown className="h-16 w-16 text-purple-400 mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Pro Feature</h3>
            <p className="text-gray-600 text-center mb-6 max-w-md">
              Integrations are available for Pro users. Connect with external services, APIs, and data sources to enhance your retail intelligence capabilities.
            </p>
            <Button 
              onClick={() => {
                sessionStorage.setItem('userType', 'pro')
                window.location.reload()
              }}
              className="bg-purple-600 hover:bg-purple-700"
            >
              Upgrade to Pro
            </Button>
          </CardContent>
        </Card>
      )
    }

    return (
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Available Integrations</CardTitle>
            <CardDescription>Connect with external services and data sources</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { name: 'Shopify', description: 'Connect your Shopify store', status: 'connected' },
              { name: 'Google Analytics', description: 'Import web analytics data', status: 'available' },
              { name: 'Stripe', description: 'Sync payment and transaction data', status: 'available' },
              { name: 'Salesforce', description: 'Import customer and sales data', status: 'available' },
              { name: 'Amazon Seller Central', description: 'Connect your Amazon store', status: 'available' },
            ].map((integration, index) => (
              <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div>
                  <div className="font-medium text-gray-900">{integration.name}</div>
                  <div className="text-sm text-gray-600">{integration.description}</div>
                </div>
                <div className="flex items-center space-x-3">
                  <Badge className={integration.status === 'connected' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}>
                    {integration.status === 'connected' ? 'Connected' : 'Available'}
                  </Badge>
                  <Button variant="outline" size="sm">
                    {integration.status === 'connected' ? 'Configure' : 'Connect'}
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    )
  }

  const renderAppearanceSettings = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Appearance Settings</CardTitle>
          <CardDescription>Customize the look and feel of your dashboard</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">Theme</label>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 border-2 border-blue-500 rounded-lg cursor-pointer">
                <div className="w-full h-20 bg-white border border-gray-200 rounded mb-2"></div>
                <div className="text-sm font-medium text-center">Light</div>
              </div>
              <div className="p-4 border border-gray-200 rounded-lg cursor-pointer hover:border-gray-300">
                <div className="w-full h-20 bg-gray-900 rounded mb-2"></div>
                <div className="text-sm font-medium text-center">Dark</div>
              </div>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">Dashboard Layout</label>
            <div className="space-y-2">
              <label className="flex items-center">
                <input type="radio" name="layout" className="mr-2" defaultChecked />
                <span className="text-sm">Compact - More information in less space</span>
              </label>
              <label className="flex items-center">
                <input type="radio" name="layout" className="mr-2" />
                <span className="text-sm">Comfortable - More spacing between elements</span>
              </label>
            </div>
          </div>
          <Button className="bg-blue-600 hover:bg-blue-700">Save Preferences</Button>
        </CardContent>
      </Card>
    </div>
  )

  const renderBillingSettings = () => {
    if (userType === 'free') {
      return (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Current Plan</CardTitle>
              <CardDescription>You're currently on the Free plan</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div>
                  <div className="font-medium text-gray-900">Free Plan</div>
                  <div className="text-sm text-gray-600">5 queries per day, basic features</div>
                </div>
                <Badge className="bg-gray-100 text-gray-800">Current Plan</Badge>
              </div>
              <div className="mt-6">
                <Button className="bg-blue-600 hover:bg-blue-700">Upgrade to Pro</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )
    }

    return (
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Billing Information</CardTitle>
            <CardDescription>Manage your subscription and billing details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div>
                <div className="font-medium text-gray-900">Pro Plan</div>
                <div className="text-sm text-gray-600">Unlimited queries, all features</div>
              </div>
              <div className="text-right">
                <div className="font-medium text-gray-900">$29/month</div>
                <Badge className="bg-green-100 text-green-800">Active</Badge>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Button variant="outline">Update Payment Method</Button>
              <Button variant="outline">Download Invoice</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case 'profile': return renderProfileSettings()
      case 'notifications': return renderNotificationSettings()
      case 'security': return renderSecuritySettings()
      case 'integrations': return renderIntegrationsSettings()
      case 'appearance': return renderAppearanceSettings()
      case 'billing': return renderBillingSettings()
      default: return renderProfileSettings()
    }
  }

  if (!userType) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
          <p className="text-gray-600">Manage your account settings and preferences</p>
        </div>
        <Settings className="h-8 w-8 text-blue-600" />
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Settings Navigation */}
        <div className="lg:w-64">
          <Card>
            <CardContent className="p-0">
              <nav className="space-y-1">
                {tabs.map((tab) => {
                  const Icon = tab.icon
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center px-4 py-3 text-sm font-medium text-left transition-colors ${
                        activeTab === tab.id
                          ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700'
                          : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                      }`}
                    >
                      <Icon className="mr-3 h-5 w-5" />
                      {tab.label}
                    </button>
                  )
                })}
              </nav>
            </CardContent>
          </Card>
        </div>

        {/* Settings Content */}
        <div className="flex-1">
          {renderTabContent()}
        </div>
      </div>
    </div>
  )
}