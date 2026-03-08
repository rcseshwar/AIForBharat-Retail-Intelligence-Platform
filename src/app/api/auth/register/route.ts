import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'

export async function POST(request: NextRequest) {
  try {
    const { name, email, password, accountType, paymentInfo } = await request.json()

    // Validation
    if (!name || !email || !password || !accountType) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    if (password.length < 8) {
      return NextResponse.json(
        { error: 'Password must be at least 8 characters long' },
        { status: 400 }
      )
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email }
    })

    if (existingUser) {
      return NextResponse.json(
        { error: 'User with this email already exists' },
        { status: 400 }
      )
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12)

    // Set AI query limits based on account type
    const aiQueriesLimit = accountType === 'PRO' ? 999999 : 5

    // Create user
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        accountType: accountType.toUpperCase(),
        aiQueriesLimit,
        aiQueriesUsed: 0
      }
    })

    // Create subscription for Pro users
    if (accountType === 'pro' && paymentInfo) {
      const subscription = await prisma.subscription.create({
        data: {
          userId: user.id,
          accountType: 'PRO',
          status: 'ACTIVE',
          amount: 29.00,
          currency: 'USD',
          paymentMethod: 'credit_card',
          nextPaymentDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30 days from now
        }
      })

      // Create initial payment record (demo)
      await prisma.payment.create({
        data: {
          subscriptionId: subscription.id,
          amount: 29.00,
          currency: 'USD',
          status: 'COMPLETED',
          paymentMethod: 'credit_card',
          transactionId: `demo_${Date.now()}`,
          processedAt: new Date()
        }
      })
    }

    // Return user data (excluding password)
    const { password: _, ...userWithoutPassword } = user

    return NextResponse.json({
      message: 'User created successfully',
      user: userWithoutPassword
    })

  } catch (error) {
    console.error('Registration error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}