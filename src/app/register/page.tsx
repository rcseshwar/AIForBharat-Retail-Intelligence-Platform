'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { useToast } from '@/hooks/use-toast'
import { 
  User, 
  Mail, 
  Lock, 
  Crown, 
  Zap, 
  Check, 
  CreditCard,
  ArrowLeft,
  Eye,
  EyeOff
} from 'lucide-react'

interface PaymentFormData {
  cardNumber: string
  expiryDate: string
  cvv: string
  cardholderName: string
}

export default function RegisterPage() {
  const router = useRouter()
  const { toast } = useToast()
  
  const [step, setStep] = useState<'account-type' | 'user-info' | 'payment' | 'processing'>('account-type')
  const [selectedAccountType, setSelectedAccountType] = useState<'free' | 'pro' | null>(null)
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  
  const [userInfo, setUserInfo] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  
  const [paymentInfo, setPaymentInfo] = useState<PaymentFormData>({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardholderName: ''
  })

  const handleAccountTypeSelect = (type: 'free' | 'pro') => {
    setSelectedAccountType(type)
    setStep('user-info')
  }

  const handleUserInfoSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validation
    if (!userInfo.name || !userInfo.email || !userInfo.password) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive"
      })
      return
    }
    
    if (userInfo.password !== userInfo.confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match.",
        variant: "destructive"
      })
      return
    }
    
    if (userInfo.password.length < 8) {
      toast({
        title: "Error",
        description: "Password must be at least 8 characters long.",
        variant: "destructive"
      })
      return
    }

    if (selectedAccountType === 'pro') {
      setStep('payment')
    } else {
      await createAccount()
    }
  }

  const handlePaymentSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validation
    if (!paymentInfo.cardNumber || !paymentInfo.expiryDate || !paymentInfo.cvv || !paymentInfo.cardholderName) {
      toast({
        title: "Error",
        description: "Please fill in all payment details.",
        variant: "destructive"
      })
      return
    }

    await createAccount()
  }

  const createAccount = async () => {
    setIsLoading(true)
    setStep('processing')
    
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: userInfo.name,
          email: userInfo.email,
          password: userInfo.password,
          accountType: selectedAccountType,
          paymentInfo: selectedAccountType === 'pro' ? paymentInfo : null
        }),
      })

      const data = await response.json()

      if (response.ok) {
        toast({
          title: "Success!",
          description: `Your ${selectedAccountType} account has been created successfully.`,
        })
        
        // Store user session
        sessionStorage.setItem('userType', selectedAccountType!)
        sessionStorage.setItem('userId', data.user.id)
        sessionStorage.setItem('userEmail', data.user.email)
        sessionStorage.setItem('userName', data.user.name)
        
        // Redirect to dashboard
        router.push('/dashboard')
      } else {
        throw new Error(data.error || 'Registration failed')
      }
    } catch (error) {
      console.error('Registration error:', error)
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Registration failed. Please try again.",
        variant: "destructive"
      })
      setStep(selectedAccountType === 'pro' ? 'payment' : 'user-info')
    } finally {
      setIsLoading(false)
    }
  }

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '')
    const matches = v.match(/\d{4,16}/g)
    const match = matches && matches[0] || ''
    const parts = []
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4))
    }
    if (parts.length) {
      return parts.join(' ')
    } else {
      return v
    }
  }

  const formatExpiryDate = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '')
    if (v.length >= 2) {
      return v.substring(0, 2) + '/' + v.substring(2, 4)
    }
    return v
  }

  if (step === 'processing') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Creating Your Account</h3>
            <p className="text-gray-600 text-center">
              Please wait while we set up your {selectedAccountType} account...
            </p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Create Your Account</h1>
          <p className="text-gray-600">Join AI Retail Intelligence Platform</p>
        </div>

        {step === 'account-type' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Free Account Card */}
            <Card className="relative bg-white/90 backdrop-blur-sm border-white/20 shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer"
                  onClick={() => handleAccountTypeSelect('free')}>
              <CardHeader className="text-center pb-4">
                <div className="flex items-center justify-center mb-2">
                  <Zap className="h-8 w-8 text-blue-600 mr-2" />
                  <CardTitle className="text-2xl font-bold text-gray-900">Free Account</CardTitle>
                </div>
                <CardDescription className="text-gray-600">
                  Get started with essential AI-powered retail insights
                </CardDescription>
                <div className="mt-4">
                  <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                    $0/month
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center">
                    <Check className="h-4 w-4 text-green-600 mr-2" />
                    <span className="text-sm text-gray-700">5 AI queries per day</span>
                  </div>
                  <div className="flex items-center">
                    <Check className="h-4 w-4 text-green-600 mr-2" />
                    <span className="text-sm text-gray-700">Basic market intelligence</span>
                  </div>
                  <div className="flex items-center">
                    <Check className="h-4 w-4 text-green-600 mr-2" />
                    <span className="text-sm text-gray-700">Standard dashboard</span>
                  </div>
                  <div className="flex items-center">
                    <Check className="h-4 w-4 text-green-600 mr-2" />
                    <span className="text-sm text-gray-700">Email support</span>
                  </div>
                </div>
                
                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                  Choose Free
                </Button>
              </CardContent>
            </Card>

            {/* Pro Account Card */}
            <Card className="relative bg-white/90 backdrop-blur-sm border-white/20 shadow-xl hover:shadow-2xl transition-all duration-300 ring-2 ring-purple-500 cursor-pointer"
                  onClick={() => handleAccountTypeSelect('pro')}>
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <Badge className="bg-purple-600 text-white px-3 py-1">
                  Most Popular
                </Badge>
              </div>
              <CardHeader className="text-center pb-4">
                <div className="flex items-center justify-center mb-2">
                  <Crown className="h-8 w-8 text-purple-600 mr-2" />
                  <CardTitle className="text-2xl font-bold text-gray-900">Pro Account</CardTitle>
                </div>
                <CardDescription className="text-gray-600">
                  Unlock the full power of AI-driven retail intelligence
                </CardDescription>
                <div className="mt-4">
                  <Badge variant="secondary" className="bg-purple-100 text-purple-800">
                    $29/month
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center">
                    <Check className="h-4 w-4 text-green-600 mr-2" />
                    <span className="text-sm text-gray-700">Unlimited AI queries</span>
                  </div>
                  <div className="flex items-center">
                    <Check className="h-4 w-4 text-green-600 mr-2" />
                    <span className="text-sm text-gray-700">Advanced market intelligence</span>
                  </div>
                  <div className="flex items-center">
                    <Check className="h-4 w-4 text-green-600 mr-2" />
                    <span className="text-sm text-gray-700">AI-powered forecasting</span>
                  </div>
                  <div className="flex items-center">
                    <Check className="h-4 w-4 text-green-600 mr-2" />
                    <span className="text-sm text-gray-700">Risk analysis & compliance</span>
                  </div>
                  <div className="flex items-center">
                    <Check className="h-4 w-4 text-green-600 mr-2" />
                    <span className="text-sm text-gray-700">AI Copilot assistant</span>
                  </div>
                  <div className="flex items-center">
                    <Check className="h-4 w-4 text-green-600 mr-2" />
                    <span className="text-sm text-gray-700">Priority support</span>
                  </div>
                </div>
                
                <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white">
                  Choose Pro
                </Button>
              </CardContent>
            </Card>
          </div>
        )}

        {step === 'user-info' && (
          <Card className="max-w-md mx-auto">
            <CardHeader>
              <CardTitle className="flex items-center">
                <User className="h-5 w-5 mr-2" />
                Account Information
              </CardTitle>
              <CardDescription>
                Create your {selectedAccountType} account
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleUserInfoSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name *
                  </label>
                  <Input
                    type="text"
                    value={userInfo.name}
                    onChange={(e) => setUserInfo({...userInfo, name: e.target.value})}
                    placeholder="Enter your full name"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address *
                  </label>
                  <Input
                    type="email"
                    value={userInfo.email}
                    onChange={(e) => setUserInfo({...userInfo, email: e.target.value})}
                    placeholder="Enter your email"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Password *
                  </label>
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      value={userInfo.password}
                      onChange={(e) => setUserInfo({...userInfo, password: e.target.value})}
                      placeholder="Create a password"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Must be at least 8 characters long
                  </p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Confirm Password *
                  </label>
                  <Input
                    type="password"
                    value={userInfo.confirmPassword}
                    onChange={(e) => setUserInfo({...userInfo, confirmPassword: e.target.value})}
                    placeholder="Confirm your password"
                    required
                  />
                </div>

                <div className="flex space-x-3 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setStep('account-type')}
                    className="flex-1"
                  >
                    Back
                  </Button>
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="flex-1 bg-blue-600 hover:bg-blue-700"
                  >
                    {selectedAccountType === 'pro' ? 'Continue to Payment' : 'Create Account'}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        {step === 'payment' && (
          <Card className="max-w-md mx-auto">
            <CardHeader>
              <CardTitle className="flex items-center">
                <CreditCard className="h-5 w-5 mr-2" />
                Payment Information
              </CardTitle>
              <CardDescription>
                Complete your Pro subscription ($29/month)
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handlePaymentSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Cardholder Name *
                  </label>
                  <Input
                    type="text"
                    value={paymentInfo.cardholderName}
                    onChange={(e) => setPaymentInfo({...paymentInfo, cardholderName: e.target.value})}
                    placeholder="Name on card"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Card Number *
                  </label>
                  <Input
                    type="text"
                    value={paymentInfo.cardNumber}
                    onChange={(e) => setPaymentInfo({...paymentInfo, cardNumber: formatCardNumber(e.target.value)})}
                    placeholder="1234 5678 9012 3456"
                    maxLength={19}
                    required
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Expiry Date *
                    </label>
                    <Input
                      type="text"
                      value={paymentInfo.expiryDate}
                      onChange={(e) => setPaymentInfo({...paymentInfo, expiryDate: formatExpiryDate(e.target.value)})}
                      placeholder="MM/YY"
                      maxLength={5}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      CVV *
                    </label>
                    <Input
                      type="text"
                      value={paymentInfo.cvv}
                      onChange={(e) => setPaymentInfo({...paymentInfo, cvv: e.target.value.replace(/\D/g, '')})}
                      placeholder="123"
                      maxLength={4}
                      required
                    />
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Monthly subscription</span>
                    <span className="font-semibold">$29.00</span>
                  </div>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-sm text-gray-600">Total</span>
                    <span className="font-bold text-lg">$29.00</span>
                  </div>
                </div>

                <p className="text-xs text-gray-500">
                  This is a demo payment form. No actual charges will be made.
                </p>

                <div className="flex space-x-3 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setStep('user-info')}
                    className="flex-1"
                  >
                    Back
                  </Button>
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="flex-1 bg-purple-600 hover:bg-purple-700"
                  >
                    Complete Registration
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Already have an account */}
        <div className="text-center mt-8">
          <p className="text-gray-600">
            Already have an account?{' '}
            <Link href="/login" className="text-blue-600 hover:text-blue-700 font-medium">
              Sign in here
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}