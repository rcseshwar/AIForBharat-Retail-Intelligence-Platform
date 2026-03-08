import { GET } from '@/app/api/health/route'
import { prisma } from '@/lib/prisma'
import { redis } from '@/lib/redis'

// Mock the dependencies
jest.mock('@/lib/prisma')
jest.mock('@/lib/redis')

describe('/api/health', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should return healthy status when all services are available', async () => {
    // Mock successful database and Redis connections
    ;(prisma.$queryRaw as jest.Mock).mockResolvedValue([{ result: 1 }])
    ;(redis.ping as jest.Mock).mockResolvedValue('PONG')

    const response = await GET()
    const data = await response.json()

    expect(response.status).toBe(200)
    expect(data.status).toBe('healthy')
    expect(data.services.database).toBe('connected')
    expect(data.services.redis).toBe('connected')
    expect(data.timestamp).toBeDefined()
  })

  it('should return unhealthy status when database fails', async () => {
    // Mock database failure
    ;(prisma.$queryRaw as jest.Mock).mockRejectedValue(new Error('Database connection failed'))
    ;(redis.ping as jest.Mock).mockResolvedValue('PONG')

    const response = await GET()
    const data = await response.json()

    expect(response.status).toBe(503)
    expect(data.status).toBe('unhealthy')
    expect(data.error).toBe('Service unavailable')
  })

  it('should return unhealthy status when Redis fails', async () => {
    // Mock Redis failure
    ;(prisma.$queryRaw as jest.Mock).mockResolvedValue([{ result: 1 }])
    ;(redis.ping as jest.Mock).mockRejectedValue(new Error('Redis connection failed'))

    const response = await GET()
    const data = await response.json()

    expect(response.status).toBe(503)
    expect(data.status).toBe('unhealthy')
    expect(data.error).toBe('Service unavailable')
  })
})