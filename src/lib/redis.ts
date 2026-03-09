import { createClient } from 'redis'

const globalForRedis = globalThis as unknown as {
  redis: ReturnType<typeof createClient> | undefined
}

export const redis = globalForRedis.redis ?? createClient({
  url: process.env.REDIS_URL || 'redis://localhost:6379',
})

if (process.env.NODE_ENV !== 'production') globalForRedis.redis = redis

// Connect to Redis only when needed, not at module load
export async function connectRedis() {
  if (!redis.isOpen) {
    try {
      await redis.connect()
    } catch (error) {
      console.error('Redis connection failed:', error)
    }
  }
  return redis
}