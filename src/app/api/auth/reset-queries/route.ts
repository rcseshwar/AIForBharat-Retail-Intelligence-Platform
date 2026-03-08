import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(request: NextRequest) {
  try {
    const { userId } = await request.json()

    if (!userId) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      )
    }

    // Reset user's daily query count
    const user = await prisma.user.update({
      where: { id: userId },
      data: {
        aiQueriesUsed: 0
      }
    })

    return NextResponse.json({
      message: 'Query count reset successfully',
      queriesRemaining: user.aiQueriesLimit
    })

  } catch (error) {
    console.error('Reset queries error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}