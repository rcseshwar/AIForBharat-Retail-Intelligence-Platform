'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { 
  Users, Search, Filter, UserPlus, Mail, Phone, MapPin, Calendar, Crown
} from 'lucide-react'

interface Customer {
  id: string
  name: string
  email: string
  phone: string
  location: string
  joinDate: string
  totalOrders: number
  totalSpent: number
  status: 'active' | 'inactive' | 'vip'
  segment: string
}

const mockCustomers: Customer[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    email: 'sarah.j@email.com',
    phone: '+1 (555) 123-4567',
    location: 'New York, NY',
    joinDate: '2024-01-15',
    totalOrders: 24,
    totalSpent: 2850.00,
    status: 'vip',
    segment: 'High Value'
  },
  {
    id: '2',
    name: 'Michael Chen',
    email: 'm.chen@email.com',
    phone: '+1 (555) 234-5678',
    location: 'San Francisco, CA',
    joinDate: '2024-02-20',
    totalOrders: 12,
    totalSpent: 1200.00,
    status: 'active',
    segment: 'Regular'
  },
  {
    id: '3',
    name: 'Emily Rodriguez',
    email: 'emily.r@email.com',
    phone: '+1 (555) 345-6789',
    location: 'Austin, TX',
    joinDate: '2024-03-10',
    totalOrders: 8,
    totalSpent: 650.00,
    status: 'active',
    segment: 'New Customer'
  }
]

export default function CustomersPage() {
  const [userType, setUserType] = useState<'free' | 'pro' | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedSegment, setSelectedSegment] = useState('all')

  useEffect(() => {
    const savedUserType = sessionStorage.getItem('userType') as 'free' | 'pro' | null
    if (savedUserType) {
      setUserType(savedUserType)
    }
  }, [])

  const filteredCustomers = mockCustomers.filter(customer => {
    const matchesSearch = customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         customer.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesSegment = selectedSegment === 'all' || customer.segment === selectedSegment
    return matchesSearch && matchesSegment
  })

  const getStatusColor = (status: Customer['status']) => {
    switch (status) {
      case 'vip': return 'bg-purple-100 text-purple-800'
      case 'active': return 'bg-green-100 text-green-800'
      case 'inactive': return 'bg-gray-100 text-gray-800'
      default: return 'bg-gray-100 text-gray-800'
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

  if (userType === 'free') {
    return (
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Customer Management</h1>
            <p className="text-gray-600">Manage and analyze your customer base</p>
          </div>
          <Users className="h-8 w-8 text-blue-600" />
        </div>

        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Crown className="h-16 w-16 text-purple-400 mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Pro Feature</h3>
            <p className="text-gray-600 text-center mb-6 max-w-md">
              Customer Management is available for Pro users. Access detailed customer profiles, segmentation, and analytics to better understand and serve your customers.
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
      </div>
    )
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Customer Management</h1>
          <p className="text-gray-600">Manage and analyze your customer base</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button className="bg-blue-600 hover:bg-blue-700">
            <UserPlus className="h-4 w-4 mr-2" />
            Add Customer
          </Button>
        </div>
      </div>

      {/* Customer Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Total Customers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">1,247</div>
            <p className="text-xs text-green-600">+12% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Active Customers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">1,089</div>
            <p className="text-xs text-green-600">+8% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">VIP Customers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">156</div>
            <p className="text-xs text-blue-600">+15% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Avg. Order Value</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">$127</div>
            <p className="text-xs text-green-600">+5% from last month</p>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-lg">Customer Directory</CardTitle>
          <CardDescription>Search and filter your customer database</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search customers by name or email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Filter className="h-4 w-4 text-gray-400" />
              <select
                value={selectedSegment}
                onChange={(e) => setSelectedSegment(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-2 text-sm"
              >
                <option value="all">All Segments</option>
                <option value="High Value">High Value</option>
                <option value="Regular">Regular</option>
                <option value="New Customer">New Customer</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Customer List */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Customers ({filteredCustomers.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredCustomers.map((customer) => (
              <div key={customer.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="font-semibold text-gray-900">{customer.name}</h3>
                      <Badge className={getStatusColor(customer.status)}>
                        {customer.status.toUpperCase()}
                      </Badge>
                      <Badge variant="outline">{customer.segment}</Badge>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm text-gray-600">
                      <div className="flex items-center">
                        <Mail className="h-4 w-4 mr-2" />
                        {customer.email}
                      </div>
                      <div className="flex items-center">
                        <Phone className="h-4 w-4 mr-2" />
                        {customer.phone}
                      </div>
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-2" />
                        {customer.location}
                      </div>
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-2" />
                        Joined {new Date(customer.joinDate).toLocaleDateString()}
                      </div>
                    </div>
                    <div className="flex items-center space-x-6 mt-2 text-sm">
                      <span className="text-gray-600">
                        <strong>{customer.totalOrders}</strong> orders
                      </span>
                      <span className="text-gray-600">
                        <strong>${customer.totalSpent.toLocaleString()}</strong> total spent
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm">
                      View Profile
                    </Button>
                    <Button variant="outline" size="sm">
                      Contact
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}