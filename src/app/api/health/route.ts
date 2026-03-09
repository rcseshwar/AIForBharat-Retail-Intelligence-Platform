import { NextResponse } from 'next/server'

// Force dynamic rendering for this API route
export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    // Basic health check - only test services if environment variables are available
    const services: { [key: string]: string } = {}
    
    // Check if database URL is configured
    if (process.env.DATABASE_URL) {
      try {
        const { prisma } = await import('@/lib/prisma')
        await prisma.$queryRaw`SELECT 1`
        services.database = 'connected'
      } catch (error) {
        services.database = 'disconnected'
      }
    } else {
      services.database = 'not_configured'
    }
    
    // Check if Redis URL is configured
    if (process.env.REDIS_URL) {
      try {
        const { connectRedis } = await import('@/lib/redis')
        const redisClient = await connectRedis()
        await redisClient.ping()
        services.redis = 'connected'
      } catch (error) {
        services.redis = 'disconnected'
      }
    } else {
      services.redis = 'not_configured'
    }

    return NextResponse.json({
      status: 'healthy',
      timestamp: new Date().toISOString(),
      services
    })
  } catch (error) {
    console.error('Health check failed:', error)
    
    return NextResponse.json(
      {
        status: 'unhealthy',
        timestamp: new Date().toISOString(),
        error: 'Service check failed'
      },
      { status: 503 }
    )
  }
}